import { createFileRoute } from "@tanstack/react-router"
import { AppShell } from "@/components/layouts/app-shell"
import { PlaceholderCard } from "@/components/shared/placeholder-card"

export const Route = createFileRoute("/auth/register/")({
  component: RegisterPage,
})

function RegisterPage() {
  return (
    <AppShell title="Register" subtitle="Authentication route placeholder">
      <PlaceholderCard
        title="Register page"
        description="Use this route as the register entry point."
      />
    </AppShell>
  )
}
