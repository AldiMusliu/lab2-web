import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { BookCard } from "@/features/publicPages/collections/_components/book-card"
import { CollectionsEmptyState } from "@/features/publicPages/collections/_components/collections-empty-state"
import { CollectionsFilterPanel } from "@/features/publicPages/collections/_components/collections-filter-panel"
import { CollectionsPagination } from "@/features/publicPages/collections/_components/collections-pagination"
import {
  type AvailabilityFilter,
  type PageSizeOption,
  type SortMode,
} from "@/features/publicPages/collections/_components/collections-types"
import {
  getBookCategory,
  getVisiblePages,
} from "@/features/publicPages/collections/_components/collections-utils"
import {
  createItemVariants,
  createSectionVariants,
  getCardHover,
} from "@/features/publicPages/home/home-motion"
import { mockBooks } from "@/mocks"

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

  const filteredBooks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return mockBooks
      .filter((book) => {
        const haystack = [
          book.title,
          book.author,
          getBookCategory(book),
          book.description,
          ...book.tags,
        ]
          .join(" ")
          .toLowerCase()

        const matchesSearch =
          normalizedSearch.length === 0 || haystack.includes(normalizedSearch)
        const matchesCategory =
          categoryFilter === "all" || book.categoryId === categoryFilter
        const matchesAvailability =
          availabilityFilter === "all" ||
          (availabilityFilter === "available" && book.availableCopies > 0) ||
          (availabilityFilter === "online" && book.readOnline) ||
          (availabilityFilter === "waitlist" && book.availableCopies === 0)

        return matchesSearch && matchesCategory && matchesAvailability
      })
      .sort((firstBook, secondBook) => {
        if (sortMode === "author") {
          return firstBook.author.localeCompare(secondBook.author)
        }

        if (sortMode === "newest") {
          return secondBook.publishedYear - firstBook.publishedYear
        }

        if (sortMode === "copies") {
          return secondBook.availableCopies - firstBook.availableCopies
        }

        return firstBook.title.localeCompare(secondBook.title)
      })
  }, [availabilityFilter, categoryFilter, searchTerm, sortMode])

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const visiblePages = getVisiblePages(currentPage, totalPages)
  const paginatedBooks = filteredBooks.slice(
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
            availabilityFilter={availabilityFilter}
            sortMode={sortMode}
            pageSize={pageSize}
            filteredBooksCount={filteredBooks.length}
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
                <BookCard book={book} hoverEffect={cardHover} />
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
          filteredBooksCount={filteredBooks.length}
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
