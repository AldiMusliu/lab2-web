import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type StatCardTone = "primary" | "sky" | "emerald" | "amber" | "rose" | "slate"

type StatusRowProps = {
  icon: LucideIcon
  label: string
  tone?: StatCardTone
  value: number
}

const toneClassNames = {
  primary: "bg-primary/10 text-primary",
  sky: "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
  emerald:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
  slate: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
} satisfies Record<StatCardTone, string>

export function StatusRow({
  icon: Icon,
  label,
  tone = "primary",
  value,
}: StatusRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-t py-3 first:border-t-0 first:pt-0 last:pb-0">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            toneClassNames[tone]
          )}
        >
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <span className="font-semibold text-foreground">
        {new Intl.NumberFormat("en-US").format(value)}
      </span>
    </div>
  )
}

export default StatusRow
