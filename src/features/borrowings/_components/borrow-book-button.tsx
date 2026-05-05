import { Link } from "@tanstack/react-router"
import { addDays, endOfDay, format, startOfDay } from "date-fns"
import { BookMarked, CalendarDays, Loader2 } from "lucide-react"
import { toast } from "sonner"
import type { ComponentProps } from "react"
import { useState } from "react"

import type { Book } from "@/features/books/types"
import { useCreateBorrowing } from "@/features/borrowings/api.mutation"
import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getHttpErrorMessage } from "@/lib/http-client"
import { cn } from "@/lib/utils"
import { useSessionStore } from "@/stores/session.store"

type BorrowBookButtonProps = {
  book: Book
  className?: string
  size?: ComponentProps<typeof Button>["size"]
  variant?: ComponentProps<typeof Button>["variant"]
}

export function BorrowBookButton({
  book,
  className,
  size = "lg",
  variant = "default",
}: BorrowBookButtonProps) {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated)
  const hasAvailableCopies = book.availableCopies > 0
  const createBorrowingMutation = useCreateBorrowing()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDueDate, setSelectedDueDate] = useState(() =>
    getDefaultDueDate()
  )
  const minimumDueDate = addDays(startOfDay(new Date()), 1)

  function openBorrowDialog() {
    setSelectedDueDate(getDefaultDueDate())
    setDialogOpen(true)
  }

  function handleBorrow() {
    const dueAt = endOfDay(selectedDueDate)

    createBorrowingMutation.mutate(
      {
        bookId: book.id,
        dueAt: dueAt.toISOString(),
      },
      {
        onSuccess: () => {
          setDialogOpen(false)
          toast.success("Book borrowed", {
            description: `${book.title} is due ${format(dueAt, "PPP")}.`,
          })
        },
        onError: (error) => {
          toast.error("Could not borrow book", {
            description: getHttpErrorMessage(
              error,
              "The book may no longer be available."
            ),
          })
        },
      }
    )
  }

  if (!hasAvailableCopies) {
    return (
      <Button
        type="button"
        variant="secondary"
        size={size}
        disabled
        className={className}
      >
        <BookMarked className="size-4" aria-hidden="true" />
        Unavailable
      </Button>
    )
  }

  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        className={cn(buttonVariants({ variant, size }), "gap-2", className)}
      >
        <BookMarked className="size-4" aria-hidden="true" />
        Borrow it
      </Link>
    )
  }

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        disabled={createBorrowingMutation.isPending}
        onClick={openBorrowDialog}
        className={className}
      >
        {createBorrowingMutation.isPending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <BookMarked className="size-4" aria-hidden="true" />
        )}
        {createBorrowingMutation.isPending ? "Borrowing..." : "Borrow it"}
      </Button>

      <Dialog
        open={dialogOpen}
        onOpenChange={(nextOpen) => {
          if (!nextOpen && createBorrowingMutation.isPending) {
            return
          }

          setDialogOpen(nextOpen)
        }}
      >
        <DialogContent
          className="w-[min(calc(100%-2rem),28rem)]"
          showCloseButton={!createBorrowingMutation.isPending}
        >
          <DialogHeader>
            <DialogTitle>Choose due date</DialogTitle>
            <DialogDescription>
              Select when you want to return "{book.title}".
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="rounded-lg border bg-muted/60 px-3 py-2">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <CalendarDays className="size-4 text-primary" />
                Due {format(selectedDueDate, "PPP")}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                The default borrowing period is 14 days.
              </p>
            </div>

            <div className="flex justify-center rounded-lg border bg-background p-2">
              <Calendar
                mode="single"
                selected={selectedDueDate}
                disabled={{ before: minimumDueDate }}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDueDate(date)
                  }
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={createBorrowingMutation.isPending}
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={createBorrowingMutation.isPending}
              onClick={handleBorrow}
            >
              {createBorrowingMutation.isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <BookMarked className="size-4" aria-hidden="true" />
              )}
              {createBorrowingMutation.isPending
                ? "Borrowing..."
                : "Confirm borrow"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function getDefaultDueDate() {
  return addDays(startOfDay(new Date()), 14)
}
