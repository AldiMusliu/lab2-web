import { PublicCollectionsPage } from "@/features/publicPages/collections/public-collections-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_publicLayout/collections/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <PublicCollectionsPage />
}
