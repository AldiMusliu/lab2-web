import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_publicLayout/services/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(publicPages)/services/"!</div>
}
