import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, RotateCcw, Send, X } from "lucide-react"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import type { Book } from "@/features/books/types"
import type { User } from "@/features/users/types"
import type { CreateNotificationFormValues } from "@/features/notifications/schemas"
import {
  createNotificationSchema,
  defaultCreateNotificationValues,
  formValuesToCreateNotificationBody,
  notificationTypeOptions,
} from "@/features/notifications/schemas"
import { useBooks } from "@/features/books/api.queries"
import { useCreateNotification } from "@/features/notifications/api.mutation"
import { useUsers } from "@/features/users/api.queries"
import {
  ControlledSelect,
  ControlledTextarea,
} from "@/components/molecules/controlled"
import { Button } from "@/components/ui/button"
import { getHttpErrorMessage } from "@/lib/http-client"

type NotificationCreateFormProps = {
  onCancel?: () => void
  onSaved?: () => void
}

export function NotificationCreateForm({
  onCancel,
  onSaved,
}: NotificationCreateFormProps) {
  const form = useForm<CreateNotificationFormValues>({
    resolver: zodResolver(createNotificationSchema),
    defaultValues: defaultCreateNotificationValues,
  })
  const usersQuery = useUsers()
  const booksQuery = useBooks({
    availability: "all",
    pageSize: 100,
    sort: "title",
  })
  const mutation = useCreateNotification()

  const users = usersQuery.data ?? []
  const books = booksQuery.data ?? []
  const selectedBookId = form.watch("bookId")
  const selectedBook = books.find((book) => book.id === selectedBookId)

  const userOptions = useMemo(
    () =>
      users.map((user) => ({
        label: getUserSelectLabel(user),
        value: user.id,
      })),
    [users]
  )

  const bookOptions = useMemo(
    () =>
      books.map((book) => ({
        label: getBookSelectLabel(book),
        value: book.id,
      })),
    [books]
  )

  const isLoadingOptions = usersQuery.isLoading || booksQuery.isLoading
  const hasOptionError = usersQuery.isError || booksQuery.isError
  const isMissingOptions = userOptions.length === 0 || bookOptions.length === 0
  const isSubmitDisabled =
    mutation.isPending ||
    isLoadingOptions ||
    hasOptionError ||
    isMissingOptions ||
    !selectedBook

  function handleSubmit(values: CreateNotificationFormValues) {
    if (!selectedBook) {
      form.setError("bookId", {
        message: "Select a book title",
      })
      return
    }

    mutation.mutate(
      formValuesToCreateNotificationBody(values, selectedBook.title),
      {
        onSuccess: (notification) => {
          toast.success("Notification created", {
            description: notification.title,
          })
          form.reset(defaultCreateNotificationValues)
          onSaved?.()
        },
        onError: (error) => {
          toast.error("Could not create notification", {
            description: getHttpErrorMessage(
              error,
              "Check the recipient and message details."
            ),
          })
        },
      }
    )
  }

  function retryOptions() {
    void usersQuery.refetch()
    void booksQuery.refetch()
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
      {hasOptionError ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <p className="font-medium">Dropdown options unavailable</p>
          <p className="mt-1 text-xs">
            Users or book titles could not be loaded.
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={retryOptions}
            className="mt-3 bg-white/70"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Retry
          </Button>
        </div>
      ) : null}

      <ControlledSelect
        control={form.control}
        name="userId"
        label="User"
        options={userOptions}
        placeholder={usersQuery.isLoading ? "Loading users..." : "Select user"}
        triggerClassName="h-10 w-full"
        contentClassName="max-h-72"
        disabled={
          mutation.isPending || usersQuery.isLoading || usersQuery.isError
        }
      />
      <ControlledSelect
        control={form.control}
        name="bookId"
        label="Book title"
        options={bookOptions}
        placeholder={
          booksQuery.isLoading ? "Loading book titles..." : "Select book title"
        }
        triggerClassName="h-10 w-full"
        contentClassName="max-h-72"
        disabled={
          mutation.isPending || booksQuery.isLoading || booksQuery.isError
        }
      />
      <ControlledTextarea
        control={form.control}
        name="message"
        label="Message"
        placeholder="Your borrowed book is due soon."
        textareaClassName="min-h-28"
        disabled={mutation.isPending}
      />
      <ControlledSelect
        control={form.control}
        name="type"
        label="Type"
        options={notificationTypeOptions}
        triggerClassName="h-10 w-full"
        disabled={mutation.isPending}
      />

      <div className="flex flex-col-reverse justify-end gap-2 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={mutation.isPending}
          className="h-10"
        >
          <X className="size-4" aria-hidden="true" />
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitDisabled} className="h-10">
          {mutation.isPending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {mutation.isPending ? "Sending..." : "Send notification"}
        </Button>
      </div>
    </form>
  )
}

function getUserSelectLabel(user: User) {
  const splitName = [user.firstName, user.lastName]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(" ")
  const displayName = splitName || user.email || user.id

  if (user.email && user.email !== displayName) {
    return `${displayName} (${user.email})`
  }

  return displayName
}

function getBookSelectLabel(book: Book) {
  return book.author ? `${book.title} - ${book.author}` : book.title
}
