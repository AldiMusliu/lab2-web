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

type Friend = {
  friend_id: string
  friend_name: string
  friend_count: number
}

type FriendInput = {
  friend_name: string
  friend_count: number
}

function getFriends() {
  return httpClient.get<Friend[]>('/friends')
}

function createFriend(payload: FriendInput) {
  return httpClient.post<Friend>('/friends', payload)
}

function updateFriend(friend_id: string, payload: FriendInput) {
  return httpClient.put<Friend>(`/friends/${friend_id}`, payload)
}

function deleteFriend(friend_id: string) {
  return httpClient.delete<void>(`/friends/${friend_id}`)
}

const friendSchema = z.object({
  friend_name: z.string().min(1, 'Required'),
  friend_count: z.coerce.number().min(0),
})

type FriendFormValues = z.infer<typeof friendSchema>

import withActionsColumn from '@/lib/table-utils'

const baseColumns = [
  // numeric 1-based row index for easy scanning
  { id: 'index', header: 'No.', cell: (info: any) => String(info.row.index + 1) },
  // show the UUID (truncated) with full value on hover
  {
    id: 'friend_id',
    header: 'ID',
    cell: (info: any) => (
      <span title={info.row.original.id}>{String(info.row.original.id ?? '').slice(0, 8)}</span>
    ),
  },
  { accessorKey: 'friend_name', header: 'Friend' },
  { accessorKey: 'friend_count', header: 'Numri i shokeve' },
] as const

function FriendDialogForm({
  friend,
  onClose,
  onSaved,
}: {
  friend?: Friend | null
  onClose: () => void
  onSaved: () => void
}) {
  const queryClient = useQueryClient()
  const isEditing = Boolean(friend)

  const form = useForm<FriendFormValues>({
    resolver: zodResolver(friendSchema) as unknown as any,
    defaultValues: {
      friend_name: friend?.friend_name ?? '',
      friend_count: friend?.friend_count ?? 0,
    },
  })

  const mutation = useMutation({
    mutationFn: (values: FriendFormValues) =>
      friend
        ? updateFriend(friend.friend_id, values)
        : createFriend(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['friends'] })
      toast.success(isEditing ? 'Friend updated' : 'Friend created')
      onSaved()
    },
    onError: (error) => {
      toast.error('Could not save friend', {
        description: getHttpErrorMessage(error, 'Check the friend name and try again.'),
      })
    },
  })

  const onSubmit = (values: FriendFormValues) => {
    mutation.mutate(values)
  }

  return (
    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="friend-friend_name">Friend</label>
        <Input id="friend-friend_name" {...form.register('friend_name')} placeholder="Friend" />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="friend-office-count">Numri i shokut</label>
        <Input id="friend-office-count" type="number" min={0} {...form.register('friend_count')} />
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

export function FriendsFeature() {
  const queryClient = useQueryClient()
  const openGlobalDialog = useUiStore((state) => state.openGlobalDialog)
  const closeGlobalDialog = useUiStore((state) => state.closeGlobalDialog)

  const { data: friends = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['friends'],
    queryFn: getFriends,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteFriend,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['friends'] })
      toast.success('Friend deleted')
    },
    onError: (error) => {
      toast.error('Could not delete friend', {
        description: getHttpErrorMessage(error),
      })
    },
  })

  const openFriendDialog = useCallback(
    (friend?: Friend) => {
      openGlobalDialog({
        title: friend ? 'Edit Friend' : 'Add Friend',
        description: 'Manage friend records.',
        hideFooter: true,
        children: (
          <FriendDialogForm
            friend={friend}
            onClose={() => closeGlobalDialog()}
            onSaved={() => closeGlobalDialog()}
          />
        ),
      })
    },
    [closeGlobalDialog, openGlobalDialog],
  )

  const actions = useMemo<DataTableActions<Friend>>(
    () => ({
      edit: (friend) => openFriendDialog(friend),
      delete: (friend) => {
        openGlobalDialog({
          title: 'Delete Friend',
          description: `Delete "${friend.friend_name}"?`,
          confirmLabel: 'Delete',
          cancelLabel: 'Cancel',
          onConfirm: async () => {
            await deleteMutation.mutateAsync(friend.friend_id)
          },
        })
      },
    }),
    [deleteMutation, openFriendDialog, openGlobalDialog],
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
        <h2 className="text-lg font-semibold text-foreground">Friends unavailable</h2>
        <p className="mt-2 text-sm text-muted-foreground">We could not load friend records.</p>
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
              <h2 className="text-xl font-semibold tracking-tight">Friend data</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep it simple: one page, one dialog, one table.
            </p>
          </div>

          <Button type="button" onClick={() => openFriendDialog()}>
            <Plus className="size-4" aria-hidden="true" />
            Add friend
          </Button>
        </div>
      </div>

      <DataTable
        actions={actions}
        columns={withActionsColumn(baseColumns as any, actions, 'friend_name') as any}
        data={friends}
        initialPageSize={10}
        paginationEndPosition
        tableId="/friend-v2"
      />
    </div>
  )
}

export default FriendsFeature