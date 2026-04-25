import BooksForm from "@/features/books/_components/books-form"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protectedLayout/books/$id/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return (
    <div>
      <BooksForm id={id} />
    </div>
  )
}
