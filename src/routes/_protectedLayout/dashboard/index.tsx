import { createFileRoute } from "@tanstack/react-router"

import { DashboardPage } from "@/features/dashboard/_components/dashboard-page"

export const Route = createFileRoute("/_protectedLayout/dashboard/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardPage />
}
