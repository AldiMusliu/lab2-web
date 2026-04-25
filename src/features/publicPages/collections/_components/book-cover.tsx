import { BookCopy } from "lucide-react"

import { cn } from "@/lib/utils"

import { getBookCategory, bookCoverToneClass } from "./collections-utils"
import type { Book } from "./collections-types"

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
        bookCoverToneClass,
        compact ? "aspect-4/5 min-h-44" : "aspect-4/5 h-56 w-full"
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
