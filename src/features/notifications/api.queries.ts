import { useQuery } from "@tanstack/react-query"

import type {
  Notification,
  NotificationQuery,
  UnreadNotificationCount,
} from "@/features/notifications/types"
import { httpClient } from "@/lib/http-client"

export const notificationKeys = {
  all: ["notifications"] as const,
  lists: () => [...notificationKeys.all, "list"] as const,
  list: (query?: NotificationQuery) =>
    [...notificationKeys.lists(), query] as const,
  unreadCount: () => [...notificationKeys.all, "unread-count"] as const,
}

function toNotificationQueryString(query: NotificationQuery = {}) {
  const params = new URLSearchParams()

  if (query.unreadOnly !== undefined) {
    params.set("unreadOnly", String(query.unreadOnly))
  }

  if (query.limit !== undefined) {
    params.set("limit", String(query.limit))
  }

  const queryString = params.toString()

  return queryString ? `?${queryString}` : ""
}

export function getNotifications(query?: NotificationQuery) {
  return httpClient.get<Notification[]>(
    `/notifications${toNotificationQueryString(query)}`
  )
}

export function getUnreadNotificationCount() {
  return httpClient.get<UnreadNotificationCount>("/notifications/unread-count")
}

export function useNotifications(query?: NotificationQuery) {
  return useQuery({
    queryKey: notificationKeys.list(query),
    queryFn: () => getNotifications(query),
  })
}

export function useUnreadNotificationCount() {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: getUnreadNotificationCount,
  })
}
