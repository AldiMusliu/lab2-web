import type { Book } from "./collections-types"
import type { Category } from "@/features/categories/types"

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

export function getBookCategory(book: Book, categories: Array<Category>) {
  return (
    categories.find((category) => category.id === book.categoryId)?.name ??
    "Unsorted"
  )
}

export function getAvailabilityLabel(book: Book) {
  if (book.availableCopies > 0) {
    return `${book.availableCopies} of ${book.totalCopies} copies available`
  }

  return "All copies are currently borrowed"
}
