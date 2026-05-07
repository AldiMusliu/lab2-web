import { UsersPage } from "@/features/users/_components/users-page"
import { useSessionStore } from "@/stores/session.store"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_protectedLayout/users/")({
  beforeLoad: () => {
    const role = useSessionStore.getState().role

    if (role !== "admin") {
      throw redirect({ to: "/dashboard" })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <UsersPage />
}
