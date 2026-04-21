import { createFileRoute } from "@tanstack/react-router"
import { AppLayout } from "@/components/layouts/app-layout"
import { PlaceholderCard } from "@/components/shared/placeholder-card"

export const Route = createFileRoute("/_protectedLayout/dashboard/")({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <AppLayout title="Dashboard" subtitle="Route-level page placeholder">
      <PlaceholderCard
        title="Dashboard page"
        description="Use this route as the dashboard module entry point."
      />
    </AppLayout>
  )
}
