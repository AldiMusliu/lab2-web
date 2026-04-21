import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_protectedLayout")({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
