export const mockBorrowings = [
  {
    id: "borrowing-001",
    userId: "user-001",
    bookId: "book-001",
    borrowedAt: "2026-04-20T10:00:00.000Z",
    dueAt: "2026-05-04T10:00:00.000Z",
    returnedAt: null,
    status: "active",
  },
  {
    id: "borrowing-002",
    userId: "user-001",
    bookId: "book-003",
    borrowedAt: "2026-04-10T09:30:00.000Z",
    dueAt: "2026-04-24T09:30:00.000Z",
    returnedAt: null,
    status: "overdue",
  },
  {
    id: "borrowing-003",
    userId: "user-001",
    bookId: "book-006",
    borrowedAt: "2026-03-12T14:15:00.000Z",
    dueAt: "2026-03-26T14:15:00.000Z",
    returnedAt: "2026-03-24T12:00:00.000Z",
    status: "returned",
  },
]
