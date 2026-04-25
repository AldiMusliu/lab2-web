import { PublicServicesPage } from "@/features/publicPages/services/public-services-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_publicLayout/services/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <PublicServicesPage />
}
