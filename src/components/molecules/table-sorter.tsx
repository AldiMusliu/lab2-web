import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"
import type { PropsWithChildren } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type TableSorterProps = PropsWithChildren<{
  enableSort: boolean
  isSorted?: false | "asc" | "desc"
  onSort?: () => void
}>

function TableSorter({
  children,
  enableSort,
  isSorted,
  onSort,
}: TableSorterProps) {
  if (!enableSort) {
    return children
  }

  const SortIcon =
    isSorted === "asc" ? ArrowUp : isSorted === "desc" ? ArrowDown : ChevronsUpDown

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-auto justify-start gap-1 px-0 py-0 text-left font-medium text-muted-foreground hover:bg-transparent hover:text-foreground"
      onClick={onSort}
    >
      <span>{children}</span>
      <SortIcon
        className={cn(
          "size-3.5",
          isSorted ? "text-primary" : "text-muted-foreground/70"
        )}
        aria-hidden="true"
      />
    </Button>
  )
}

export { TableSorter }
