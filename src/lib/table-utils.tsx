import React from 'react'
import { Button } from '@/components/ui/button'
import { Edit3, Trash2 } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import type { DataTableActions } from '@/components/molecules/data-table'

export function withActionsColumn<T>(
  baseCols: Array<ColumnDef<T, any>>,
  actions?: DataTableActions<T>,
  labelKey = 'name',
) {
  if (!actions) return baseCols

  const actionsCol: ColumnDef<T, any> = {
    id: 'actions',
    enableSorting: false,
    header: () => <div className="min-w-24 pr-6 text-right">Actions</div>,
    cell: ({ row }: any) => (
      <div className="flex min-w-24 justify-end gap-1 pr-6">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`Edit ${row.original[labelKey]}`}
          onClick={(event) => {
            event.stopPropagation()
            actions!.edit(row.original)
          }}
        >
          <Edit3 className="size-4" aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="icon-sm"
          aria-label={`Delete ${row.original[labelKey]}`}
          onClick={(event) => {
            event.stopPropagation()
            actions!.delete(row.original)
          }}
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </Button>
      </div>
    ),
  }

  return [...baseCols, actionsCol]
}

export default withActionsColumn
