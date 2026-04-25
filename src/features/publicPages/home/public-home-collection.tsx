import { HomeCard } from "@/features/publicPages/home/_components/card"
import {
  publicHomeContent,
  type PublicHomeCollectionCard,
} from "@/features/publicPages/home/home-project-data"
import {
  createItemVariants,
  createSectionVariants,
  getCardHover,
} from "@/features/publicPages/home/home-motion"
import { motion, useReducedMotion } from "framer-motion"
import { BookCopy, BookMarked, Tags, type LucideIcon } from "lucide-react"

const collectionIcons: Record<PublicHomeCollectionCard["id"], LucideIcon> = {
  catalog: BookCopy,
  categories: Tags,
  borrowings: BookMarked,
}

export function PublicHomeCollection() {
  const shouldReduceMotion = useReducedMotion()
  const prefersReducedMotion = Boolean(shouldReduceMotion)
  const sectionVariants = createSectionVariants(prefersReducedMotion)
  const itemVariants = createItemVariants(prefersReducedMotion)
  const cardHover = getCardHover(prefersReducedMotion)

  return (
    <motion.section
      id="collection"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <motion.div variants={itemVariants} className="max-w-2xl space-y-3">
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          {publicHomeContent.collection.badge}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {publicHomeContent.collection.title}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {publicHomeContent.collection.description}
        </p>
      </motion.div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {publicHomeContent.collection.cards.map((card) => {
          const Icon = collectionIcons[card.id]

          return (
            <motion.div key={card.title} variants={itemVariants}>
              <HomeCard
                icon={Icon}
                title={card.title}
                description={card.description}
                meta={card.meta}
                hoverEffect={cardHover}
              />
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
