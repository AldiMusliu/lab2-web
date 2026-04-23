import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_publicLayout/collections/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_publicLayout/collections/"!</div>
}
