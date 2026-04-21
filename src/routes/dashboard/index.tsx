import { createFileRoute } from "@tanstack/react-router"
import { AppShell } from "@/components/layouts/app-shell"
import { PlaceholderCard } from "@/components/shared/placeholder-card"

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <AppShell title="Dashboard" subtitle="Route-level page placeholder">
      <PlaceholderCard
        title="Dashboard page"
        description="Use this route as the dashboard module entry point."
      />
    </AppShell>
  )
}
