import { HomeCard } from "@/features/publicPages/home/_components/card"
import {
  publicHomeContent,
  type PublicHomeServiceCard,
} from "@/features/publicPages/home/home-project-data"
import {
  createItemVariants,
  createSectionVariants,
  getCardHover,
} from "@/features/publicPages/home/home-motion"
import { motion, useReducedMotion } from "framer-motion"
import {
  Blocks,
  Clock3,
  ShieldCheck,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react"

const serviceIcons: Record<PublicHomeServiceCard["id"], LucideIcon> = {
  auth: UserRound,
  catalog: Blocks,
  borrowings: Clock3,
  architecture: ShieldCheck,
}

export function PublicHomeServices() {
  const shouldReduceMotion = useReducedMotion()
  const prefersReducedMotion = Boolean(shouldReduceMotion)
  const sectionVariants = createSectionVariants(prefersReducedMotion)
  const itemVariants = createItemVariants(prefersReducedMotion)
  const cardHover = getCardHover(prefersReducedMotion)

  return (
    <motion.section
      id="services"
      className="border-y border-border/50 bg-secondary/45"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            {publicHomeContent.services.badge}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {publicHomeContent.services.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {publicHomeContent.services.description}
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {publicHomeContent.services.cards.map((card) => {
            const Icon = serviceIcons[card.id]

            return (
              <motion.div key={card.title} variants={itemVariants}>
                <HomeCard
                  icon={Icon}
                  title={card.title}
                  description={card.description}
                  meta={`${card.meta} - ${card.audience}`}
                  variant="soft"
                  hoverEffect={cardHover}
                />
              </motion.div>
            )
          })}
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-primary uppercase"
        >
          <Sparkles className="size-3.5" />
          Built from your Smart Library project scope
        </motion.div>
      </div>
    </motion.section>
  )
}
