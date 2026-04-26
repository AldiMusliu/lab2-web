import { ChevronLeft, ChevronRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CollectionsPaginationProps = {
  currentPage: number
  totalPages: number
  visiblePages: number[]
  filteredBooksCount: number
  pageSize: number
  paginatedBooksCount: number
  onPrevious: () => void
  onNext: () => void
  onPageSelect: (page: number) => void
}

export function CollectionsPagination({
  currentPage,
  totalPages,
  visiblePages,
  filteredBooksCount,
  pageSize,
  paginatedBooksCount,
  onPrevious,
  onNext,
  onPageSelect,
}: CollectionsPaginationProps) {
  return (
    <div className="mt-8 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {(currentPage - 1) * pageSize + (paginatedBooksCount ? 1 : 0)}
        {" - "}
        {Math.min(currentPage * pageSize, filteredBooksCount)} of{" "}
        {filteredBooksCount} titles
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentPage === 1}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-10 gap-2"
          )}
        >
          <ChevronLeft className="size-4" />
          Previous
        </button>

        {visiblePages.map((visiblePage, index) => {
          const shouldShowEllipsis =
            index > 0 && visiblePage - visiblePages[index - 1] > 1

          return (
            <span key={visiblePage} className="flex items-center gap-2">
              {shouldShowEllipsis ? (
                <span className="text-sm text-muted-foreground">...</span>
              ) : null}
              <button
                type="button"
                onClick={() => onPageSelect(visiblePage)}
                aria-current={visiblePage === currentPage ? "page" : undefined}
                className={cn(
                  buttonVariants({
                    variant: visiblePage === currentPage ? "default" : "ghost",
                    size: "icon-lg",
                  }),
                  "size-11"
                )}
              >
                {visiblePage}
              </button>
            </span>
          )
        })}

        <button
          type="button"
          onClick={onNext}
          disabled={currentPage === totalPages}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-10 gap-2"
          )}
        >
          Next
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
