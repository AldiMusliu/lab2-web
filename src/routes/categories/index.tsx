import { createFileRoute } from "@tanstack/react-router"
import { AppShell } from "@/components/layouts/app-shell"
import { PlaceholderCard } from "@/components/shared/placeholder-card"

export const Route = createFileRoute("/categories/")({
  component: CategoriesPage,
})

function CategoriesPage() {
  return (
    <AppShell title="Categories" subtitle="Route-level page placeholder">
      <PlaceholderCard
        title="Categories page"
        description="Use this route as the categories module entry point."
      />
    </AppShell>
  )
}
