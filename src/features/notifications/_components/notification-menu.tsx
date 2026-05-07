import { formatDistanceToNow } from "date-fns"
import {
  AlertCircle,
  Bell,
  CheckCheck,
  Loader2,
  MailOpen,
  Plus,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"

import type { Notification } from "@/features/notifications/types"
import { NotificationCreateForm } from "@/features/notifications/_components/notification-create-form"
import {
  useNotifications,
  useUnreadNotificationCount,
} from "@/features/notifications/api.queries"
import {
  useDeleteNotification,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
} from "@/features/notifications/api.mutation"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useUiStore } from "@/stores/ui.store"
import { useSessionStore } from "@/stores/session.store"
import { getHttpErrorMessage } from "@/lib/http-client"
import { cn } from "@/lib/utils"

const previewQuery = { limit: 10 } as const

const notificationTypeClasses: Record<string, string> = {
  "due-soon": "border-amber-200 bg-amber-50 text-amber-800",
  overdue: "border-rose-200 bg-rose-50 text-rose-700",
  system: "border-sky-200 bg-sky-50 text-sky-700",
}

export function NotificationMenu() {
  const role = useSessionStore((state) => state.role)
  const openGlobalDialog = useUiStore((state) => state.openGlobalDialog)
  const closeGlobalDialog = useUiStore((state) => state.closeGlobalDialog)
  const isAdmin = role === "admin"

  const notificationsQuery = useNotifications(previewQuery)
  const unreadCountQuery = useUnreadNotificationCount()
  const markReadMutation = useMarkNotificationRead()
  const markAllReadMutation = useMarkAllNotificationsRead()
  const deleteMutation = useDeleteNotification()

  const notifications = notificationsQuery.data ?? []
  const unreadCount = unreadCountQuery.data?.count ?? 0
  const pendingDeleteId = deleteMutation.isPending
    ? deleteMutation.variables
    : undefined
  const pendingMarkReadId = markReadMutation.isPending
    ? markReadMutation.variables
    : undefined
  const hasUnread = unreadCount > 0
  const hasNotifications = notifications.length > 0
  const isUnavailable =
    isNotificationServiceUnavailable(notificationsQuery.error) ||
    isNotificationServiceUnavailable(unreadCountQuery.error)
  const isInitialLoading =
    notificationsQuery.isLoading || unreadCountQuery.isLoading

  function openCreateDialog() {
    openGlobalDialog({
      title: "Create notification",
      description: "Send a short notification to a library member.",
      hideFooter: true,
      children: (
        <NotificationCreateForm
          onCancel={closeGlobalDialog}
          onSaved={closeGlobalDialog}
        />
      ),
    })
  }

  function handleMarkRead(notification: Notification) {
    if (notification.readAt || markReadMutation.isPending) {
      return
    }

    markReadMutation.mutate(notification.id, {
      onError: (error) => {
        toast.error("Could not mark notification read", {
          description: getHttpErrorMessage(error, "Try again in a moment."),
        })
      },
    })
  }

  function handleMarkAllRead() {
    markAllReadMutation.mutate(undefined, {
      onSuccess: (response) => {
        toast.success("Notifications updated", {
          description:
            response.updatedCount > 0
              ? `${response.updatedCount} marked as read.`
              : "Everything was already read.",
        })
      },
      onError: (error) => {
        toast.error("Could not mark notifications read", {
          description: getHttpErrorMessage(error, "Try again in a moment."),
        })
      },
    })
  }

  function handleDelete(notification: Notification) {
    deleteMutation.mutate(notification.id, {
      onSuccess: () => {
        toast.success("Notification deleted")
      },
      onError: (error) => {
        toast.error("Could not delete notification", {
          description: getHttpErrorMessage(error, "Try again in a moment."),
        })
      },
    })
  }

  function retryNotifications() {
    void notificationsQuery.refetch()
    void unreadCountQuery.refetch()
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            aria-label={
              hasUnread
                ? `Open notifications, ${unreadCount} unread`
                : "Open notifications"
            }
            className="relative"
          >
            <Bell className="size-4" aria-hidden="true" />
            {hasUnread ? (
              <span className="absolute -top-1 -right-1 flex min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[0.65rem] leading-5 font-semibold text-white ring-2 ring-background">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            ) : null}
          </Button>
        }
      />
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[min(calc(100vw-2rem),26rem)] gap-0 p-0"
      >
        <PopoverHeader className="gap-3 border-b p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <PopoverTitle className="text-base">Notifications</PopoverTitle>
              <PopoverDescription className="mt-1 text-xs">
                Latest library account updates.
              </PopoverDescription>
            </div>
            {isAdmin ? (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={openCreateDialog}
              >
                <Plus className="size-3.5" aria-hidden="true" />
                Create
              </Button>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              {hasUnread ? `${unreadCount} unread` : "No unread notifications"}
            </p>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              disabled={!hasUnread || markAllReadMutation.isPending}
              onClick={handleMarkAllRead}
            >
              {markAllReadMutation.isPending ? (
                <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <CheckCheck className="size-3.5" aria-hidden="true" />
              )}
              Mark all read
            </Button>
          </div>
        </PopoverHeader>

        <div className="max-h-[28rem] overflow-y-auto p-2">
          {isInitialLoading ? (
            <div className="flex min-h-36 items-center justify-center">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : isUnavailable ? (
            <NotificationState
              title="Notifications unavailable"
              description="The notification service is not reachable right now."
              actionLabel="Retry"
              onAction={retryNotifications}
            />
          ) : notificationsQuery.isError ? (
            <NotificationState
              title="Could not load notifications"
              description="Refresh this panel to try again."
              actionLabel="Retry"
              onAction={retryNotifications}
            />
          ) : hasNotifications ? (
            <ul className="space-y-1.5">
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <NotificationPreview
                    notification={notification}
                    pendingDeleteId={pendingDeleteId}
                    pendingMarkReadId={pendingMarkReadId}
                    onDelete={handleDelete}
                    onMarkRead={handleMarkRead}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <NotificationState
              title="No notifications"
              description="Library updates will appear here."
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

type NotificationPreviewProps = {
  notification: Notification
  onDelete: (notification: Notification) => void
  onMarkRead: (notification: Notification) => void
  pendingDeleteId?: string
  pendingMarkReadId?: string
}

function NotificationPreview({
  notification,
  onDelete,
  onMarkRead,
  pendingDeleteId,
  pendingMarkReadId,
}: NotificationPreviewProps) {
  const isUnread = notification.readAt === null
  const deletePending = pendingDeleteId === notification.id
  const markReadPending = pendingMarkReadId === notification.id
  const typeClassName =
    notificationTypeClasses[notification.type] ??
    "border-border bg-muted text-muted-foreground"

  return (
    <div
      className={cn(
        "grid grid-cols-[minmax(0,1fr)_auto] gap-2 rounded-lg border p-2.5 transition-colors",
        isUnread ? "bg-secondary/80" : "bg-background"
      )}
    >
      <button
        type="button"
        className="min-w-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
        disabled={!isUnread || Boolean(pendingMarkReadId)}
        onClick={() => onMarkRead(notification)}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "size-2 shrink-0 rounded-full",
              isUnread ? "bg-primary" : "bg-transparent"
            )}
            aria-hidden="true"
          />
          <p
            className={cn(
              "truncate text-sm text-foreground",
              isUnread ? "font-semibold" : "font-medium"
            )}
          >
            {notification.title}
          </p>
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {notification.message}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[0.7rem] font-medium",
              typeClassName
            )}
          >
            {formatNotificationType(notification.type)}
          </span>
          <span className="text-[0.7rem] text-muted-foreground">
            {formatNotificationDate(notification.createdAt)}
          </span>
        </div>
      </button>

      <div className="flex flex-col gap-1">
        {isUnread ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Mark notification as read"
            disabled={Boolean(pendingMarkReadId)}
            onClick={() => onMarkRead(notification)}
          >
            {markReadPending ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <MailOpen className="size-4" aria-hidden="true" />
            )}
          </Button>
        ) : null}
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Delete notification"
          disabled={Boolean(pendingDeleteId)}
          onClick={() => onDelete(notification)}
        >
          {deletePending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Trash2 className="size-4" aria-hidden="true" />
          )}
        </Button>
      </div>
    </div>
  )
}

type NotificationStateProps = {
  actionLabel?: string
  description: string
  onAction?: () => void
  title: string
}

function NotificationState({
  actionLabel,
  description,
  onAction,
  title,
}: NotificationStateProps) {
  return (
    <div className="flex min-h-36 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
      <AlertCircle
        className="size-5 text-muted-foreground"
        aria-hidden="true"
      />
      <p className="mt-2 text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 max-w-60 text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
      {actionLabel && onAction ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAction}
          className="mt-3"
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}

function formatNotificationType(type: string) {
  return type
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function formatNotificationDate(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "Unknown time"
  }

  return formatDistanceToNow(date, { addSuffix: true })
}

function isNotificationServiceUnavailable(error: unknown) {
  if (!error) {
    return false
  }

  if (error instanceof Error) {
    return /503|service unavailable/i.test(error.message)
  }

  if (typeof error !== "object") {
    return false
  }

  const record = error as Record<string, unknown>

  return (
    record.status === 503 ||
    record.statusCode === 503 ||
    record.code === 503 ||
    record.code === "SERVICE_UNAVAILABLE"
  )
}
