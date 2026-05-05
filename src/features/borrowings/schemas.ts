import { z } from "zod"

export const createBorrowingSchema = z.object({
  bookId: z.string().min(1, "Book is required"),
  dueAt: z.string().min(1, "Due date is required"),
  userId: z.string().optional(),
})

export type CreateBorrowingFormValues = z.infer<typeof createBorrowingSchema>
