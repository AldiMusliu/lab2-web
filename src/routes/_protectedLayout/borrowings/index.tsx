import { BorrowingsPage } from "@/features/borrowings/_components/borrowings-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protectedLayout/borrowings/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <BorrowingsPage />
}
