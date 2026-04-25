import { Link } from "@tanstack/react-router"
import { motion, useReducedMotion } from "framer-motion"
import { LibraryBig } from "lucide-react"
import { publicHomeContent } from "@/features/publicPages/home/home-project-data"
import {
  createItemVariants,
  createSectionVariants,
  getCardHover,
} from "@/features/publicPages/home/home-motion"

export function PublicHomeHero() {
  const shouldReduceMotion = useReducedMotion()
  const prefersReducedMotion = Boolean(shouldReduceMotion)
  const sectionVariants = createSectionVariants(prefersReducedMotion)
  const itemVariants = createItemVariants(prefersReducedMotion)
  const cardHover = getCardHover(prefersReducedMotion)

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_10%_0%,rgba(2,132,199,0.2),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(34,197,94,0.16),transparent_36%),linear-gradient(180deg,var(--color-secondary),var(--color-background))]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            {publicHomeContent.hero.badge}
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {publicHomeContent.hero.title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {publicHomeContent.hero.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/#collection"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Explore collection
            </a>
            <Link
              to="/login"
              className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Login to continue
            </Link>
          </div>
        </motion.div>

        <motion.aside
          variants={itemVariants}
          className="rounded-[2rem] border border-border/70 bg-background/95 p-6 shadow-lg shadow-primary/10"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LibraryBig className="size-6" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-foreground">
                Library at a glance
              </p>
              <p className="text-sm text-muted-foreground">
                Live snapshot from your current project data
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {publicHomeContent.hero.metrics.map((metric) => (
              <motion.div
                key={metric.label}
                variants={itemVariants}
                whileHover={cardHover}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="rounded-2xl border border-border/70 bg-secondary p-4"
              >
                <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  {metric.label}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {metric.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.aside>
      </motion.div>
    </section>
  )
}
