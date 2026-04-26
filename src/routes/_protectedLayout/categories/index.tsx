import { CategoriesPage } from "@/features/categories/_components/categories-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protectedLayout/categories/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <CategoriesPage />
}
