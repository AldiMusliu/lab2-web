import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type ControlledFieldShellProps = {
  children: ReactNode
  className?: string
  description?: ReactNode
  descriptionClassName?: string
  descriptionId?: string
  error?: string
  errorClassName?: string
  errorId?: string
  htmlFor?: string
  label?: ReactNode
  labelClassName?: string
  layout?: "inline" | "stack"
}

function ControlledFieldShell({
  children,
  className,
  description,
  descriptionClassName,
  descriptionId,
  error,
  errorClassName,
  errorId,
  htmlFor,
  label,
  labelClassName,
  layout = "stack",
}: ControlledFieldShellProps) {
  const labelNode = label ? (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-xs leading-none font-medium group-has-disabled/field:cursor-not-allowed group-has-disabled/field:opacity-70",
        labelClassName
      )}
    >
      {label}
    </label>
  ) : null

  const descriptionNode = description ? (
    <p
      id={descriptionId}
      className={cn("text-xs text-muted-foreground", descriptionClassName)}
    >
      {description}
    </p>
  ) : null

  const errorNode = error ? (
    <p id={errorId} className={cn("text-xs text-destructive", errorClassName)}>
      {error}
    </p>
  ) : null

  if (layout === "inline") {
    return (
      <div className={cn("group/field flex items-start gap-3", className)}>
        <div className="pt-0.5">{children}</div>
        <div className="grid gap-1.5">
          {labelNode}
          {descriptionNode}
          {errorNode}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("group/field grid gap-2", className)}>
      {labelNode}
      {children}
      {descriptionNode}
      {errorNode}
    </div>
  )
}

function getFieldDescribedBy(...ids: Array<string | false | null | undefined>) {
  const describedBy = ids.filter(Boolean).join(" ")
  return describedBy.length > 0 ? describedBy : undefined
}

export { ControlledFieldShell, getFieldDescribedBy }
