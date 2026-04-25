import {
  createItemVariants,
  createSectionVariants,
  getCardHover,
} from "@/features/publicPages/home/home-motion"
import { mockBooks, mockBorrowings, mockCategories } from "@/mocks"
import { Link } from "@tanstack/react-router"
import { motion, useReducedMotion } from "framer-motion"
import {
  BookCopy,
  BookOpenCheck,
  Clock3,
  LibraryBig,
  Search,
  Tags,
} from "lucide-react"

const activeBorrowings = mockBorrowings.filter(
  (item) => item.returnedAt === null
)
const borrowedBookIds = new Set(activeBorrowings.map((item) => item.bookId))

const collectionStats = [
  {
    label: "Catalogue records",
    value: String(mockBooks.length),
    icon: BookCopy,
  },
  {
    label: "Categories",
    value: String(mockCategories.length),
    icon: Tags,
  },
  {
    label: "Available copies",
    value: String(
      mockBooks.reduce((total, book) => total + book.availableCopies, 0)
    ),
    icon: BookOpenCheck,
  },
] as const

const categoryLookup = new Map(
  mockCategories.map((category) => [category.id, category.name])
)

export function PublicCollectionsPage() {
  const shouldReduceMotion = useReducedMotion()
  const prefersReducedMotion = Boolean(shouldReduceMotion)
  const sectionVariants = createSectionVariants(prefersReducedMotion)
  const itemVariants = createItemVariants(prefersReducedMotion)
  const cardHover = getCardHover(prefersReducedMotion)

  return (
    <div className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_18%_4%,rgba(2,132,199,0.18),transparent_38%),radial-gradient(circle_at_86%_10%,rgba(34,197,94,0.14),transparent_34%)]" />

      <motion.section
        className="relative border-b border-border/60"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
              Smart catalogue
            </p>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Browse a collection built for quick answers.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                The public collection page gives members a clear preview of
                titles, categories, availability, and borrowing status before
                they enter the full Smart Library portal.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/login"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Open member portal
              </Link>
              <Link
                to="/services"
                className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                View services
              </Link>
            </div>
          </motion.div>

          <motion.aside
            variants={itemVariants}
            className="rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-lg shadow-primary/5"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <LibraryBig className="size-5" />
              </span>
              <div>
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  Collection health
                </p>
                <p className="text-sm text-muted-foreground">
                  A readable snapshot for public visitors.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {collectionStats.map((stat) => {
                const Icon = stat.icon

                return (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={cardHover}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex items-center justify-between rounded-2xl border border-border/70 bg-secondary p-4"
                  >
                    <div>
                      <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.aside>
        </div>
      </motion.section>

      <motion.section
        className="border-b border-border/60 bg-secondary/55"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <motion.div variants={itemVariants} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-primary uppercase">
              <Search className="size-3.5" />
              Public browsing
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Titles currently visible in the catalogue
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Each title shows the information members ask for first: author,
              shelf category, copy count, and whether the title is currently on
              loan.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mockBooks.map((book) => {
              const category = categoryLookup.get(book.categoryId) ?? "Unsorted"
              const isBorrowed = borrowedBookIds.has(book.id)

              return (
                <motion.article
                  key={book.id}
                  variants={itemVariants}
                  whileHover={cardHover}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="h-full rounded-3xl border border-border/70 bg-card p-6 shadow-sm"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <BookCopy className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {book.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {book.author}
                  </p>
                  <dl className="mt-5 grid gap-3 text-sm">
                    <div className="rounded-xl border border-border/70 bg-secondary px-4 py-3">
                      <dt className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                        Category
                      </dt>
                      <dd className="mt-1 font-medium text-foreground">
                        {category}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-border/70 bg-secondary px-4 py-3">
                      <dt className="text-muted-foreground">
                        Available copies
                      </dt>
                      <dd className="font-semibold text-foreground">
                        {book.availableCopies}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                    <Clock3 className="size-3.5" />
                    {isBorrowed ? "Currently on loan" : "Ready to borrow"}
                  </p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
