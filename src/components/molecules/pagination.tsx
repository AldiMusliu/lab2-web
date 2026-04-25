import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import type { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type PaginationProps<TData> = {
  pageSizeOptions?: Array<number>
  table: Table<TData>
  totalItemCount?: number
}

function getVisiblePages(page: number, totalPages: number) {
  const pages = new Set([1, totalPages, page - 1, page, page + 1])

  return Array.from(pages)
    .filter((item) => item >= 1 && item <= totalPages)
    .sort((a, b) => a - b)
}

function Pagination<TData>({
  pageSizeOptions = [10, 20, 50],
  table,
  totalItemCount,
}: PaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const currentPage = pageIndex + 1
  const totalPages = Math.max(table.getPageCount(), 1)
  const visiblePages = getVisiblePages(currentPage, totalPages)
  const visibleRowCount = table.getRowModel().rows.length

  return (
    <div className="flex w-full flex-col gap-3 border-t px-1 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-1">
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft className="size-4" aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Button>

        {visiblePages.map((page, index) => {
          const previous = visiblePages[index - 1]
          const showEllipsis = previous && page - previous > 1

          return (
            <span key={page} className="flex items-center gap-1">
              {showEllipsis ? (
                <span className="px-1 text-sm text-muted-foreground">...</span>
              ) : null}
              <Button
                type="button"
                variant={page === currentPage ? "default" : "ghost"}
                size="icon-sm"
                className={cn(page === currentPage && "text-primary-foreground")}
                onClick={() => table.setPageIndex(page - 1)}
                disabled={page === currentPage}
              >
                {page}
              </Button>
            </span>
          )
        })}

        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          onClick={() => table.setPageIndex(totalPages - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <Select
          value={String(pageSize)}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="h-8 w-[76px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p>
          Showing {visibleRowCount} of {totalItemCount ?? table.getPrePaginationRowModel().rows.length} records
        </p>
      </div>
    </div>
  )
}

export { Pagination }
