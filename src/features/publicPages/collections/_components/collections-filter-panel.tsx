import { ArrowUpDown, Filter, Search, SlidersHorizontal } from "lucide-react"

import { pageSizeOptions } from "./collections-types"
import type {
  AvailabilityFilter,
  PageSizeOption,
  SortMode,
} from "./collections-types"
import type { Category } from "@/features/categories/types"
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

type CollectionsFilterPanelProps = {
  searchTerm: string
  categoryFilter: string
  categories: Array<Category>
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

const availabilityOptions = [
  { label: "All access", value: "all" },
  { label: "Borrowable", value: "available" },
  { label: "Read online", value: "online" },
  { label: "Waitlist", value: "waitlist" },
] satisfies Array<{ label: string; value: AvailabilityFilter }>

const sortOptions = [
  { label: "Title A-Z", value: "title" },
  { label: "Author A-Z", value: "author" },
  { label: "Newest first", value: "newest" },
  { label: "Most copies", value: "copies" },
] satisfies Array<{ label: string; value: SortMode }>

const pageSizeSelectOptions = pageSizeOptions.map((option) => ({
  label: `${option} books`,
  value: String(option),
}))

export function CollectionsFilterPanel({
  searchTerm,
  categoryFilter,
  categories,
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
  const categoryOptions = [
    { label: "All categories", value: "all" },
    ...categories.map((category) => ({
      label: category.name,
      value: category.id,
    })),
  ]

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
              className="h-10 pl-9"
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
            <Select
              items={categoryOptions}
              value={categoryFilter}
              onValueChange={(value) => onCategoryChange(value ?? "all")}
            >
              <SelectTrigger
                id="catalogue-category"
                className="mt-2 h-10 w-full"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
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
              items={availabilityOptions}
              value={availabilityFilter}
              onValueChange={(value) => onAvailabilityChange(value ?? "all")}
            >
              <SelectTrigger
                id="catalogue-availability"
                className="mt-2 h-10 w-full"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availabilityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
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
              items={sortOptions}
              value={sortMode}
              onValueChange={(value) => onSortChange(value ?? "title")}
            >
              <SelectTrigger id="catalogue-sort" className="mt-2 h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
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
              items={pageSizeSelectOptions}
              value={String(pageSize)}
              onValueChange={(value) => {
                onPageSizeChange(Number(value ?? pageSize) as PageSizeOption)
              }}
            >
              <SelectTrigger
                id="catalogue-page-size"
                className="mt-2 h-10 w-full"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeSelectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
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
            "h-10 gap-2"
          )}
        >
          <SlidersHorizontal className="size-4" />
          Reset filters
        </button>
      </div>
    </div>
  )
}
