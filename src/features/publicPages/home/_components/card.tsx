import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

type HomeCardVariant = "surface" | "soft"

type HomeCardProps = {
  icon: LucideIcon
  title: string
  description: string
  meta?: string
  details?: string[]
  variant?: HomeCardVariant
  className?: string
  hoverEffect?: {
    y: number
    scale: number
  }
}

const variantClasses: Record<HomeCardVariant, string> = {
  surface:
    "border-border/70 bg-card shadow-[0_10px_26px_-20px_color-mix(in_oklab,var(--color-primary),transparent_74%)]",
  soft: "border-border/70 bg-secondary/70 shadow-[0_10px_26px_-20px_color-mix(in_oklab,var(--color-primary),transparent_74%)]",
}

export function HomeCard({
  icon: Icon,
  title,
  description,
  meta,
  details,
  variant = "surface",
  className,
  hoverEffect,
}: HomeCardProps) {
  return (
    <motion.article
      whileHover={hoverEffect}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl border p-5",
        variantClasses[variant],
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(2,132,199,0.16),transparent_52%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>

        <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {meta ? (
          <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-primary uppercase">
            {meta}
          </p>
        ) : null}

        {details && details.length > 0 ? (
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {details.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 size-1.5 rounded-full bg-primary/60" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </motion.article>
  )
}
