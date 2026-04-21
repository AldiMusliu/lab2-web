import { AppLayout } from "@/components/layouts/app-layout"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppLayout>
      <div>Public Page to see the books etc </div>
      <Outlet />
    </AppLayout>
  )
}
