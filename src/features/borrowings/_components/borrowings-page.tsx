import { useCallback, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  BookCheck,
  CheckCircle2,
  Clock3,
  Loader2,
  RotateCcw,
  Search,
} from "lucide-react"
import { toast } from "sonner"

import type { BookFilters } from "@/features/books/types"
import type { Borrowing, BorrowingStatus } from "@/features/borrowings/types"
import type { BorrowingRow } from "@/features/borrowings/_components/columns"
import { createBorrowingColumns } from "@/features/borrowings/_components/columns"
import { bookKeys, getBooks } from "@/features/books/api.queries"
import { useReturnBorrowing } from "@/features/borrowings/api.mutation"
import { useBorrowings } from "@/features/borrowings/api.queries"
import { DataTable } from "@/components/molecules/data-table"
import { NoData } from "@/components/molecules/no-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getHttpErrorMessage } from "@/lib/http-client"
import { useSessionStore } from "@/stores/session.store"
import { useUiStore } from "@/stores/ui.store"

type BorrowingStatusFilter = BorrowingStatus | "all"

const borrowingBookFilters = {
  availability: "all",
  sort: "title",
} satisfies BookFilters

const statusFilterOptions = [
  { label: "All statuses", value: "all" },
  { label: "Active", value: "active" },
  { label: "Overdue", value: "overdue" },
  { label: "Returned", value: "returned" },
] satisfies Array<{ label: string; value: BorrowingStatusFilter }>

function getBorrowingMemberName(borrowing: Borrowing) {
  const user = borrowing.user
  const fullName = [user?.firstName, user?.lastName]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(" ")

  return user?.name?.trim() || fullName || borrowing.userId
}

export function BorrowingsPage() {
  const role = useSessionStore((state) => state.role)
  const openGlobalDialog = useUiStore((state) => state.openGlobalDialog)
  const isAdmin = role === "admin"
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<BorrowingStatusFilter>("all")

  const {
    data: borrowings = [],
    isError: borrowingsIsError,
    isLoading: borrowingsLoading,
    refetch: refetchBorrowings,
  } = useBorrowings()

  const {
    data: books = [],
    isError: booksIsError,
    isLoading: booksLoading,
    refetch: refetchBooks,
  } = useQuery({
    queryKey: bookKeys.list(borrowingBookFilters),
    queryFn: () => getBooks(borrowingBookFilters),
  })

  const returnBorrowingMutation = useReturnBorrowing()
  const returnBorrowingAsync = returnBorrowingMutation.mutateAsync
  const isReturningBorrowing = returnBorrowingMutation.isPending

  const bookById = useMemo(
    () => new Map(books.map((book) => [book.id, book])),
    [books]
  )

  const borrowingRows = useMemo<Array<BorrowingRow>>(
    () =>
      borrowings.map((borrowing) => {
        const book = bookById.get(borrowing.bookId) ?? null

        return {
          ...borrowing,
          book,
          bookAuthor: book?.author ?? "Unknown author",
          bookTitle: book?.title ?? borrowing.bookId,
          memberName: getBorrowingMemberName(borrowing),
        }
      }),
    [bookById, borrowings]
  )

  const filteredBorrowings = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return borrowingRows.filter((borrowing) => {
      const matchesStatus =
        statusFilter === "all" || borrowing.status === statusFilter

      if (!matchesStatus) {
        return false
      }

      if (!normalizedSearch) {
        return true
      }

      return [
        borrowing.bookTitle,
        borrowing.bookAuthor,
        borrowing.bookId,
        borrowing.memberName,
        borrowing.user?.firstName ?? "",
        borrowing.user?.lastName ?? "",
        borrowing.userId,
      ].some((value) => value.toLowerCase().includes(normalizedSearch))
    })
  }, [borrowingRows, searchTerm, statusFilter])

  const handleReturnBorrowing = useCallback(
    (borrowing: BorrowingRow) => {
      openGlobalDialog({
        title: "Return book",
        description: `Mark "${borrowing.bookTitle}" as returned?`,
        confirmLabel: "Return",
        cancelLabel: "Cancel",
        onConfirm: async () => {
          try {
            await returnBorrowingAsync(borrowing.id)
            toast.success("Borrowing returned", {
              description: borrowing.bookTitle,
            })
          } catch (error) {
            toast.error("Could not return borrowing", {
              description: getHttpErrorMessage(
                error,
                "This borrowing may already be returned."
              ),
            })
          }
        },
      })
    },
    [openGlobalDialog, returnBorrowingAsync]
  )

  const borrowingColumns = useMemo(
    () =>
      createBorrowingColumns({
        isAdmin,
        isReturningBorrowing,
        onReturnBorrowing: handleReturnBorrowing,
      }),
    [handleReturnBorrowing, isAdmin, isReturningBorrowing]
  )

  const activeCount = borrowings.filter(
    (borrowing) => borrowing.status === "active"
  ).length
  const overdueCount = borrowings.filter(
    (borrowing) => borrowing.status === "overdue"
  ).length
  const returnedCount = borrowings.filter(
    (borrowing) => borrowing.status === "returned"
  ).length
  const hasActiveFilters =
    searchTerm.trim().length > 0 || statusFilter !== "all"

  function resetFilters() {
    setSearchTerm("")
    setStatusFilter("all")
  }

  function retryBorrowings() {
    void refetchBorrowings()

    if (booksIsError) {
      void refetchBooks()
    }
  }

  if (borrowingsLoading || booksLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center rounded-lg border bg-card">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (borrowingsIsError) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          Borrowings unavailable
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We could not load borrowing records.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={retryBorrowings}
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
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start">
          <div>
            <div className="flex items-center gap-2">
              <BookCheck className="size-5 text-primary" aria-hidden="true" />
              <h2 className="text-xl font-semibold tracking-tight">
                Borrowing records
              </h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {isAdmin
                ? "Track all member checkouts, due dates, and returns."
                : "Track your checkouts, due dates, and return history."}
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[28rem]">
            <div className="rounded-lg border bg-muted px-3 py-2">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Clock3 className="size-4 text-sky-700" aria-hidden="true" />
                {activeCount}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Active</p>
            </div>
            <div className="rounded-lg border bg-muted px-3 py-2">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Clock3 className="size-4 text-rose-700" aria-hidden="true" />
                {overdueCount}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Overdue</p>
            </div>
            <div className="rounded-lg border bg-muted px-3 py-2">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <CheckCircle2
                  className="size-4 text-emerald-700"
                  aria-hidden="true"
                />
                {returnedCount}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Returned</p>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="grid gap-3 md:grid-cols-[minmax(220px,1fr)_minmax(160px,14rem)_auto]">
            <div className="grid gap-1.5">
              <label
                htmlFor="borrowing-search"
                className="text-sm leading-none font-medium"
              >
                Search
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="borrowing-search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Book, author, or user"
                  className="h-10 pl-8"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="borrowing-status-filter"
                className="text-sm leading-none font-medium"
              >
                Status
              </label>
              <Select
                items={statusFilterOptions}
                value={statusFilter}
                onValueChange={(nextValue) =>
                  setStatusFilter(
                    (nextValue as BorrowingStatusFilter | null) ?? "all"
                  )
                }
              >
                <SelectTrigger
                  id="borrowing-status-filter"
                  className="h-10 w-full"
                >
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent align="start">
                  {statusFilterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                disabled={!hasActiveFilters}
                onClick={resetFilters}
                className="h-10 w-full md:w-auto"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Reset
              </Button>
            </div>
          </div>
        </div>

        {booksIsError ? (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Borrowing records loaded, but book titles could not be refreshed.
          </div>
        ) : null}
      </div>

      <DataTable
        columns={borrowingColumns}
        data={filteredBorrowings}
        getRowClassName={(borrowing) =>
          borrowing.status === "overdue"
            ? "bg-rose-50/70 hover:bg-rose-50 dark:bg-rose-950/20 dark:hover:bg-rose-950/30"
            : undefined
        }
        initialPageSize={10}
        paginationEndPosition
        notFoundText={
          <NoData
            title="No borrowings found"
            description={
              hasActiveFilters
                ? "Try different search terms or status filters."
                : "Borrowing records will appear here after checkout."
            }
          />
        }
        tableId="/borrowings"
      />
    </div>
  )
}
