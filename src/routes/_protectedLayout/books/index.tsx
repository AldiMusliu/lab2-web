import { createFileRoute } from "@tanstack/react-router"
import { AppLayout } from "@/components/layouts/app-layout"
import { PlaceholderCard } from "@/components/shared/placeholder-card"

export const Route = createFileRoute("/_protectedLayout/books/")({
  component: BooksPage,
})

function BooksPage() {
  return (
    <AppLayout title="Books" subtitle="Route-level page placeholder">
      <PlaceholderCard
        title="Books page"
        description="Use this route as the books module entry point."
      />
    </AppLayout>
  )
}
