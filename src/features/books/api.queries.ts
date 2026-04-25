import { readMockBookById, readMockBooks } from "@/features/books/mock-store"

export function getBooks() {
  return Promise.resolve(readMockBooks())
}

export function getBookById(bookId: string) {
  const book = readMockBookById(bookId)

  if (!book) {
    return Promise.reject(new Error("Book not found"))
  }

  return Promise.resolve(book)
}
