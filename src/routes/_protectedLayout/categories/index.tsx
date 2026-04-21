import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protectedLayout/categories/")({
  component: CategoriesPage,
})

function CategoriesPage() {
  return <div>Categories</div>
}
