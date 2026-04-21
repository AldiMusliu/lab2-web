import { createFileRoute } from "@tanstack/react-router"
import { AppLayout } from "@/components/layouts/app-layout"
import { PlaceholderCard } from "@/components/shared/placeholder-card"

export const Route = createFileRoute("/_protectedLayout/profile/")({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <AppLayout title="Profile" subtitle="Route-level page placeholder">
      <PlaceholderCard
        title="Profile page"
        description="Use this route as the profile module entry point."
      />
    </AppLayout>
  )
}
