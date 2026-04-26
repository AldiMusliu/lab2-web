import { RegisterPage } from "@/features/authentication/_components/register-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authLayout/register")({
  component: RouteComponent,
})

function RouteComponent() {
  return <RegisterPage />
}
