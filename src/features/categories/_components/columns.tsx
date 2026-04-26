import { Edit3, Trash2 } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

import type { DataTableActions } from "@/components/molecules/data-table"
import type { Category } from "@/features/categories/types"
import { Button } from "@/components/ui/button"

export const columns = (
  actions?: DataTableActions<Category>
): Array<ColumnDef<Category>> => {
  const categoryColumns: Array<ColumnDef<Category>> = [
    {
      id: "name",
      accessorKey: "name",
      header: "Category",
      cell: ({ row }) => (
        <div className="min-w-56">
          <p className="font-medium text-foreground">{row.original.name}</p>
        </div>
      ),
    },
  ]

  if (!actions) {
    return categoryColumns
  }

  return [
    ...categoryColumns,
    {
      id: "actions",
      enableSorting: false,
      header: () => <div className="min-w-24 pr-6 text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="flex min-w-24 justify-end gap-1 pr-6">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Edit ${row.original.name}`}
            onClick={(event) => {
              event.stopPropagation()
              actions.edit(row.original)
            }}
          >
            <Edit3 className="size-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            aria-label={`Delete ${row.original.name}`}
            onClick={(event) => {
              event.stopPropagation()
              actions.delete(row.original)
            }}
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </Button>
        </div>
      ),
    },
  ]
}
