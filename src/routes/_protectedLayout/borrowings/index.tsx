import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protectedLayout/borrowings/")({
  component: BorrowingsPage,
})

function BorrowingsPage() {
  return <div>Borrowings</div>
}
