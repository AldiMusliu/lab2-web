import { useMemo } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router"
import { BookOpen, Loader2, Plus } from "lucide-react"
import { toast } from "sonner"

import type { Book } from "@/features/books/types"
import { DataTable } from "@/components/molecules/data-table"
import { NoData } from "@/components/molecules/no-data"
import { Button, buttonVariants } from "@/components/ui/button"
import { columns } from "@/features/books/_components/columns"
import { deleteBook } from "@/features/books/api.mutation"
import { bookKeys, getBooks } from "@/features/books/api.queries"
import { getCategories } from "@/features/categories/api.queries"
import { getHttpErrorMessage } from "@/lib/http-client"
import { cn } from "@/lib/utils"
import { useSessionStore } from "@/stores/session.store"
import { useUiStore } from "@/stores/ui.store"

export const Route = createFileRoute("/_protectedLayout/books/")({
  component: BooksPage,
})

function BooksPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const role = useSessionStore((state) => state.role)
  const openGlobalDialog = useUiStore((state) => state.openGlobalDialog)
  const isAdmin = role === "admin"

  const {
    data: books = [],
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: bookKeys.list(),
    queryFn: getBooks,
  })

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: bookKeys.all })
      toast.success("Book deleted")
    },
    onError: (error) => {
      toast.error("Could not delete book", {
        description: getHttpErrorMessage(
          error,
          "This record may already be in use."
        ),
      })
    },
  })

  const actions = useMemo(
    () =>
      isAdmin
        ? {
            delete: (book: Book) => {
              openGlobalDialog({
                title: "Delete book",
                description: `Delete "${book.title}" from the catalogue?`,
                confirmLabel: "Delete",
                cancelLabel: "Cancel",
                onConfirm: async () => {
                  await deleteMutation.mutateAsync(book.id)
                },
              })
            },
          }
        : undefined,
    [deleteMutation, isAdmin, openGlobalDialog]
  )

  const bookColumns = useMemo(() => columns(categories), [categories])

  const availableCount = books.reduce(
    (total, book) => total + book.availableCopies,
    0
  )
  const onlineCount = books.filter((book) => book.readOnline).length

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
        <h2 className="text-lg font-semibold text-foreground">
          Books unavailable
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We could not load book records.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => void refetch()}
          className="mt-5"
        >
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
              <BookOpen className="size-5 text-primary" aria-hidden="true" />
              <h2 className="text-xl font-semibold tracking-tight">
                Book data
              </h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Review catalogue records, availability, and access formats.
            </p>
          </div>

          {isAdmin ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Link
                to="/books/add"
                className={cn(buttonVariants({ size: "lg" }), "h-10")}
              >
                <Plus className="size-4" aria-hidden="true" />
                Add book
              </Link>
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-4 border-t pt-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{books.length}</span>{" "}
            titles
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {availableCount}
            </span>{" "}
            copies available
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{onlineCount}</span>{" "}
            online
          </p>
        </div>
      </div>

      <DataTable
        actions={actions}
        columns={bookColumns}
        data={books}
        initialPageSize={10}
        paginationEndPosition
        notFoundText={
          <NoData
            title="No books found"
            description={
              isAdmin
                ? "Add a new book to start the catalogue."
                : "Books will appear here when the catalogue is configured."
            }
          />
        }
        onRowDoubleClick={
          isAdmin
            ? (book) =>
                navigate({
                  to: "/books/$id",
                  params: { id: book.id },
                })
            : undefined
        }
        tableId="/books"
      />
    </div>
  )
}
