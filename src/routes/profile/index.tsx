import { createFileRoute } from "@tanstack/react-router"
import { AppShell } from "@/components/layouts/app-shell"
import { PlaceholderCard } from "@/components/shared/placeholder-card"

export const Route = createFileRoute("/profile/")({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <AppShell title="Profile" subtitle="Route-level page placeholder">
      <PlaceholderCard
        title="Profile page"
        description="Use this route as the profile module entry point."
      />
    </AppShell>
  )
}
