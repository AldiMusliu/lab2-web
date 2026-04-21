import { createFileRoute } from "@tanstack/react-router"
import { AppLayout } from "@/components/layouts/app-layout"
import { PlaceholderCard } from "@/components/shared/placeholder-card"

export const Route = createFileRoute("/_authLayout/")({
  component: LoginPage,
})

function LoginPage() {
  return (
    <AppLayout title="Login" subtitle="Authentication route placeholder">
      <PlaceholderCard
        title="Login page"
        description="Use this route as the login entry point."
      />
    </AppLayout>
  )
}
