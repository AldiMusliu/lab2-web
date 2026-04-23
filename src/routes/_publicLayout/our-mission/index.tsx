import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_publicLayout/our-mission/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Our Missions</div>
}
