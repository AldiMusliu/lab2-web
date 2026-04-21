import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authLayout/login")({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div>LoginPage to </div>
  )
}
