import { createFileRoute } from "@tanstack/react-router"
import { AppShell } from "@/components/layouts/app-shell"
import { PlaceholderCard } from "@/components/shared/placeholder-card"

export const Route = createFileRoute("/borrowings/")({
  component: BorrowingsPage,
})

function BorrowingsPage() {
  return (
    <AppShell title="Borrowings" subtitle="Route-level page placeholder">
      <PlaceholderCard
        title="Borrowings page"
        description="Use this route as the borrowings module entry point."
      />
    </AppShell>
  )
}
