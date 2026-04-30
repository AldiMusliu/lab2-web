import { useQuery } from "@tanstack/react-query"

import type { Book, BookFilters } from "@/features/books/types"
import { httpClient } from "@/lib/http-client"

export const bookKeys = {
  all: ["books"] as const,
  lists: () => [...bookKeys.all, "list"] as const,
  list: (filters?: BookFilters) => [...bookKeys.lists(), filters] as const,
  details: () => [...bookKeys.all, "detail"] as const,
  detail: (bookId: string) => [...bookKeys.details(), bookId] as const,
}

function toQueryString(filters: BookFilters = {}) {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value))
    }
  })

  const query = params.toString()

  return query ? `?${query}` : ""
}

export function getBooks(filters?: BookFilters) {
  return httpClient.get<Book[]>(`/books${toQueryString(filters)}`)
}

export function getBookById(bookId: string) {
  return httpClient.get<Book>(`/books/${bookId}`)
}

export function useBooks(filters?: BookFilters) {
  return useQuery({
    queryKey: bookKeys.list(filters),
    queryFn: () => getBooks(filters),
  })
}

export function useBook(bookId: string) {
  return useQuery({
    queryKey: bookKeys.detail(bookId),
    queryFn: () => getBookById(bookId),
    enabled: Boolean(bookId),
  })
}
