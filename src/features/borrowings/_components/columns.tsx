import { format } from "date-fns"
import { Undo2 } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

import type { Book } from "@/features/books/types"
import type { Borrowing, BorrowingStatus } from "@/features/borrowings/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type BorrowingRow = Borrowing & {
  book: Book | null
  bookAuthor: string
  bookTitle: string
  memberName: string
}

type BorrowingColumnsOptions = {
  isAdmin: boolean
  isReturningBorrowing: boolean
  onReturnBorrowing: (borrowing: BorrowingRow) => void
}

const statusClassNames = {
  active: "border-sky-200 bg-sky-50 text-sky-700",
  overdue: "border-rose-200 bg-rose-50 text-rose-700",
  returned: "border-emerald-200 bg-emerald-50 text-emerald-700",
} satisfies Record<BorrowingStatus, string>

function formatDateTime(value: string | null) {
  if (!value) {
    return "Not returned"
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "Unknown date"
  }

  return format(date, "MMM d, yyyy, HH:mm")
}

function statusLabel(status: BorrowingStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

export function createBorrowingColumns({
  isAdmin,
  isReturningBorrowing,
  onReturnBorrowing,
}: BorrowingColumnsOptions): Array<ColumnDef<BorrowingRow>> {
  const columns: Array<ColumnDef<BorrowingRow>> = [
    {
      id: "book",
      accessorKey: "bookTitle",
      header: "Book",
      cell: ({ row }) => (
        <div className="min-w-56">
          <p className="font-medium text-foreground">
            {row.original.bookTitle}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {row.original.bookAuthor}
          </p>
        </div>
      ),
    },
    {
      id: "borrowedAt",
      accessorKey: "borrowedAt",
      header: "Borrowed",
      cell: ({ row }) => formatDateTime(row.original.borrowedAt),
    },
    {
      id: "dueAt",
      accessorKey: "dueAt",
      header: "Due",
      cell: ({ row }) => (
        <span
          className={cn(
            row.original.status === "overdue" && "font-medium text-destructive"
          )}
        >
          {formatDateTime(row.original.dueAt)}
        </span>
      ),
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={cn(
            "inline-flex w-fit items-center rounded-md border px-2 py-1 text-xs font-medium",
            statusClassNames[row.original.status]
          )}
        >
          {statusLabel(row.original.status)}
        </span>
      ),
    },
    {
      id: "returnedAt",
      accessorKey: "returnedAt",
      header: "Returned",
      cell: ({ row }) => formatDateTime(row.original.returnedAt),
    },
  ]

  if (isAdmin) {
    columns.splice(1, 0, {
      id: "member",
      accessorKey: "memberName",
      header: "User",
      cell: ({ row }) => (
        <div className="min-w-44">
          <p className="font-medium text-foreground">
            {row.original.memberName}
          </p>
        </div>
      ),
    })
  }

  columns.push({
    id: "actions",
    enableSorting: false,
    header: () => <div className="min-w-24 pr-6 text-right">Actions</div>,
    cell: ({ row }) =>
      row.original.returnedAt === null ? (
        <div className="flex min-w-24 justify-end pr-6">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isReturningBorrowing}
            onClick={(event) => {
              event.stopPropagation()
              onReturnBorrowing(row.original)
            }}
          >
            <Undo2 className="size-4" aria-hidden="true" />
            Return
          </Button>
        </div>
      ) : (
        <div className="flex min-w-24 justify-end pr-6 text-sm text-muted-foreground">
          Complete
        </div>
      ),
  })

  return columns
}
