import { Link } from "@tanstack/react-router"
import { motion, useReducedMotion } from "framer-motion"
import { publicHomeContent } from "@/features/publicPages/home/home-project-data"
import {
  createItemVariants,
  createSectionVariants,
} from "@/features/publicPages/home/home-motion"

export function PublicHomeCta() {
  const shouldReduceMotion = useReducedMotion()
  const prefersReducedMotion = Boolean(shouldReduceMotion)
  const sectionVariants = createSectionVariants(prefersReducedMotion)
  const itemVariants = createItemVariants(prefersReducedMotion)

  return (
    <motion.section
      className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <motion.div
        variants={itemVariants}
        className="rounded-[2rem] border border-border/70 bg-card px-6 py-8 shadow-[0_16px_36px_-26px_color-mix(in_oklab,var(--color-primary),transparent_70%)] sm:px-8 sm:py-10"
      >
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          {publicHomeContent.cta.badge}
        </p>
        <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {publicHomeContent.cta.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {publicHomeContent.cta.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/login"
            className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {publicHomeContent.cta.primaryLabel}
          </Link>
          <Link
            to="/register"
            className="inline-flex rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {publicHomeContent.cta.secondaryLabel}
          </Link>
        </div>
      </motion.div>
    </motion.section>
  )
}
