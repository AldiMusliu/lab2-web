import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { QueryClient } from "@tanstack/react-query"

import { notificationKeys } from "@/features/notifications/api.queries"
import type {
  CreateNotificationBody,
  MarkAllNotificationsReadResponse,
  Notification,
} from "@/features/notifications/types"
import { httpClient } from "@/lib/http-client"

export function createNotification(payload: CreateNotificationBody) {
  return httpClient.post<Notification>("/notifications", payload)
}

export function markNotificationRead(notificationId: string) {
  return httpClient.patch<Notification>(`/notifications/${notificationId}/read`)
}

export function markAllNotificationsRead() {
  return httpClient.patch<MarkAllNotificationsReadResponse>(
    "/notifications/read-all"
  )
}

export function deleteNotification(notificationId: string) {
  return httpClient.delete<void>(`/notifications/${notificationId}`)
}

export function invalidateNotifications(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: notificationKeys.all })
}

export function useCreateNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createNotification,
    onSuccess: () => {
      void invalidateNotifications(queryClient)
    },
  })
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: (notification) => {
      void invalidateNotifications(queryClient)
      queryClient.setQueryData(
        notificationKeys.list({ limit: 10 }),
        (current: Notification[] | undefined) =>
          current?.map((item) =>
            item.id === notification.id ? notification : item
          )
      )
    },
  })
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      void invalidateNotifications(queryClient)
    },
  })
}

export function useDeleteNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      void invalidateNotifications(queryClient)
    },
  })
}
