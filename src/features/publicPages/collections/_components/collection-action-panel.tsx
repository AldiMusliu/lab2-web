import { Link } from "@tanstack/react-router"
import { BookMarked, BookOpenText, CheckCircle2 } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { getAvailabilityLabel } from "./collections-utils"
import type { Book } from "./collections-types"

export function CollectionActionPanel({ book }: { book: Book }) {
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
