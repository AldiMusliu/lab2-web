import {
  missionHero,
  missionImpact,
  missionPillars,
  missionPillarsSection,
  missionRoadmap,
  missionStatement,
  type MissionPillarIcon,
} from "@/mocks/mockup-data/public-pages/our-mission"
import {
  createItemVariants,
  createSectionVariants,
  getCardHover,
} from "@/features/publicPages/home/home-motion"
import { motion, useReducedMotion } from "framer-motion"
import {
  BookHeart,
  Lightbulb,
  Rocket,
  School,
  Sprout,
  type LucideIcon,
} from "lucide-react"

const pillarIcons: Record<MissionPillarIcon, LucideIcon> = {
  "book-heart": BookHeart,
  school: School,
  lightbulb: Lightbulb,
}

export function PublicOurMissionPage() {
  const shouldReduceMotion = useReducedMotion()
  const prefersReducedMotion = Boolean(shouldReduceMotion)
  const sectionVariants = createSectionVariants(prefersReducedMotion)
  const itemVariants = createItemVariants(prefersReducedMotion)
  const cardHover = getCardHover(prefersReducedMotion)

  return (
    <div className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_14%_2%,rgba(16,185,129,0.18),transparent_38%),radial-gradient(circle_at_86%_0%,rgba(56,189,248,0.16),transparent_30%)]" />

      <motion.section
        className="relative border-b border-border/60"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
              {missionHero.badge}
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {missionHero.title}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {missionHero.description}
              </p>
            </div>
          </motion.div>

          <motion.aside
            variants={itemVariants}
            className="rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-lg shadow-primary/5"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Sprout className="size-5" />
              </span>
              <div>
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  {missionImpact.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {missionImpact.description}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {missionImpact.metrics.map((metric) => (
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
                  <p className="mt-2 text-xl font-semibold text-foreground">
                    {metric.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.aside>
        </div>
      </motion.section>

      <motion.section
        className="border-b border-border/60 bg-secondary/60"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {missionPillarsSection.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {missionPillarsSection.description}
            </p>
          </motion.div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {missionPillars.map((pillar) => {
              const Icon = pillarIcons[pillar.icon]
              return (
                <motion.article
                  key={pillar.title}
                  variants={itemVariants}
                  whileHover={cardHover}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="h-full rounded-3xl border border-border/70 bg-card p-6 shadow-sm"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-16">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-primary uppercase">
              <Rocket className="size-3.5" />
              {missionRoadmap.badge}
            </div>

            <ol className="mt-6 space-y-4">
              {missionRoadmap.items.map((item) => (
                <motion.li
                  key={item.phase}
                  variants={itemVariants}
                  whileHover={cardHover}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="rounded-2xl border border-border/70 bg-card p-5"
                >
                  <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                    {item.phase}
                  </p>
                  <p className="mt-1 text-base font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          <motion.aside
            variants={itemVariants}
            whileHover={cardHover}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex h-full flex-col justify-between rounded-[2rem] border border-border/70 bg-primary/95 p-7 text-primary-foreground"
          >
            <div>
              <p className="text-sm font-semibold tracking-[0.14em] text-primary-foreground/75 uppercase">
                {missionStatement.title}
              </p>
              <p className="mt-4 text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">
                "{missionStatement.quote}"
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/85">
                {missionStatement.description}
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-4">
              <p className="text-xs font-semibold tracking-[0.14em] text-primary-foreground/75 uppercase">
                {missionStatement.focusTitle}
              </p>
              <p className="mt-2 text-sm font-medium text-primary-foreground">
                {missionStatement.focusDescription}
              </p>
            </div>
          </motion.aside>
        </div>
      </motion.section>
    </div>
  )
}
