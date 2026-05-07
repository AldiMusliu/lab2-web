export type NotificationType = "due-soon" | "overdue" | "system" | string

export type Notification = {
  id: string
  userId: string
  title: string
  message: string
  type: NotificationType
  readAt: string | null
  createdAt: string
}

export type NotificationQuery = {
  unreadOnly?: boolean
  limit?: number
}

export type CreateNotificationBody = {
  userId: string
  title: string
  message: string
  type?: NotificationType
}

export type UnreadNotificationCount = {
  count: number
}

export type MarkAllNotificationsReadResponse = {
  updatedCount: number
}
