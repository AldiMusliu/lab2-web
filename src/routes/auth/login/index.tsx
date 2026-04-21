import { createFileRoute } from "@tanstack/react-router"
import { AppShell } from "@/components/layouts/app-shell"
import { PlaceholderCard } from "@/components/shared/placeholder-card"

export const Route = createFileRoute("/auth/login/")({
  component: LoginPage,
})

function LoginPage() {
  return (
    <AppShell title="Login" subtitle="Authentication route placeholder">
      <PlaceholderCard
        title="Login page"
        description="Use this route as the login entry point."
      />
    </AppShell>
  )
}
