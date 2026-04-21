import { AppLayout } from "@/components/layouts/app-layout"
import { protectedNavigationItems } from "@/components/layouts/protected-navigation"
import { useSessionStore } from "@/stores/session.store"
import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
} from "@tanstack/react-router"

export const Route = createFileRoute("/_protectedLayout")({
  beforeLoad: () => {
    if (!useSessionStore.getState().isAuthenticated) {
      throw redirect({ to: "/login" })
    }
  },
  component: RouteComponent,
})

const subtitleByTitle = Object.fromEntries(
  protectedNavigationItems.map((item) => [item.label, item.description])
) as Record<string, string>

function RouteComponent() {
  const location = useLocation()

  const activeNavigationItem = protectedNavigationItems.find(
    (item) =>
      location.pathname === item.to ||
      location.pathname.startsWith(`${item.to}/`)
  )

  const title = activeNavigationItem?.label ?? "Dashboard"
  const subtitle = subtitleByTitle[title] ?? "Overview and recent activity"

  return (
    <AppLayout title={title} subtitle={subtitle}>
      <Outlet />
    </AppLayout>
  )
}
