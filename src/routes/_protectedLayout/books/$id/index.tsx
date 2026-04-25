import { createFileRoute } from "@tanstack/react-router"
import BooksForm from "@/features/books/_components/books-form"

export const Route = createFileRoute("/_protectedLayout/books/$id/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return <BooksForm id={id} />
}
