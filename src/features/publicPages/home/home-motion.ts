import type { Variants } from "framer-motion"

export function createSectionVariants(shouldReduceMotion: boolean): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    }
  }

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.24,
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  }
}

export function createItemVariants(
  shouldReduceMotion: boolean,
  yOffset = 18,
): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    }
  }

  return {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }
}

export function getCardHover(shouldReduceMotion: boolean) {
  if (shouldReduceMotion) {
    return undefined
  }

  return {
    y: -6,
    scale: 1.01,
  }
}
