import * as React from "react"
import { Columns3, Pin, PinOff, RefreshCcw } from "lucide-react"
import type { Column, Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

type ColumnPinningPreference = {
  left: Array<string>
  right: Array<string>
}

export type TableSettings = {
  order: Array<string>
  pinning: ColumnPinningPreference
  tableId: string
  visibility: Record<string, boolean>
}

const STORAGE_KEY = "datatable-preferences"

function getColumnLabel<TData>(column: Column<TData, unknown>) {
  const header = column.columnDef.header

  if (typeof header === "string") {
    return header
  }

  return column.id
}

function readSettings(): Array<TableSettings> {
  if (typeof window === "undefined") {
    return []
  }

  try {
    const data = window.localStorage.getItem(STORAGE_KEY)
    return data ? (JSON.parse(data) as Array<TableSettings>) : []
  } catch {
    return []
  }
}

export function saveTableSettings(newSetting: TableSettings) {
  if (typeof window === "undefined") {
    return
  }

  const existingSettings = readSettings()
  const index = existingSettings.findIndex(
    (setting) => setting.tableId === newSetting.tableId
  )

  if (index >= 0) {
    existingSettings[index] = newSetting
  } else {
    existingSettings.push(newSetting)
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existingSettings))
}

export function loadTableSettings(tableId: string) {
  return readSettings().find((setting) => setting.tableId === tableId)
}

type DataTableSettingsProps<TData> = {
  onClose?: () => void
  table: Table<TData>
  tableId: string
}

function DataTableSettings<TData>({
  onClose,
  table,
  tableId,
}: DataTableSettingsProps<TData>) {
  const allColumns = React.useMemo(() => table.getAllLeafColumns(), [table])
  const [visibility, setVisibility] = React.useState<Record<string, boolean>>(
    {}
  )
  const [pinning, setPinning] = React.useState<ColumnPinningPreference>({
    left: [],
    right: [],
  })

  React.useEffect(() => {
    const saved = loadTableSettings(tableId)

    setVisibility(
      saved?.visibility ??
        Object.fromEntries(
          allColumns.map((column) => [column.id, column.getIsVisible()])
        )
    )
    setPinning(saved?.pinning ?? { left: [], right: [] })
  }, [allColumns, tableId])

  const handleToggleVisibility = (columnId: string) => {
    setVisibility((current) => ({
      ...current,
      [columnId]: !current[columnId],
    }))
  }

  const handlePinChange = (
    columnId: string,
    direction: "left" | "right" | "none"
  ) => {
    setPinning((current) => {
      const next = {
        left: current.left.filter((id) => id !== columnId),
        right: current.right.filter((id) => id !== columnId),
      }

      if (direction !== "none") {
        next[direction] = [columnId]
      }

      return next
    })
  }

  const handleReset = () => {
    setVisibility(
      Object.fromEntries(allColumns.map((column) => [column.id, true]))
    )
    setPinning({ left: [], right: [] })
  }

  const handleSave = () => {
    for (const column of allColumns) {
      column.toggleVisibility(visibility[column.id] ?? true)
      column.pin(
        pinning.left.includes(column.id)
          ? "left"
          : pinning.right.includes(column.id)
            ? "right"
            : false
      )
    }

    saveTableSettings({
      order: allColumns.map((column) => column.id),
      pinning,
      tableId,
      visibility,
    })
    onClose?.()
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="flex items-center gap-2 text-sm font-medium">
            <Columns3 className="size-4" aria-hidden="true" />
            Table settings
          </p>
          <p className="text-xs text-muted-foreground">
            Choose visible columns and pin one column to either side.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1"
          onClick={handleReset}
        >
          <RefreshCcw className="size-3.5" aria-hidden="true" />
          Reset
        </Button>
      </div>

      <div className="max-h-72 space-y-2 overflow-auto pr-1">
        {allColumns.map((column) => {
          const isPinnedLeft = pinning.left.includes(column.id)
          const isPinnedRight = pinning.right.includes(column.id)

          return (
            <div
              key={column.id}
              className="flex items-center justify-between gap-3 rounded-lg border bg-background p-2"
            >
              <label className="flex min-w-0 items-center gap-2 text-sm">
                <Checkbox
                  checked={visibility[column.id] ?? true}
                  disabled={!column.getCanHide()}
                  onCheckedChange={() => handleToggleVisibility(column.id)}
                />
                <span className="truncate">{getColumnLabel(column)}</span>
              </label>

              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant={isPinnedLeft ? "default" : "ghost"}
                  size="xs"
                  className={cn("gap-1", isPinnedLeft && "text-primary-foreground")}
                  onClick={() =>
                    handlePinChange(column.id, isPinnedLeft ? "none" : "left")
                  }
                >
                  {isPinnedLeft ? (
                    <PinOff className="size-3.5" aria-hidden="true" />
                  ) : (
                    <Pin className="size-3.5" aria-hidden="true" />
                  )}
                  L
                </Button>
                <Button
                  type="button"
                  variant={isPinnedRight ? "default" : "ghost"}
                  size="xs"
                  className={cn(
                    "gap-1",
                    isPinnedRight && "text-primary-foreground"
                  )}
                  onClick={() =>
                    handlePinChange(column.id, isPinnedRight ? "none" : "right")
                  }
                >
                  {isPinnedRight ? (
                    <PinOff className="size-3.5" aria-hidden="true" />
                  ) : (
                    <Pin className="size-3.5" aria-hidden="true" />
                  )}
                  R
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  )
}

export { DataTableSettings }
