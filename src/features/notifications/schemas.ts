import { z } from "zod"

import type { CreateNotificationBody } from "@/features/notifications/types"

export const notificationTypeOptions = [
  { label: "System", value: "system" },
  { label: "Due soon", value: "due-soon" },
  { label: "Overdue", value: "overdue" },
] satisfies Array<{ label: string; value: string }>

export const createNotificationSchema = z.object({
  userId: z.string().trim().min(1, "User is required"),
  bookId: z.string().trim().min(1, "Book title is required"),
  message: z.string().trim().min(1, "Message is required"),
  type: z.string().trim().min(1, "Type is required"),
})

export type CreateNotificationFormValues = z.infer<
  typeof createNotificationSchema
>

export const defaultCreateNotificationValues: CreateNotificationFormValues = {
  userId: "",
  bookId: "",
  message: "",
  type: "system",
}

export function formValuesToCreateNotificationBody(
  values: CreateNotificationFormValues,
  bookTitle: string
): CreateNotificationBody {
  return {
    userId: values.userId.trim(),
    title: bookTitle.trim(),
    message: values.message.trim(),
    type: values.type.trim(),
  }
}
