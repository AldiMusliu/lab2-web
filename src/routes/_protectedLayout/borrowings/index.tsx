import { createFileRoute } from "@tanstack/react-router"
import { AppLayout } from "@/components/layouts/app-layout"
import { PlaceholderCard } from "@/components/shared/placeholder-card"

export const Route = createFileRoute("/_protectedLayout/borrowings/")({
  component: BorrowingsPage,
})

function BorrowingsPage() {
  return (
    <AppLayout title="Borrowings" subtitle="Route-level page placeholder">
      <PlaceholderCard
        title="Borrowings page"
        description="Use this route as the borrowings module entry point."
      />
    </AppLayout>
  )
}
