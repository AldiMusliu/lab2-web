import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_publicLayout/our-mission/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_publicLayout/our-mission/"!</div>
}
