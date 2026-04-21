import { createFileRoute } from "@tanstack/react-router"
import { AppShell } from "@/components/layouts/app-shell"
import { PlaceholderCard } from "@/components/shared/placeholder-card"

export const Route = createFileRoute("/books/")({
  component: BooksPage,
})

function BooksPage() {
  return (
    <AppShell title="Books" subtitle="Route-level page placeholder">
      <PlaceholderCard
        title="Books page"
        description="Use this route as the books module entry point."
      />
    </AppShell>
  )
}
