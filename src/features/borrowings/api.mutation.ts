import { httpClient } from "@/services/http-client"
import type { Borrowing, CreateBorrowingInput } from "@/features/borrowings/types"

export function createBorrowing(payload: CreateBorrowingInput) {
  return httpClient.post<Borrowing>("/borrowings", payload)
}

export function markBorrowingReturned(borrowingId: string) {
  return httpClient.patch<Borrowing>(`/borrowings/${borrowingId}/return`)
}
