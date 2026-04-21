import { z } from "zod"

export const createBorrowingSchema = z.object({
  userId: z.string().min(1, "User is required"),
  bookId: z.string().min(1, "Book is required"),
  dueAt: z.string().min(1, "Due date is required"),
})

export type CreateBorrowingFormValues = z.infer<typeof createBorrowingSchema>
