import { PublicOurMissionPage } from "@/features/publicPages/our-mission/public-our-mission-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_publicLayout/our-mission/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <PublicOurMissionPage />
}
