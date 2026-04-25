import { createFileRoute } from "@tanstack/react-router"
import BooksForm from "@/features/books/_components/books-form"

export const Route = createFileRoute("/_protectedLayout/books/add/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <BooksForm />
}
