import { useQuery } from "@tanstack/react-query"

import { httpClient } from "@/lib/http-client"
import type { Borrowing } from "@/features/borrowings/types"

export const borrowingKeys = {
  all: ["borrowings"] as const,
  lists: () => [...borrowingKeys.all, "list"] as const,
  list: () => [...borrowingKeys.lists()] as const,
  details: () => [...borrowingKeys.all, "detail"] as const,
  detail: (borrowingId: string) =>
    [...borrowingKeys.details(), borrowingId] as const,
}

export function getBorrowings() {
  return httpClient.get<Borrowing[]>("/borrowings")
}

export function getBorrowingById(borrowingId: string) {
  return httpClient.get<Borrowing>(`/borrowings/${borrowingId}`)
}

export function useBorrowings() {
  return useQuery({
    queryKey: borrowingKeys.list(),
    queryFn: getBorrowings,
  })
}

export function useBorrowing(borrowingId: string) {
  return useQuery({
    queryKey: borrowingKeys.detail(borrowingId),
    queryFn: () => getBorrowingById(borrowingId),
    enabled: Boolean(borrowingId),
  })
}
