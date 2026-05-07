import { useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import {
  BookOpen,
  Loader2,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import { toast } from "sonner"

import type {
  Book,
  BookAvailability,
  BookFilters,
  BookSort,
} from "@/features/books/types"
import { DataTable } from "@/components/molecules/data-table"
import { NoData } from "@/components/molecules/no-data"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { columns } from "@/features/books/_components/columns"
import { deleteBook } from "@/features/books/api.mutation"
import { bookKeys, getBooks } from "@/features/books/api.queries"
import { getCategories } from "@/features/categories/api.queries"
import { invalidateDashboardStats } from "@/features/dashboard/api.mutation"
import { getHttpErrorMessage } from "@/lib/http-client"
import { cn } from "@/lib/utils"
import { useSessionStore } from "@/stores/session.store"
import { useUiStore } from "@/stores/ui.store"

const availabilityOptions = [
  { label: "All access", value: "all" },
  { label: "Available", value: "available" },
  { label: "Read online", value: "online" },
  { label: "Waitlist", value: "waitlist" },
] satisfies Array<{ label: string; value: BookAvailability }>

const sortOptions = [
  { label: "Title", value: "title" },
  { label: "Author", value: "author" },
  { label: "Newest", value: "newest" },
  { label: "Copies", value: "copies" },
] satisfies Array<{ label: string; value: BookSort }>

export function BooksPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const role = useSessionStore((state) => state.role)
  const openGlobalDialog = useUiStore((state) => state.openGlobalDialog)
  const isAdmin = role === "admin"
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] =
    useState<BookAvailability>("all")
  const [sortMode, setSortMode] = useState<BookSort>("title")
  const bookFilters = useMemo<BookFilters>(() => {
    const trimmedSearchTerm = searchTerm.trim()

    return {
      ...(trimmedSearchTerm ? { q: trimmedSearchTerm } : {}),
      ...(categoryFilter !== "all" ? { categoryId: categoryFilter } : {}),
      availability: availabilityFilter,
      sort: sortMode,
    }
  }, [availabilityFilter, categoryFilter, searchTerm, sortMode])

  const {
    data: books = [],
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: bookKeys.list(bookFilters),
    queryFn: () => getBooks(bookFilters),
    placeholderData: (previousBooks) => previousBooks,
  })

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const categoryOptions = useMemo(
    () => [
      { label: "All categories", value: "all" },
      ...categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    ],
    [categories]
  )

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: bookKeys.all })
      await invalidateDashboardStats(queryClient)
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

  const hasActiveFilters =
    searchTerm.trim().length > 0 ||
    categoryFilter !== "all" ||
    availabilityFilter !== "all" ||
    sortMode !== "title"
  const availableCount = books.reduce(
    (total, book) => total + book.availableCopies,
    0
  )
  const onlineCount = books.filter((book) => book.readOnline).length

  function resetFilters() {
    setSearchTerm("")
    setCategoryFilter("all")
    setAvailabilityFilter("all")
    setSortMode("title")
  }

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

        <div className="mt-4 border-t pt-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <SlidersHorizontal
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            Filters
            {isFetching ? (
              <Loader2
                className="size-4 animate-spin text-muted-foreground"
                aria-hidden="true"
              />
            ) : null}
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(220px,1.2fr)_minmax(160px,0.85fr)_minmax(160px,0.85fr)_minmax(150px,0.7fr)_auto]">
            <div className="grid gap-1.5">
              <label
                htmlFor="book-search"
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
                  id="book-search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Title or author"
                  className="h-10 pl-8"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="book-category-filter"
                className="text-sm leading-none font-medium"
              >
                Category
              </label>
              <Select
                items={categoryOptions}
                value={categoryFilter}
                onValueChange={(nextValue) =>
                  setCategoryFilter(nextValue ?? "all")
                }
              >
                <SelectTrigger
                  id="book-category-filter"
                  className="h-10 w-full"
                >
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent align="start">
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="book-availability-filter"
                className="text-sm leading-none font-medium"
              >
                Availability
              </label>
              <Select
                items={availabilityOptions}
                value={availabilityFilter}
                onValueChange={(nextValue) =>
                  setAvailabilityFilter(nextValue ?? "all")
                }
              >
                <SelectTrigger
                  id="book-availability-filter"
                  className="h-10 w-full"
                >
                  <SelectValue placeholder="All access" />
                </SelectTrigger>
                <SelectContent align="start">
                  {availabilityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="book-sort-filter"
                className="text-sm leading-none font-medium"
              >
                Sort
              </label>
              <Select
                items={sortOptions}
                value={sortMode}
                onValueChange={(nextValue) => setSortMode(nextValue ?? "title")}
              >
                <SelectTrigger id="book-sort-filter" className="h-10 w-full">
                  <SelectValue placeholder="Title" />
                </SelectTrigger>
                <SelectContent align="start">
                  {sortOptions.map((option) => (
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
                className="h-10 w-full xl:w-auto"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Reset
              </Button>
            </div>
          </div>
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
              hasActiveFilters
                ? "Try different search terms or filters."
                : isAdmin
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
