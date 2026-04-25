import { Link } from "@tanstack/react-router"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowLeft,
  BookMarked,
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  Hash,
  Languages,
  LibraryBig,
  MapPin,
  ScrollText,
  Tags,
  UserRound,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  BookCover,
  getAvailabilityLabel,
  getBookCategory,
} from "@/features/publicPages/collections/public-collections-page"
import {
  createItemVariants,
  createSectionVariants,
  getCardHover,
} from "@/features/publicPages/home/home-motion"
import { cn } from "@/lib/utils"
import { mockBooks } from "@/mocks"

type Book = (typeof mockBooks)[number]

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4" />
        {label}
      </div>
      <p className="mt-2 text-sm leading-6 font-semibold text-foreground">
        {value}
      </p>
    </div>
  )
}

function ActionPanel({ book }: { book: Book }) {
  const isAvailable = book.availableCopies > 0

  return (
    <aside className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-md",
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
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {isAvailable ? "Available for borrowing" : "Currently unavailable"}
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {getAvailabilityLabel(book)}. Member actions will connect to the
            borrowing flow when the backend is added.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {book.readOnline ? (
          <Link
            to="/login"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 w-full gap-2"
            )}
          >
            <BookOpenText className="size-4" />
            Read online
          </Link>
        ) : (
          <div className="rounded-md border border-border bg-secondary px-3 py-3 text-sm text-muted-foreground">
            Online reading is not available for this title.
          </div>
        )}

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
    </aside>
  )
}

export function PublicCollectionDetailPage({ bookId }: { bookId: string }) {
  const shouldReduceMotion = useReducedMotion()
  const prefersReducedMotion = Boolean(shouldReduceMotion)
  const sectionVariants = createSectionVariants(prefersReducedMotion)
  const itemVariants = createItemVariants(prefersReducedMotion)
  const cardHover = getCardHover(prefersReducedMotion)

  const book = mockBooks.find((item) => item.id === bookId)

  if (!book) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <LibraryBig className="mx-auto size-11 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-semibold text-foreground">
          Book not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          This catalogue item may have been moved or removed.
        </p>
        <Link
          to="/collections"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "mt-6 h-11 gap-2"
          )}
        >
          <ArrowLeft className="size-4" />
          Back to catalogue
        </Link>
      </main>
    )
  }

  const category = getBookCategory(book)
  const relatedBooks = mockBooks
    .filter(
      (item) => item.categoryId === book.categoryId && item.id !== book.id
    )
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
              className="inline-flex h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <ArrowLeft className="size-4" />
              Back to catalogue
            </Link>
          </motion.div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[330px_1fr_360px] lg:items-start">
            <motion.div variants={itemVariants}>
              <BookCover book={book} compact />
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
              <ActionPanel book={book} />
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
            <DetailItem icon={UserRound} label="Author" value={book.author} />
            <DetailItem
              icon={CalendarDays}
              label="Published"
              value={String(book.publishedYear)}
            />
            <DetailItem
              icon={Languages}
              label="Language"
              value={book.language}
            />
            <DetailItem
              icon={ScrollText}
              label="Pages"
              value={`${book.pages} pages`}
            />
            <DetailItem icon={Hash} label="ISBN" value={book.isbn} />
            <DetailItem
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
                      "mt-4 h-11 w-full"
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
