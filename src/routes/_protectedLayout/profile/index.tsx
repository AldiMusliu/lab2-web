import { ProfilePage } from "@/features/profile/_components/profile-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protectedLayout/profile/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProfilePage />
}
