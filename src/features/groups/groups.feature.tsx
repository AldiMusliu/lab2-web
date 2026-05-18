import { useCallback, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2, Plus, Building, Save, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { DataTable, type DataTableActions } from '@/components/molecules/data-table'
import { Input } from '@/components/ui/input'
import { httpClient, getHttpErrorMessage } from '@/lib/http-client'
import { useUiStore } from '@/stores/ui.store'

type Group = {
  group_id: string
  group_name: string
  description: string
}

type GroupInput = {
  group_name: string
  description: string
}

function getGroups() {
  return httpClient.get<Group[]>('/groups')
}

function createGroup(payload:GroupInput) {
  return httpClient.post<Group>('/groups', payload)
}

function updateGroup(group_id: string, payload: GroupInput) {
  return httpClient.put<Group>(`/groups/${group_id}`, payload)
}

function deleteGroup(id: string) {
  return httpClient.delete<void>(`/groups/${id}`)
}

const groupSchema = z.object({
  group_name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
})

type GroupFormValues = z.infer<typeof groupSchema>

import withActionsColumn from '@/lib/table-utils'

const baseColumns = [
  // numeric 1-based row index for easy scanning
  { id: 'index', header: 'No.', cell: (info: any) => String(info.row.index + 1) },
  // show the UUID (truncated) with full value on hover
  {
    id: 'group_id',
    header: 'ID',
    cell: (info: any) => (
      <span title={info.row.original.group_id}>
        {String(info.row.original.group_id ?? '').slice(0, 8)}
      </span>
    ),
  },
  { accessorKey: 'group_name', header: 'Emri i Grupit ' },
  { accessorKey: 'description', header: 'Pershkrimi' },
] as const

function GroupDialogForm({
  group,
  onClose,
  onSaved,
}: {
  group?: Group | null
  onClose: () => void
  onSaved: () => void
}) {
  const queryClient = useQueryClient()
  const isEditing = Boolean(group)

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema) as unknown as any,
    defaultValues: {
      group_name: group?.group_name ?? '',
      description: group?.description ?? '',
    },
  })

  const mutation = useMutation({
    mutationFn: (values: GroupFormValues) =>
      group
        ? updateGroup(group.group_id, values)
        : createGroup(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groups'] })
      toast.success(isEditing ? 'Group updated' : 'Group created')
      onSaved()
    },
    onError: (error) => {
      toast.error('Could not save Group', {
        description: getHttpErrorMessage(error, 'Check the Group name and try again.'),
      })
    },
  })

  const onSubmit = (values: GroupFormValues) => {
    mutation.mutate(values)
  }

  return (
    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="group-name">Group</label>
        <Input id="group-name" {...form.register('group_name')} placeholder="Grupi" />
      </div>
     <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="description">Description</label>
        <Input id="description" {...form.register('description')} placeholder="Pershkrimi" />
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>
          <X className="size-4" />
          Cancel
        </Button>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? <Loader2 className="size-4 animate-spin" /> : isEditing ? <Save className="size-4" /> : <Plus className="size-4" />}
          {mutation.isPending ? 'Saving...' : isEditing ? 'Save' : 'Add'}
        </Button>
      </div>
    </form>
  )
}

export function GroupsFeature() {
  const queryClient = useQueryClient()
  const openGlobalDialog = useUiStore((state) => state.openGlobalDialog)
  const closeGlobalDialog = useUiStore((state) => state.closeGlobalDialog)

  const { data: groups = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteGroup,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groups'] })
      toast.success('Group deleted')
    },
    onError: (error) => {
      toast.error('Could not delete group', {
        description: getHttpErrorMessage(error),
      })
    },
  })

  const openGroupDialog = useCallback(
    (group?: Group) => {
      openGlobalDialog({
        title: group ? 'Edit Group' : 'Add Group',
        description: 'Manage group records.',
        hideFooter: true,
        children: (
          <GroupDialogForm
            group={group}
            onClose={() => closeGlobalDialog()}
            onSaved={() => closeGlobalDialog()}
          />
        ),
      })
    },
    [closeGlobalDialog, openGlobalDialog],
  )

  const actions = useMemo<DataTableActions<Group>>(
    () => ({
      edit: (group) => openGroupDialog(group),
      delete: (group) => {
        openGlobalDialog({
          title: 'Delete Group',
          description: `Delete "${group.group_name}"?`,
          confirmLabel: 'Delete',
          cancelLabel: 'Cancel',
          onConfirm: async () => {
            await deleteMutation.mutateAsync(group.group_id)
          },
        })
      },
    }),
    [deleteMutation, openGroupDialog, openGlobalDialog],
  )

  if (isLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center rounded-lg border bg-card">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <h2 className="text-lg font-semibold text-foreground">Groups unavailable</h2>
        <p className="mt-2 text-sm text-muted-foreground">We could not load group records.</p>
        <Button type="button" variant="outline" onClick={() => void refetch()} className="mt-5">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-col gap-4">
      <div className="shrink-0 rounded-lg border bg-card p-4">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Building className="size-5 text-primary" aria-hidden="true" />
              <h2 className="text-xl font-semibold tracking-tight">Group data</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep it simple: one page, one dialog, one table.
            </p>
          </div>

          <Button type="button" onClick={() => openGroupDialog()}>
            <Plus className="size-4" aria-hidden="true" />
            Add group
          </Button>
        </div>
      </div>

      <DataTable
        actions={actions}
        columns={withActionsColumn(baseColumns as any, actions, 'group_name') as any}
        data={groups}
        initialPageSize={10}
        paginationEndPosition
        tableId="/groups"
      />
    </div>
  )
}

export default GroupsFeature