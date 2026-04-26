import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { BookMarked, BookOpenText, CheckCircle2 } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { getCardHover } from "@/features/publicPages/home/home-motion"
import { cn } from "@/lib/utils"

import { BookCover } from "./book-cover"
import { getAvailabilityLabel, getBookCategory } from "./collections-utils"
import type { Book } from "./collections-types"

export function BookCard({
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
      className="group flex h-full min-h-100 flex-col rounded-lg border border-border bg-card shadow-sm transition-colors focus-within:border-primary/35 hover:border-primary/35"
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
                "h-10 w-full gap-2"
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
                "h-10 w-full gap-2"
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
