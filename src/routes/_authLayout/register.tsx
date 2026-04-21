import { createFileRoute } from "@tanstack/react-router"
import { AppLayout } from "@/components/layouts/app-layout"
import { PlaceholderCard } from "@/components/shared/placeholder-card"

export const Route = createFileRoute("/_authLayout/register")({
  component: RegisterPage,
})

function RegisterPage() {
  return (
    <AppLayout title="Register" subtitle="Authentication route placeholder">
      <PlaceholderCard
        title="Register page"
        description="Use this route as the register entry point."
      />
    </AppLayout>
  )
}
