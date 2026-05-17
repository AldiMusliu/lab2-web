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

type Shkolla = {
  shkolla_id: string
  shkolla_name: string
  description: string
}

type ShkollaInput = {
  shkolla_name: string
  description: string
}

function getShkollat() {
  return httpClient.get<Shkolla[]>('/shkollat')
}

function createShkolla(payload:ShkollaInput) {
  return httpClient.post<Shkolla>('/shkollat', payload)
}

function updateShkolla(shkolla_id: string, payload: ShkollaInput) {
  return httpClient.put<Shkolla>(`/shkollat/${shkolla_id}`, payload)
}

function deleteShkolla(id: string) {
  return httpClient.delete<void>(`/shkollat/${id}`)
}

const shkollaSchema = z.object({
  shkolla_name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
})

type ShkollaFormValues = z.infer<typeof shkollaSchema>

import withActionsColumn from '@/lib/table-utils'

const baseColumns = [
  // show a simple 1-based row number instead of the UUID hash
  { id: 'index', header: 'ID', cell: (info: any) => String(info.row.index + 1) },
  { accessorKey: 'shkolla_name', header: 'Emri i Shkolles ' },
  { accessorKey: 'description', header: 'Pershkrimi' },
] as const

function ShkollaDialogForm({
  shkolla,
  onClose,
  onSaved,
}: {
  shkolla?: Shkolla | null
  onClose: () => void
  onSaved: () => void
}) {
  const queryClient = useQueryClient()
  const isEditing = Boolean(shkolla)

  const form = useForm<ShkollaFormValues>({
    resolver: zodResolver(shkollaSchema) as unknown as any,
    defaultValues: {
      shkolla_name: shkolla?.shkolla_name ?? '',
      description: shkolla?.description ?? '',
    },
  })

  const mutation = useMutation({
    mutationFn: (values: ShkollaFormValues) =>
      shkolla
        ? updateShkolla(shkolla.shkolla_id, values)
        : createShkolla(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['shkollat'] })
      toast.success(isEditing ? 'Shkolla updated' : 'Shkolla created')
      onSaved()
    },
    onError: (error) => {
      toast.error('Could not save Shkolla', {
        description: getHttpErrorMessage(error, 'Check the Shkolla name and try again.'),
      })
    },
  })

  const onSubmit = (values: ShkollaFormValues) => {
    mutation.mutate(values)
  }

  return (
    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="shkolla-name">Shkolla</label>
        <Input id="shkolla-name" {...form.register('shkolla_name')} placeholder="Shkolla" />
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

export function ShkollatFeature() {
  const queryClient = useQueryClient()
  const openGlobalDialog = useUiStore((state) => state.openGlobalDialog)
  const closeGlobalDialog = useUiStore((state) => state.closeGlobalDialog)

  const { data: shkollat = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['shkollat'],
    queryFn: getShkollat,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteShkolla,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['shkollat'] })
      toast.success('Shkolla deleted')
    },
    onError: (error) => {
      toast.error('Could not delete group', {
        description: getHttpErrorMessage(error),
      })
    },
  })

  const openShkollaDialog = useCallback(
    (shkolla?: Shkolla) => {
      openGlobalDialog({
        title: shkolla ? 'Edit Shkolla' : 'Add Shkolla',
        description: 'Manage group records.',
        hideFooter: true,
        children: (
          <ShkollaDialogForm
            shkolla={shkolla}
            onClose={() => closeGlobalDialog()}
            onSaved={() => closeGlobalDialog()}
          />
        ),
      })
    },
    [closeGlobalDialog, openGlobalDialog],
  )

  const actions = useMemo<DataTableActions<Shkolla>>(
    () => ({
      edit: (shkolla) => openShkollaDialog(shkolla),
      delete: (shkolla) => {
        openGlobalDialog({
          title: 'Delete Shkolla',
          description: `Delete "${shkolla.shkolla_name}"?`,
          confirmLabel: 'Delete',
          cancelLabel: 'Cancel',
          onConfirm: async () => {
            await deleteMutation.mutateAsync(shkolla.shkolla_id)
          },
        })
      },
    }),
    [deleteMutation, openShkollaDialog, openGlobalDialog],
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
        <h2 className="text-lg font-semibold text-foreground">Shkollat unavailable</h2>
        <p className="mt-2 text-sm text-muted-foreground">We could not load shkolla records.</p>
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
              <h2 className="text-xl font-semibold tracking-tight">Shkollat</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep it simple: one page, one dialog, one table.
            </p>
          </div>

          <Button type="button" onClick={() => openShkollaDialog()}>
            <Plus className="size-4" aria-hidden="true" />
            Add Shkolla
          </Button>
        </div>
      </div>

      <DataTable
        actions={actions}
        columns={withActionsColumn(baseColumns as any, actions, 'shkolla_name') as any}
        data={shkollat}
        initialPageSize={10}
        paginationEndPosition
        tableId="/shkollat"
      />
    </div>
  )
}

export default ShkollatFeature