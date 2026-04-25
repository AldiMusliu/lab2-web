import { mockBooks } from "@/mocks"

export type Book = (typeof mockBooks)[number]

export type AvailabilityFilter = "all" | "available" | "online" | "waitlist"
export type SortMode = "title" | "author" | "newest" | "copies"

export const pageSizeOptions = [6, 9, 12] as const
export type PageSizeOption = (typeof pageSizeOptions)[number]
