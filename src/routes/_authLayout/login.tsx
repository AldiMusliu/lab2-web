import { LoginPage } from "@/features/authentication/_components/login-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authLayout/login")({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginPage />
}
