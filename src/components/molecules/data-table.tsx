import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useLocation } from "@tanstack/react-router"
import { Settings } from "lucide-react"
import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"

import { NoData } from "@/components/molecules/no-data"
import { Pagination } from "@/components/molecules/pagination"
import { TableSorter } from "@/components/molecules/table-sorter"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DataTableSettings,
  loadTableSettings,
} from "@/lib/data-table-settings"
import { cn } from "@/lib/utils"

export type DataTableActions<TData> = Record<
  string,
  (row: TData) => void | Promise<void>
>

type DataTableColumns<TData, TValue> =
  | Array<ColumnDef<TData, TValue>>
  | ((actions?: DataTableActions<TData>) => Array<ColumnDef<TData, TValue>>)

type DataTableProps<TData, TValue> = {
  actions?: DataTableActions<TData>
  className?: string
  columns: DataTableColumns<TData, TValue>
  data: Array<TData>
  enableSettings?: boolean
  initialPageSize?: number
  manualPagination?: boolean
  notFoundText?: React.ReactNode
  onClick?: (row: TData) => void
  onRowDoubleClick?: (row: TData) => void
  pageCount?: number
  pageSizeOptions?: Array<number>
  paginationEndPosition?: boolean
  tableId?: string
  totalItemCount?: number
}

function resolveColumns<TData, TValue>(
  columns: DataTableColumns<TData, TValue>,
  actions?: DataTableActions<TData>
) {
  return typeof columns === "function" ? columns(actions) : columns
}

function DataTable<TData, TValue>({
  actions,
  className,
  columns,
  data,
  enableSettings = true,
  initialPageSize = 10,
  manualPagination,
  notFoundText,
  onClick,
  onRowDoubleClick,
  pageCount,
  pageSizeOptions,
  paginationEndPosition,
  tableId,
  totalItemCount,
}: DataTableProps<TData, TValue>) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  })
  const resolvedTableId = tableId ?? pathname.replace(/\d+/g, "id")
  const tableColumns = React.useMemo(
    () => resolveColumns(columns, actions),
    [actions, columns]
  )
  const isManualPagination =
    manualPagination ?? (pageCount !== undefined || totalItemCount !== undefined)

  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([])
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>(
    {}
  )
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })

  const table = useReactTable({
    columns: tableColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: isManualPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    pageCount,
    state: {
      columnFilters,
      columnOrder,
      columnPinning,
      columnVisibility,
      pagination,
      sorting,
    },
  })

  React.useEffect(() => {
    const saved = loadTableSettings(resolvedTableId)
    const tableColumnIds = table.getAllLeafColumns().map((column) => column.id)

    if (!saved) {
      setColumnOrder(tableColumnIds)
      return
    }

    setColumnVisibility(saved.visibility)
    setColumnOrder(saved.order.length > 0 ? saved.order : tableColumnIds)
    setColumnPinning(saved.pinning)
  }, [resolvedTableId, table])

  const shouldShowPagination =
    totalItemCount !== undefined ||
    pageCount !== undefined ||
    table.getPrePaginationRowModel().rows.length > pagination.pageSize

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-lg border bg-card",
        !paginationEndPosition && "justify-between",
        className
      )}
    >
      <div className="p-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, headerGroupIndex) => (
              <TableRow key={headerGroup.id} className="border-none hover:bg-transparent">
                {headerGroup.headers.map((header, headerIndex) => {
                  const isFirst = headerGroupIndex === 0 && headerIndex === 0
                  const isLast =
                    headerGroupIndex === table.getHeaderGroups().length - 1 &&
                    headerIndex === headerGroup.headers.length - 1
                  const pinned = header.column.getIsPinned()

                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "relative z-10 bg-muted/70 px-3 py-3",
                        isFirst && "rounded-l-lg",
                        isLast && "rounded-r-lg",
                        pinned === "left" && "sticky left-0 shadow-[1px_0_0_0_var(--border)]",
                        pinned === "right" && "sticky right-0 shadow-[-1px_0_0_0_var(--border)]"
                      )}
                    >
                      {header.isPlaceholder ? null : (
                        <TableSorter
                          enableSort={header.column.getCanSort()}
                          isSorted={header.column.getIsSorted()}
                          onSort={() => header.column.toggleSorting()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </TableSorter>
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  onClick={() => onClick?.(row.original)}
                  onDoubleClick={() => onRowDoubleClick?.(row.original)}
                  className={cn(
                    "cursor-default",
                    (onRowDoubleClick || onClick) && "cursor-pointer"
                  )}
                >
                  {row.getVisibleCells().map((cell) => {
                    const pinned = cell.column.getIsPinned()

                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "relative z-0 bg-card px-3 py-3",
                          pinned === "left" &&
                            "sticky left-0 z-10 shadow-[1px_0_0_0_var(--border)]",
                          pinned === "right" &&
                            "sticky right-0 z-10 shadow-[-1px_0_0_0_var(--border)]"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-40 text-center"
                >
                  {notFoundText ?? <NoData />}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {shouldShowPagination || enableSettings ? (
        <div className="flex items-start gap-2 p-3 pt-0">
          {shouldShowPagination ? (
            <Pagination
              table={table}
              totalItemCount={totalItemCount}
              pageSizeOptions={pageSizeOptions}
            />
          ) : (
            <div className="flex-1" />
          )}

          {enableSettings ? (
            <Popover open={settingsOpen} onOpenChange={setSettingsOpen}>
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Table settings"
                    className="mt-4 shrink-0 text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="size-4" aria-hidden="true" />
                  </Button>
                }
              />
              <PopoverContent align="end" className="w-96">
                <DataTableSettings
                  table={table}
                  tableId={resolvedTableId}
                  onClose={() => setSettingsOpen(false)}
                />
              </PopoverContent>
            </Popover>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export { DataTable }
