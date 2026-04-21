import { createFileRoute } from "@tanstack/react-router"
import { AppLayout } from "@/components/layouts/app-layout"
import { PlaceholderCard } from "@/components/shared/placeholder-card"

export const Route = createFileRoute("/_protectedLayout/categories/")({
  component: CategoriesPage,
})

function CategoriesPage() {
  return (
    <AppLayout title="Categories" subtitle="Route-level page placeholder">
      <PlaceholderCard
        title="Categories page"
        description="Use this route as the categories module entry point."
      />
    </AppLayout>
  )
}
