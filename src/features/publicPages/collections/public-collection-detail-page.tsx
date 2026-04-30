import { Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowLeft,
  CalendarDays,
  Hash,
  Languages,
  LibraryBig,
  Loader2,
  MapPin,
  ScrollText,
  Tags,
  UserRound,
} from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { bookKeys, getBookById, getBooks } from "@/features/books/api.queries"
import { getCategories } from "@/features/categories/api.queries"
import { BookCover } from "@/features/publicPages/collections/_components/book-cover"
import { CollectionActionPanel } from "@/features/publicPages/collections/_components/collection-action-panel"
import { CollectionDetailItem } from "@/features/publicPages/collections/_components/collection-detail-item"
import { getBookCategory } from "@/features/publicPages/collections/_components/collections-utils"
import {
  createItemVariants,
  createSectionVariants,
  getCardHover,
} from "@/features/publicPages/home/home-motion"
import { cn } from "@/lib/utils"

export function PublicCollectionDetailPage({ bookId }: { bookId: string }) {
  const shouldReduceMotion = useReducedMotion()
  const prefersReducedMotion = Boolean(shouldReduceMotion)
  const sectionVariants = createSectionVariants(prefersReducedMotion)
  const itemVariants = createItemVariants(prefersReducedMotion)
  const cardHover = getCardHover(prefersReducedMotion)

  const {
    data: book,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: bookKeys.detail(bookId),
    queryFn: () => getBookById(bookId),
    retry: false,
  })

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const relatedCategoryId = book?.categoryId
  const { data: relatedBooksData = [] } = useQuery({
    queryKey: bookKeys.list(
      relatedCategoryId ? { categoryId: relatedCategoryId } : undefined
    ),
    queryFn: () => getBooks({ categoryId: relatedCategoryId! }),
    enabled: Boolean(relatedCategoryId),
  })

  if (isLoading || categoriesLoading) {
    return (
      <main className="flex min-h-96 items-center justify-center bg-background">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </main>
    )
  }

  if (isError || !book) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <LibraryBig className="mx-auto size-11 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-semibold text-foreground">
          Book not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          This catalogue item may have been moved or removed.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => void refetch()}
          className="mt-6"
        >
          Retry
        </Button>
        <Link
          to="/collections"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "mt-3 h-10 gap-2"
          )}
        >
          <ArrowLeft className="size-4" />
          Back to catalogue
        </Link>
      </main>
    )
  }

  const category = getBookCategory(book, categories)
  const relatedBooks = relatedBooksData
    .filter((item) => item.categoryId === book.categoryId && item.id !== book.id)
    .slice(0, 3)

  return (
    <main className="bg-background">
      <motion.section
        className="border-b border-border bg-secondary/50"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <motion.div variants={itemVariants}>
            <Link
              to="/collections"
              className="inline-flex h-10 items-center gap-2 rounded-lg px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <ArrowLeft className="size-4" />
              Back to catalogue
            </Link>
          </motion.div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[330px_1fr_360px] lg:items-start">
            <motion.div variants={itemVariants}>
              <BookCover book={book} categories={categories} compact />
            </motion.div>

            <motion.div variants={itemVariants} className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-primary/20 bg-background px-3 py-1 text-sm font-medium text-primary">
                  {category}
                </span>
                {book.readOnline ? (
                  <span className="rounded-md border border-border bg-card px-3 py-1 text-sm font-medium text-foreground">
                    Read online
                  </span>
                ) : null}
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl leading-tight font-semibold text-foreground sm:text-5xl">
                {book.title}
              </h1>
              <p className="mt-3 flex items-center gap-2 text-base text-muted-foreground">
                <UserRound className="size-4" />
                {book.author}
              </p>

              <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
                {book.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {book.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-md bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground ring-1 ring-border"
                  >
                    <Tags className="size-3.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <CollectionActionPanel book={book} />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8 lg:py-14"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-semibold text-foreground">
            Book details
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <CollectionDetailItem
              icon={UserRound}
              label="Author"
              value={book.author}
            />
            <CollectionDetailItem
              icon={CalendarDays}
              label="Published"
              value={String(book.publishedYear)}
            />
            <CollectionDetailItem
              icon={Languages}
              label="Language"
              value={book.language}
            />
            <CollectionDetailItem
              icon={ScrollText}
              label="Pages"
              value={`${book.pages} pages`}
            />
            <CollectionDetailItem icon={Hash} label="ISBN" value={book.isbn} />
            <CollectionDetailItem
              icon={MapPin}
              label="Shelf"
              value={book.shelfLocation}
            />
          </div>

          <div className="mt-8 rounded-lg border border-border bg-card p-5">
            <h2 className="text-xl font-semibold text-foreground">
              Access and formats
            </h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-muted-foreground">Formats</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {book.formats.join(", ")}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Copy count</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {book.availableCopies} available / {book.totalCopies} total
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Online access</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {book.readOnline ? "Enabled" : "Library copy only"}
                </dd>
              </div>
            </dl>
          </div>
        </motion.div>

        <motion.aside variants={itemVariants}>
          <div className="rounded-lg border border-border bg-secondary/60 p-5">
            <h2 className="text-xl font-semibold text-foreground">
              Borrowing rules
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <li>Standard borrowing period is 14 days.</li>
              <li>Unavailable books can be added to a member waitlist.</li>
              <li>Online reading is available only for digital titles.</li>
            </ul>
          </div>
        </motion.aside>
      </motion.section>

      {relatedBooks.length > 0 ? (
        <motion.section
          className="border-t border-border bg-secondary/35"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-foreground">
                More from {category}
              </h2>
            </motion.div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {relatedBooks.map((relatedBook) => (
                <motion.article
                  key={relatedBook.id}
                  variants={itemVariants}
                  whileHover={cardHover}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="rounded-lg border border-border bg-card p-4 shadow-sm"
                >
                  <h3 className="text-base leading-6 font-semibold text-foreground">
                    {relatedBook.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {relatedBook.author}
                  </p>
                  <Link
                    to="/collections/$id"
                    params={{ id: relatedBook.id }}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "mt-4 h-10 w-full"
                    )}
                  >
                    View details
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>
      ) : null}
    </main>
  )
}
