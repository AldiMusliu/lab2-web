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

type Department = {
  id: string
  name: string
  officeCount: number
}

type DepartmentInput = {
  name: string
  officeCount: number
}

function getDepartments() {
  return httpClient.get<Department[]>('/departments')
}

function createDepartment(payload: DepartmentInput) {
  return httpClient.post<Department>('/departments', payload)
}

function updateDepartment(id: string, payload: DepartmentInput) {
  return httpClient.put<Department>(`/departments/${id}`, payload)
}

function deleteDepartment(id: string) {
  return httpClient.delete<void>(`/departments/${id}`)
}

const departmentSchema = z.object({
  name: z.string().min(1, 'Required'),
  officeCount: z.coerce.number().min(0),
})

type DepartmentFormValues = z.infer<typeof departmentSchema>

import withActionsColumn from '@/lib/table-utils'

const baseColumns = [
  // show a simple 1-based row number instead of the UUID hash
  { id: 'index', header: 'ID', cell: (info: any) => String(info.row.index + 1) },
  { accessorKey: 'name', header: 'Departamenti' },
  { accessorKey: 'officeCount', header: 'Zyra' },
] as const

function DepartmentDialogForm({
  department,
  onClose,
  onSaved,
}: {
  department?: Department | null
  onClose: () => void
  onSaved: () => void
}) {
  const queryClient = useQueryClient()
  const isEditing = Boolean(department)

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema) as unknown as any,
    defaultValues: {
      name: department?.name ?? '',
      officeCount: department?.officeCount ?? 0,
    },
  })

  const mutation = useMutation({
    mutationFn: (values: DepartmentFormValues) =>
      department
        ? updateDepartment(department.id, values)
        : createDepartment(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['departments'] })
      toast.success(isEditing ? 'Department updated' : 'Department created')
      onSaved()
    },
    onError: (error) => {
      toast.error('Could not save department', {
        description: getHttpErrorMessage(error, 'Check the department name and try again.'),
      })
    },
  })

  const onSubmit = (values: DepartmentFormValues) => {
    mutation.mutate(values)
  }

  return (
    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="department-name">Departamenti</label>
        <Input id="department-name" {...form.register('name')} placeholder="Departamenti" />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="department-office-count">Numri i zyrave</label>
        <Input id="department-office-count" type="number" min={0} {...form.register('officeCount')} />
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

export function DepartmentsFeature() {
  const queryClient = useQueryClient()
  const openGlobalDialog = useUiStore((state) => state.openGlobalDialog)
  const closeGlobalDialog = useUiStore((state) => state.closeGlobalDialog)

  const { data: departments = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['departments'] })
      toast.success('Department deleted')
    },
    onError: (error) => {
      toast.error('Could not delete department', {
        description: getHttpErrorMessage(error),
      })
    },
  })

  const openDepartmentDialog = useCallback(
    (department?: Department) => {
      openGlobalDialog({
        title: department ? 'Edit Department' : 'Add Department',
        description: 'Manage department records.',
        hideFooter: true,
        children: (
          <DepartmentDialogForm
            department={department}
            onClose={() => closeGlobalDialog()}
            onSaved={() => closeGlobalDialog()}
          />
        ),
      })
    },
    [closeGlobalDialog, openGlobalDialog],
  )

  const actions = useMemo<DataTableActions<Department>>(
    () => ({
      edit: (department) => openDepartmentDialog(department),
      delete: (department) => {
        openGlobalDialog({
          title: 'Delete Department',
          description: `Delete "${department.name}"?`,
          confirmLabel: 'Delete',
          cancelLabel: 'Cancel',
          onConfirm: async () => {
            await deleteMutation.mutateAsync(department.id)
          },
        })
      },
    }),
    [deleteMutation, openDepartmentDialog, openGlobalDialog],
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
        <h2 className="text-lg font-semibold text-foreground">Departments unavailable</h2>
        <p className="mt-2 text-sm text-muted-foreground">We could not load department records.</p>
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
              <h2 className="text-xl font-semibold tracking-tight">Department data</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep it simple: one page, one dialog, one table.
            </p>
          </div>

          <Button type="button" onClick={() => openDepartmentDialog()}>
            <Plus className="size-4" aria-hidden="true" />
            Add department
          </Button>
        </div>
      </div>

      <DataTable
        actions={actions}
        columns={withActionsColumn(baseColumns as any, actions, 'name') as any}
        data={departments}
        initialPageSize={10}
        paginationEndPosition
        tableId="/department-v2"
      />
    </div>
  )
}

export default DepartmentsFeature