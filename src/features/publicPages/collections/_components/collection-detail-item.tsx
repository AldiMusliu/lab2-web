import type { LucideIcon } from "lucide-react"

export function CollectionDetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4" />
        {label}
      </div>
      <p className="mt-2 text-sm leading-6 font-semibold text-foreground">
        {value}
      </p>
    </div>
  )
}
