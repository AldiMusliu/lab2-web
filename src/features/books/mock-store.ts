import type { Book, UpsertBookInput } from "@/features/books/types"
import { mockBooks } from "@/mocks/data/books"

let booksStore = mockBooks.map(cloneBook)

const defaultHiddenBookFields = {
  coverTone: "teal",
  isbn: "Not assigned",
  shelfLocation: "Unassigned",
} satisfies Pick<Book, "coverTone" | "isbn" | "shelfLocation">

function cloneBook(book: Book): Book {
  return {
    ...book,
    formats: [...book.formats],
    tags: [...book.tags],
  }
}

function createBookId() {
  return `book-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function readMockBooks() {
  return booksStore.map(cloneBook)
}

export function readMockBookById(bookId: string) {
  const book = booksStore.find((item) => item.id === bookId)

  return book ? cloneBook(book) : null
}

export function createMockBook(payload: UpsertBookInput) {
  const book = cloneBook({
    id: createBookId(),
    ...defaultHiddenBookFields,
    ...payload,
  })

  booksStore = [book, ...booksStore]

  return cloneBook(book)
}

export function updateMockBook(bookId: string, payload: UpsertBookInput) {
  const bookIndex = booksStore.findIndex((item) => item.id === bookId)

  if (bookIndex === -1) {
    return null
  }

  const book = cloneBook({
    ...booksStore[bookIndex],
    ...payload,
    id: bookId,
  })

  booksStore = booksStore.map((item, index) =>
    index === bookIndex ? book : item
  )

  return cloneBook(book)
}

export function deleteMockBook(bookId: string) {
  const initialCount = booksStore.length
  booksStore = booksStore.filter((item) => item.id !== bookId)

  return booksStore.length < initialCount
}
