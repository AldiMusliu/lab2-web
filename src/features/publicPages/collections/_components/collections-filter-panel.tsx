import { ArrowUpDown, Filter, Search, SlidersHorizontal } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { mockCategories } from "@/mocks"

import {
  pageSizeOptions,
  type AvailabilityFilter,
  type PageSizeOption,
  type SortMode,
} from "./collections-types"

type CollectionsFilterPanelProps = {
  searchTerm: string
  categoryFilter: string
  availabilityFilter: AvailabilityFilter
  sortMode: SortMode
  pageSize: PageSizeOption
  filteredBooksCount: number
  currentPage: number
  totalPages: number
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onAvailabilityChange: (value: AvailabilityFilter) => void
  onSortChange: (value: SortMode) => void
  onPageSizeChange: (value: PageSizeOption) => void
  onResetFilters: () => void
}

export function CollectionsFilterPanel({
  searchTerm,
  categoryFilter,
  availabilityFilter,
  sortMode,
  pageSize,
  filteredBooksCount,
  currentPage,
  totalPages,
  onSearchChange,
  onCategoryChange,
  onAvailabilityChange,
  onSortChange,
  onPageSizeChange,
  onResetFilters,
}: CollectionsFilterPanelProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="min-w-0 flex-1">
          <label
            htmlFor="catalogue-search"
            className="text-sm font-medium text-foreground"
          >
            Search books
          </label>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="catalogue-search"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search title, author, topic..."
              className="h-11 pl-9"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label
              htmlFor="catalogue-category"
              className="text-sm font-medium text-foreground"
            >
              Category
            </label>
            <Select value={categoryFilter} onValueChange={onCategoryChange}>
              <SelectTrigger
                id="catalogue-category"
                className="mt-2 h-11 w-full"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {mockCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label
              htmlFor="catalogue-availability"
              className="text-sm font-medium text-foreground"
            >
              Availability
            </label>
            <Select
              value={availabilityFilter}
              onValueChange={(value) =>
                onAvailabilityChange(value as AvailabilityFilter)
              }
            >
              <SelectTrigger
                id="catalogue-availability"
                className="mt-2 h-11 w-full"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All access</SelectItem>
                <SelectItem value="available">Borrowable</SelectItem>
                <SelectItem value="online">Read online</SelectItem>
                <SelectItem value="waitlist">Waitlist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label
              htmlFor="catalogue-sort"
              className="text-sm font-medium text-foreground"
            >
              Sort
            </label>
            <Select
              value={sortMode}
              onValueChange={(value) => onSortChange(value as SortMode)}
            >
              <SelectTrigger id="catalogue-sort" className="mt-2 h-11 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="author">Author A-Z</SelectItem>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="copies">Most copies</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label
              htmlFor="catalogue-page-size"
              className="text-sm font-medium text-foreground"
            >
              Per page
            </label>
            <Select
              value={String(pageSize)}
              onValueChange={(value) =>
                onPageSizeChange(Number(value) as PageSizeOption)
              }
            >
              <SelectTrigger
                id="catalogue-page-size"
                className="mt-2 h-11 w-full"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option} books
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Filter className="size-4" />
            {filteredBooksCount} matching titles
          </span>
          <span className="hidden sm:inline">/</span>
          <span className="inline-flex items-center gap-2">
            <ArrowUpDown className="size-4" />
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className={cn(
            buttonVariants({ variant: "ghost", size: "lg" }),
            "h-11 gap-2"
          )}
        >
          <SlidersHorizontal className="size-4" />
          Reset filters
        </button>
      </div>
    </div>
  )
}
