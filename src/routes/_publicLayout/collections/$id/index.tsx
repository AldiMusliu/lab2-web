import { createFileRoute } from "@tanstack/react-router"

import { PublicCollectionDetailPage } from "@/features/publicPages/collections/public-collection-detail-page"

export const Route = createFileRoute("/_publicLayout/collections/$id/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return <PublicCollectionDetailPage bookId={id} />
}
