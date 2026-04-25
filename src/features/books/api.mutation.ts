import type { UpsertBookInput } from "@/features/books/types"
import {
  createMockBook,
  deleteMockBook,
  updateMockBook,
} from "@/features/books/mock-store"

export function createBook(payload: UpsertBookInput) {
  return Promise.resolve(createMockBook(payload))
}

export function updateBook(bookId: string, payload: UpsertBookInput) {
  const book = updateMockBook(bookId, payload)

  if (!book) {
    return Promise.reject(new Error("Book not found"))
  }

  return Promise.resolve(book)
}

export function deleteBook(bookId: string) {
  return Promise.resolve(deleteMockBook(bookId))
}
