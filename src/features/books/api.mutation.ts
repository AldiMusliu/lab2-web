import { useMutation, useQueryClient } from "@tanstack/react-query"

import type { Book, UpsertBookInput } from "@/features/books/types"
import { bookKeys } from "@/features/books/api.queries"
import { httpClient } from "@/lib/http-client"

export function createBook(payload: UpsertBookInput) {
  return httpClient.post<Book>("/books", payload)
}

export function updateBook(bookId: string, payload: UpsertBookInput) {
  return httpClient.put<Book>(`/books/${bookId}`, payload)
}

export function deleteBook(bookId: string) {
  return httpClient.delete<void>(`/books/${bookId}`)
}

export function useCreateBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: bookKeys.all })
    },
  })
}

export function useUpdateBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      bookId,
      payload,
    }: {
      bookId: string
      payload: UpsertBookInput
    }) => updateBook(bookId, payload),
    onSuccess: (book) => {
      void queryClient.invalidateQueries({ queryKey: bookKeys.all })
      queryClient.setQueryData(bookKeys.detail(book.id), book)
    },
  })
}

export function useDeleteBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: bookKeys.all })
    },
  })
}
