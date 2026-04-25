import BooksForm from "@/features/books/_components/books-form"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protectedLayout/books/add/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <BooksForm />
    </div>
  )
}
