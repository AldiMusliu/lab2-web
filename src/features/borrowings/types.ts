export type BorrowingStatus = "active" | "returned" | "overdue"

export type BorrowingUser = {
  id: string
  firstName: string
  lastName: string
  name: string
}

export type Borrowing = {
  id: string
  userId: string
  user?: BorrowingUser | null
  bookId: string
  borrowedAt: string
  dueAt: string
  returnedAt: string | null
  status: BorrowingStatus
}

export type CreateBorrowingInput = {
  bookId: string
  dueAt: string
  userId?: string
}
