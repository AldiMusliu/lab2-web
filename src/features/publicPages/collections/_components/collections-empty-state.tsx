import { BookCopy } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CollectionsEmptyState({
  onResetFilters,
}: {
  onResetFilters: () => void
}) {
  return (
    <div className="mt-8 rounded-lg border border-dashed border-border bg-secondary/45 p-8 text-center">
      <BookCopy className="mx-auto size-10 text-muted-foreground" />
      <h2 className="mt-4 text-xl font-semibold text-foreground">
        No books match those filters
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Try a broader search term, another category, or clear the filters to
        return to the full catalogue.
      </p>
      <button
        type="button"
        onClick={onResetFilters}
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "mt-5 h-11"
        )}
      >
        Clear filters
      </button>
    </div>
  )
}
