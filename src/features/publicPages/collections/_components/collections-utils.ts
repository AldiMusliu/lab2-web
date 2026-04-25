import { mockCategories } from "@/mocks"

import type { Book } from "./collections-types"

const categoryLookup = new Map(
  mockCategories.map((category) => [category.id, category.name])
)

export const bookCoverToneClass = "from-slate-200 via-white to-slate-900"

export function getVisiblePages(currentPage: number, totalPages: number) {
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
