import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_authLayout")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid grid-cols-2">
      <div>Image</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
