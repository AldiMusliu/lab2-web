import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_publicLayout/about-us/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(publicPages)/about-us/"!</div>
}
