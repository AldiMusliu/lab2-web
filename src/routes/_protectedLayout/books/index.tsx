import { BooksPage } from "@/features/books/_components/books-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protectedLayout/books/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <BooksPage />
}
