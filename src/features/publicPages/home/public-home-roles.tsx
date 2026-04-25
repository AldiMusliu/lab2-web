import { HomeCard } from "@/features/publicPages/home/_components/card"
import {
  publicHomeContent,
  type PublicHomeRoleCard,
} from "@/features/publicPages/home/home-project-data"
import {
  createItemVariants,
  createSectionVariants,
  getCardHover,
} from "@/features/publicPages/home/home-motion"
import { motion, useReducedMotion } from "framer-motion"
import { ShieldCheck, UserRound, type LucideIcon } from "lucide-react"

const roleIcons: Record<PublicHomeRoleCard["id"], LucideIcon> = {
  user: UserRound,
  admin: ShieldCheck,
}

export function PublicHomeRoles() {
  const shouldReduceMotion = useReducedMotion()
  const prefersReducedMotion = Boolean(shouldReduceMotion)
  const sectionVariants = createSectionVariants(prefersReducedMotion)
  const itemVariants = createItemVariants(prefersReducedMotion)
  const cardHover = getCardHover(prefersReducedMotion)

  return (
    <motion.section
      id="roles"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <motion.div variants={itemVariants} className="max-w-2xl space-y-3">
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          {publicHomeContent.roles.badge}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {publicHomeContent.roles.title}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {publicHomeContent.roles.description}
        </p>
      </motion.div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {publicHomeContent.roles.cards.map((role) => (
          <motion.div key={role.title} variants={itemVariants}>
            <HomeCard
              icon={roleIcons[role.id]}
              title={role.title}
              description={role.description}
              details={role.points}
              meta="Protected workspace"
              hoverEffect={cardHover}
              className="p-6"
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
