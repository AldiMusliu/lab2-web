import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protectedLayout/books/")({
  component: BooksPage,
})

function BooksPage() {
  return <div>Books Page</div>
}
