import { httpClient } from "@/lib/http-client"
import type { Borrowing } from "@/features/borrowings/types"

export function getBorrowings() {
  return httpClient.get<Borrowing[]>("/borrowings")
}

export function getBorrowingById(borrowingId: string) {
  return httpClient.get<Borrowing>(`/borrowings/${borrowingId}`)
}
