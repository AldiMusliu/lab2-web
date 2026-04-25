import { Link } from "@tanstack/react-router"
import { Edit3, Trash2 } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

import type { DataTableActions } from "@/components/molecules/data-table"
import type { Book } from "@/features/books/types"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { mockCategories } from "@/mocks"

const categoryNames = new Map(
  mockCategories.map((category) => [category.id, category.name])
)

function getCategoryName(categoryId: string) {
  return categoryNames.get(categoryId) ?? "Uncategorized"
}

function getAvailabilityLabel(book: Book) {
  if (book.availableCopies === 0) {
    return "Waitlist"
  }

  if (book.availableCopies === book.totalCopies) {
    return "Available"
  }

  return "Limited"
}

export const columns = (
  actions?: DataTableActions<Book>
): Array<ColumnDef<Book>> => [
  {
    id: "title",
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="min-w-56">
        <Link
          to="/books/$id"
          params={{ id: row.original.id }}
          className="font-medium text-foreground hover:text-primary"
          onClick={(event) => event.stopPropagation()}
        >
          {row.original.title}
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">
          {row.original.publishedYear} / {row.original.language}
        </p>
      </div>
    ),
  },
  {
    id: "author",
    accessorKey: "author",
    header: "Author",
  },
  {
    id: "category",
    accessorFn: (row) => getCategoryName(row.categoryId),
    header: "Category",
  },
  {
    id: "availability",
    accessorFn: (row) => row.availableCopies,
    header: "Availability",
    cell: ({ row }) => {
      const availabilityLabel = getAvailabilityLabel(row.original)

      return (
        <div className="flex flex-col gap-1">
          <span className="font-medium">
            {row.original.availableCopies}/{row.original.totalCopies} copies
          </span>
          <span
            className={cn(
              "w-fit rounded-md border px-2 py-1 text-xs font-medium",
              availabilityLabel === "Available" &&
                "border-emerald-200 bg-emerald-50 text-emerald-700",
              availabilityLabel === "Limited" &&
                "border-amber-200 bg-amber-50 text-amber-700",
              availabilityLabel === "Waitlist" &&
                "border-rose-200 bg-rose-50 text-rose-700"
            )}
          >
            {availabilityLabel}
          </span>
        </div>
      )
    },
  },
  {
    id: "formats",
    accessorFn: (row) => row.formats.join(", "),
    header: "Formats",
  },
  {
    id: "actions",
    enableSorting: false,
    header: () => <div className="min-w-24 pr-6 text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="flex min-w-24 justify-end gap-1 pr-6">
        <Link
          to="/books/$id"
          params={{ id: row.original.id }}
          aria-label={`Edit ${row.original.title}`}
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          onClick={(event) => event.stopPropagation()}
        >
          <Edit3 className="size-4" aria-hidden="true" />
        </Link>
        <Button
          type="button"
          variant="destructive"
          size="icon-sm"
          aria-label={`Delete ${row.original.title}`}
          onClick={(event) => {
            event.stopPropagation()
            if (actions) {
              void actions.delete(row.original)
            }
          }}
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </Button>
      </div>
    ),
  },
]
