import type {
  Book,
  BookAvailability,
  BookSort,
} from "@/features/books/types"

export type { Book }

export type AvailabilityFilter = BookAvailability
export type SortMode = BookSort

export const pageSizeOptions = [6, 9, 12] as const
export type PageSizeOption = (typeof pageSizeOptions)[number]
