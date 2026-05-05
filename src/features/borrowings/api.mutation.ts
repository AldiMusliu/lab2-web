import { useMutation, useQueryClient } from "@tanstack/react-query"

import { bookKeys } from "@/features/books/api.queries"
import { borrowingKeys } from "@/features/borrowings/api.queries"
import { httpClient } from "@/lib/http-client"
import type {
  Borrowing,
  CreateBorrowingInput,
} from "@/features/borrowings/types"

export function createBorrowing(payload: CreateBorrowingInput) {
  return httpClient.post<Borrowing>("/borrowings", payload)
}

export function returnBorrowing(borrowingId: string) {
  return httpClient.patch<Borrowing>(`/borrowings/${borrowingId}/return`)
}

export const markBorrowingReturned = returnBorrowing

export function useCreateBorrowing() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBorrowing,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: bookKeys.all })
      void queryClient.invalidateQueries({ queryKey: borrowingKeys.all })
    },
  })
}

export function useReturnBorrowing() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: returnBorrowing,
    onSuccess: (borrowing) => {
      void queryClient.invalidateQueries({ queryKey: bookKeys.all })
      void queryClient.invalidateQueries({ queryKey: borrowingKeys.all })
      queryClient.setQueryData(borrowingKeys.detail(borrowing.id), borrowing)
    },
  })
}
