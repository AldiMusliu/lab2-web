import { AppLayout } from "@/components/layouts/app-layout"
import { protectedNavigationItems } from "@/components/layouts/protected-navigation"
import { getStoredAccessToken, useSessionStore } from "@/stores/session.store"
import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from "@tanstack/react-router"
import { useEffect } from "react"

export const Route = createFileRoute("/_protectedLayout")({
  beforeLoad: () => {
    const hasSession =
      useSessionStore.getState().isAuthenticated ||
      Boolean(getStoredAccessToken())

    if (hasSession || typeof window === "undefined") {
      return
    }

    if (!hasSession) {
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
  const navigate = useNavigate()
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated)
  const hasStoredToken = Boolean(getStoredAccessToken())

  useEffect(() => {
    if (!isAuthenticated && !hasStoredToken) {
      void navigate({ to: "/login" })
    }
  }, [hasStoredToken, isAuthenticated, navigate])

  if (!isAuthenticated && !hasStoredToken) {
    return null
  }

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
