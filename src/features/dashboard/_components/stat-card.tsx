import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type StatCardTone = "primary" | "sky" | "emerald" | "amber" | "rose" | "slate"

type StatCardProps = {
  description: string
  icon: LucideIcon
  label: string
  tone?: StatCardTone
  value: number
}

const numberFormatter = new Intl.NumberFormat("en-US")

const toneClassNames = {
  primary: "bg-primary/10 text-primary",
  sky: "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
  emerald:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
  slate: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
} satisfies Record<StatCardTone, string>

function formatCount(value: number) {
  return numberFormatter.format(value)
}

export function StatCard({
  description,
  icon: Icon,
  label,
  tone = "primary",
  value,
}: StatCardProps) {
  return (
    <article className="rounded-lg border bg-card p-4 text-card-foreground">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">
            {formatCount(value)}
          </p>
        </div>
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            toneClassNames[tone]
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </article>
  )
}

export default StatCard
