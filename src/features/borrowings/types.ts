export type BorrowingStatus = "active" | "returned" | "overdue"

export type Borrowing = {
  id: string
  userId: string
  bookId: string
  borrowedAt: string
  dueAt: string
  returnedAt: string | null
  status: BorrowingStatus
}

export type CreateBorrowingInput = {
  userId: string
  bookId: string
  dueAt: string
}
