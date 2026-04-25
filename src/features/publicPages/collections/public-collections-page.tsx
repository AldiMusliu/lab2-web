import { useMemo, useState } from "react"
import { Link } from "@tanstack/react-router"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowUpDown,
  BookCopy,
  BookMarked,
  BookOpenText,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  LibraryBig,
  Search,
  SlidersHorizontal,
} from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  createItemVariants,
  createSectionVariants,
  getCardHover,
} from "@/features/publicPages/home/home-motion"
import { cn } from "@/lib/utils"
import { mockBooks, mockCategories } from "@/mocks"

type Book = (typeof mockBooks)[number]
type AvailabilityFilter = "all" | "available" | "online" | "waitlist"
type SortMode = "title" | "author" | "newest" | "copies"

const pageSizeOptions = [6, 9, 12] as const

const categoryLookup = new Map(
  mockCategories.map((category) => [category.id, category.name])
)

const coverToneClasses: Record<string, string> = {
  amber: "from-amber-200 via-stone-100 to-slate-800",
  cyan: "from-cyan-200 via-white to-slate-800",
  emerald: "from-emerald-200 via-stone-100 to-slate-900",
  fuchsia: "from-fuchsia-200 via-white to-slate-900",
  indigo: "from-indigo-200 via-stone-100 to-slate-900",
  lime: "from-lime-200 via-white to-slate-800",
  orange: "from-orange-200 via-stone-100 to-slate-900",
  rose: "from-rose-200 via-white to-slate-800",
  sky: "from-sky-200 via-stone-100 to-slate-900",
  slate: "from-slate-200 via-white to-slate-900",
  teal: "from-teal-200 via-stone-100 to-slate-900",
  violet: "from-violet-200 via-white to-slate-900",
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ])

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b)
}

export function getBookCategory(book: Book) {
  return categoryLookup.get(book.categoryId) ?? "Unsorted"
}

export function getAvailabilityLabel(book: Book) {
  if (book.availableCopies > 0) {
    return `${book.availableCopies} of ${book.totalCopies} copies available`
  }

  return "All copies are currently borrowed"
}

export function BookCover({
  book,
  compact = false,
}: {
  book: Book
  compact?: boolean
}) {
  return (
    <div
      className={cn(
        "relative isolate flex overflow-hidden rounded-md bg-linear-to-br p-4 text-white shadow-sm",
        coverToneClasses[book.coverTone] ?? coverToneClasses.slate,
        compact ? "aspect-[4/5] min-h-44" : "aspect-[4/5] min-h-56"
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-y-0 left-0 w-6 bg-black/20" />
      <div className="absolute inset-x-8 top-0 h-px bg-white/45" />
      <div className="absolute inset-x-8 bottom-0 h-px bg-black/25" />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="inline-flex size-10 items-center justify-center rounded-md bg-white/18 text-white backdrop-blur">
          <BookCopy className="size-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase">
            {getBookCategory(book)}
          </p>
          <p className="mt-2 max-w-40 text-xl leading-tight font-semibold">
            {book.title}
          </p>
          <p className="mt-2 text-xs text-white/80">{book.author}</p>
        </div>
      </div>
    </div>
  )
}

function BookCard({
  book,
  hoverEffect,
}: {
  book: Book
  hoverEffect: ReturnType<typeof getCardHover>
}) {
  const isAvailable = book.availableCopies > 0
  const category = getBookCategory(book)

  return (
    <motion.article
      whileHover={hoverEffect}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group flex h-full min-h-[520px] flex-col rounded-lg border border-border bg-card shadow-sm transition-colors focus-within:border-primary/35 hover:border-primary/35"
    >
      <Link
        to="/collections/$id"
        params={{ id: book.id }}
        className="block p-3 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label={`Open details for ${book.title}`}
      >
        <BookCover book={book} />
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border bg-secondary px-2.5 py-1 font-medium">
            {category}
          </span>
          <span className="rounded-full border border-border bg-background px-2.5 py-1 font-medium">
            {book.publishedYear}
          </span>
        </div>

        <div className="mt-4">
          <h3 className="text-lg leading-snug font-semibold text-foreground">
            <Link
              to="/collections/$id"
              params={{ id: book.id }}
              className="outline-none hover:text-primary focus-visible:text-primary"
            >
              {book.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {book.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {book.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <div className="flex items-start justify-between gap-3 rounded-md border border-border bg-secondary px-3 py-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Borrowing status
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {isAvailable ? "Available now" : "Waitlist needed"}
              </p>
            </div>
            <span
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-md",
                isAvailable
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              )}
            >
              {isAvailable ? (
                <CheckCircle2 className="size-5" />
              ) : (
                <BookMarked className="size-5" />
              )}
            </span>
          </div>

          <div className="grid gap-2 pt-4 sm:translate-y-2 sm:grid-cols-2 sm:opacity-0 sm:transition-all sm:duration-200 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
            <Link
              to="/collections/$id"
              params={{ id: book.id }}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 w-full gap-2"
              )}
            >
              <BookOpenText className="size-4" />
              {book.readOnline ? "Read online" : "Details"}
            </Link>
            <Link
              to="/login"
              className={cn(
                buttonVariants({
                  variant: isAvailable ? "default" : "secondary",
                  size: "lg",
                }),
                "h-11 w-full gap-2"
              )}
            >
              <BookMarked className="size-4" />
              {isAvailable ? "Borrow it" : "Join waitlist"}
            </Link>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            {getAvailabilityLabel(book)}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

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
  const [pageSize, setPageSize] = useState<(typeof pageSizeOptions)[number]>(6)
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
  const availableTitleCount = mockBooks.filter(
    (book) => book.availableCopies > 0
  ).length
  const onlineTitleCount = mockBooks.filter((book) => book.readOnline).length

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
        className="border-b border-border bg-secondary/50"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8 lg:py-16">
          <motion.div variants={itemVariants} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-background px-3 py-1.5 text-xs font-semibold text-primary">
              <LibraryBig className="size-3.5" />
              Library catalogue
            </div>
            <h1 className="mt-5 text-4xl leading-tight font-semibold text-foreground sm:text-5xl">
              Find a book, check availability, and choose the next action.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Search the public catalogue by title, author, topic, category, or
              access type. Each card shows whether the book can be borrowed from
              the library or opened online.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid content-start gap-3 sm:grid-cols-3 lg:grid-cols-1"
          >
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">Catalogue titles</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">
                {mockBooks.length}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">Ready to borrow</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">
                {availableTitleCount}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">Online reading</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">
                {onlineTitleCount}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <motion.div
          variants={itemVariants}
          className="rounded-lg border border-border bg-card p-4 shadow-sm"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="min-w-0 flex-1">
              <label
                htmlFor="catalogue-search"
                className="text-sm font-medium text-foreground"
              >
                Search books
              </label>
              <div className="relative mt-2">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="catalogue-search"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value)
                    setPage(1)
                  }}
                  placeholder="Search title, author, topic..."
                  className="h-11 pl-9"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label
                  htmlFor="catalogue-category"
                  className="text-sm font-medium text-foreground"
                >
                  Category
                </label>
                <Select
                  value={categoryFilter}
                  onValueChange={(value) => {
                    if (!value) return

                    setCategoryFilter(value)
                    setPage(1)
                  }}
                >
                  <SelectTrigger
                    id="catalogue-category"
                    className="mt-2 h-11 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {mockCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="catalogue-availability"
                  className="text-sm font-medium text-foreground"
                >
                  Availability
                </label>
                <Select
                  value={availabilityFilter}
                  onValueChange={(value) => {
                    if (!value) return

                    setAvailabilityFilter(value as AvailabilityFilter)
                    setPage(1)
                  }}
                >
                  <SelectTrigger
                    id="catalogue-availability"
                    className="mt-2 h-11 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All access</SelectItem>
                    <SelectItem value="available">Borrowable</SelectItem>
                    <SelectItem value="online">Read online</SelectItem>
                    <SelectItem value="waitlist">Waitlist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="catalogue-sort"
                  className="text-sm font-medium text-foreground"
                >
                  Sort
                </label>
                <Select
                  value={sortMode}
                  onValueChange={(value) => {
                    if (!value) return

                    setSortMode(value as SortMode)
                    setPage(1)
                  }}
                >
                  <SelectTrigger
                    id="catalogue-sort"
                    className="mt-2 h-11 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title A-Z</SelectItem>
                    <SelectItem value="author">Author A-Z</SelectItem>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="copies">Most copies</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="catalogue-page-size"
                  className="text-sm font-medium text-foreground"
                >
                  Per page
                </label>
                <Select
                  value={String(pageSize)}
                  onValueChange={(value) => {
                    if (!value) return

                    setPageSize(
                      Number(value) as (typeof pageSizeOptions)[number]
                    )
                    setPage(1)
                  }}
                >
                  <SelectTrigger
                    id="catalogue-page-size"
                    className="mt-2 h-11 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pageSizeOptions.map((option) => (
                      <SelectItem key={option} value={String(option)}>
                        {option} books
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Filter className="size-4" />
                {filteredBooks.length} matching titles
              </span>
              <span className="hidden sm:inline">/</span>
              <span className="inline-flex items-center gap-2">
                <ArrowUpDown className="size-4" />
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "h-11 gap-2"
              )}
            >
              <SlidersHorizontal className="size-4" />
              Reset filters
            </button>
          </div>
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
          <motion.div
            variants={itemVariants}
            className="mt-8 rounded-lg border border-dashed border-border bg-secondary/45 p-8 text-center"
          >
            <BookCopy className="mx-auto size-10 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold text-foreground">
              No books match those filters
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Try a broader search term, another category, or clear the filters
              to return to the full catalogue.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "mt-5 h-11"
              )}
            >
              Clear filters
            </button>
          </motion.div>
        )}

        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            {(currentPage - 1) * pageSize + (paginatedBooks.length ? 1 : 0)}
            {" - "}
            {Math.min(currentPage * pageSize, filteredBooks.length)} of{" "}
            {filteredBooks.length} titles
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={currentPage === 1}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 gap-2"
              )}
            >
              <ChevronLeft className="size-4" />
              Previous
            </button>

            {visiblePages.map((visiblePage, index) => {
              const shouldShowEllipsis =
                index > 0 && visiblePage - visiblePages[index - 1] > 1

              return (
                <span key={visiblePage} className="flex items-center gap-2">
                  {shouldShowEllipsis ? (
                    <span className="text-sm text-muted-foreground">...</span>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setPage(visiblePage)}
                    aria-current={
                      visiblePage === currentPage ? "page" : undefined
                    }
                    className={cn(
                      buttonVariants({
                        variant:
                          visiblePage === currentPage ? "default" : "ghost",
                        size: "icon-lg",
                      }),
                      "size-11"
                    )}
                  >
                    {visiblePage}
                  </button>
                </span>
              )
            })}

            <button
              type="button"
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              disabled={currentPage === totalPages}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 gap-2"
              )}
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
