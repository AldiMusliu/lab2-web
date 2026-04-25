import { Inbox } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type NoDataProps = {
  className?: string
  description?: ReactNode
  title?: ReactNode
}

function NoData({
  className,
  description = "Try changing filters or adding a new record.",
  title = "No data found",
}: NoDataProps) {
  return (
    <div
      className={cn(
        "flex min-h-32 flex-col items-center justify-center gap-2 text-center",
        className
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Inbox className="size-5" aria-hidden="true" />
      </div>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  )
}

export { NoData }
