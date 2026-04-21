import { useSessionStore } from "@/stores/session.store"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_protectedLayout")({
  beforeLoad: () => {
    if (!useSessionStore.getState().isAuthenticated) {
      throw redirect({ to: "/login" })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
