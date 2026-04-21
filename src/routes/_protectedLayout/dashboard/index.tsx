import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protectedLayout/dashboard/")({
  component: DashboardPage,
})

function DashboardPage() {
  return <div>Dashboard</div>
}
