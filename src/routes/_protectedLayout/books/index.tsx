import { DataTable } from "@/components/molecules/data-table"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protectedLayout/books/")({
  component: BooksPage,
})

function BooksPage() {
  return (
    <div>
      <DataTable />
    </div>
  )
}
