import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion, useReducedMotion } from "framer-motion"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { BookFilters } from "@/features/books/types"
import { bookKeys, getBooks } from "@/features/books/api.queries"
import { getCategories } from "@/features/categories/api.queries"
import { BookCard } from "@/features/publicPages/collections/_components/book-card"
import { CollectionsEmptyState } from "@/features/publicPages/collections/_components/collections-empty-state"
import { CollectionsFilterPanel } from "@/features/publicPages/collections/_components/collections-filter-panel"
import { CollectionsPagination } from "@/features/publicPages/collections/_components/collections-pagination"
import {
  type AvailabilityFilter,
  type PageSizeOption,
  type SortMode,
} from "@/features/publicPages/collections/_components/collections-types"
import { getVisiblePages } from "@/features/publicPages/collections/_components/collections-utils"
import {
  createItemVariants,
  createSectionVariants,
  getCardHover,
} from "@/features/publicPages/home/home-motion"

export function PublicCollectionsPage() {
  const shouldReduceMotion = useReducedMotion()
  const prefersReducedMotion = Boolean(shouldReduceMotion)
  const sectionVariants = createSectionVariants(prefersReducedMotion)
  const itemVariants = createItemVariants(prefersReducedMotion)
  const cardHover = getCardHover(prefersReducedMotion)

  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] =
    useState<AvailabilityFilter>("all")
  const [sortMode, setSortMode] = useState<SortMode>("title")
  const [pageSize, setPageSize] = useState<PageSizeOption>(6)
  const [page, setPage] = useState(1)

  const bookFilters = useMemo<BookFilters>(
    () => ({
      availability: availabilityFilter,
      categoryId: categoryFilter === "all" ? undefined : categoryFilter,
      q: searchTerm.trim() || undefined,
      sort: sortMode,
    }),
    [availabilityFilter, categoryFilter, searchTerm, sortMode]
  )

  const {
    data: books = [],
    isError: booksIsError,
    isLoading: booksLoading,
    refetch: refetchBooks,
  } = useQuery({
    queryKey: bookKeys.list(bookFilters),
    queryFn: () => getBooks(bookFilters),
  })

  const {
    data: categories = [],
    isError: categoriesIsError,
    isLoading: categoriesLoading,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const totalPages = Math.max(1, Math.ceil(books.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const visiblePages = getVisiblePages(currentPage, totalPages)
  const paginatedBooks = books.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  function resetFilters() {
    setSearchTerm("")
    setCategoryFilter("all")
    setAvailabilityFilter("all")
    setSortMode("title")
    setPage(1)
  }

  function retryCatalogue() {
    if (booksIsError) {
      void refetchBooks()
    }

    if (categoriesIsError) {
      void refetchCategories()
    }
  }

  if (booksLoading || categoriesLoading) {
    return (
      <main className="flex min-h-96 items-center justify-center bg-background">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </main>
    )
  }

  if (booksIsError || categoriesIsError) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-foreground">
          Catalogue unavailable
        </h1>
        <p className="mt-3 text-muted-foreground">
          We could not load the current collection.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={retryCatalogue}
          className="mt-6"
        >
          Retry
        </Button>
      </main>
    )
  }

  return (
    <div className="bg-background">
      <motion.section
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <motion.div variants={itemVariants}>
          <CollectionsFilterPanel
            searchTerm={searchTerm}
            categoryFilter={categoryFilter}
            categories={categories}
            availabilityFilter={availabilityFilter}
            sortMode={sortMode}
            pageSize={pageSize}
            filteredBooksCount={books.length}
            currentPage={currentPage}
            totalPages={totalPages}
            onSearchChange={(value) => {
              setSearchTerm(value)
              setPage(1)
            }}
            onCategoryChange={(value) => {
              setCategoryFilter(value)
              setPage(1)
            }}
            onAvailabilityChange={(value) => {
              setAvailabilityFilter(value)
              setPage(1)
            }}
            onSortChange={(value) => {
              setSortMode(value)
              setPage(1)
            }}
            onPageSizeChange={(value) => {
              setPageSize(value)
              setPage(1)
            }}
            onResetFilters={resetFilters}
          />
        </motion.div>

        {paginatedBooks.length > 0 ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {paginatedBooks.map((book) => (
              <motion.div key={book.id} variants={itemVariants}>
                <BookCard
                  book={book}
                  categories={categories}
                  hoverEffect={cardHover}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div variants={itemVariants}>
            <CollectionsEmptyState onResetFilters={resetFilters} />
          </motion.div>
        )}

        <CollectionsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          visiblePages={visiblePages}
          filteredBooksCount={books.length}
          pageSize={pageSize}
          paginatedBooksCount={paginatedBooks.length}
          onPrevious={() => setPage((current) => Math.max(1, current - 1))}
          onNext={() => setPage((current) => Math.min(totalPages, current + 1))}
          onPageSelect={setPage}
        />
      </motion.section>
    </div>
  )
}
