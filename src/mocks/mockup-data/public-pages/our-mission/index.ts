export type MissionPillarIcon = "book-heart" | "school" | "lightbulb"

export const missionHero = {
  badge: "Our Mission",
  title:
    "Make library access simpler, smarter, and more useful for the whole community.",
  description:
    "Smart Library exists to reduce friction around reading. We connect shelves, member accounts, borrowing history, and learning programs so people can find knowledge and keep coming back to it.",
} as const

export const missionImpact = {
  title: "Impact goals for 2026",
  description: "Targets the service is actively working toward.",
  metrics: [
    {
      label: "New members",
      value: "+1,200",
    },
    {
      label: "Youth sessions",
      value: "240",
    },
    {
      label: "Return rate",
      value: "97%",
    },
  ],
} as const

export const missionPillarsSection = {
  title: "Mission pillars",
  description:
    "These priorities keep the public experience, staff workflows, and future smart features aligned.",
} as const

export const missionPillars = [
  {
    title: "Reading confidence",
    description:
      "Help children and adults build consistent reading habits with guided discovery, clear availability, and friendly recommendations.",
    icon: "book-heart",
  },
  {
    title: "Equal learning access",
    description:
      "Ensure every member can use the collection regardless of background, schedule, language confidence, or technical experience.",
    icon: "school",
  },
  {
    title: "Future-ready literacy",
    description:
      "Expand traditional reading support into digital literacy, research skills, and responsible use of smart tools.",
    icon: "lightbulb",
  },
] as const

export const missionRoadmap = {
  badge: "Mission roadmap",
  items: [
    {
      phase: "Now",
      title: "Strengthen the catalogue foundation",
      description:
        "Improve book records, category clarity, and availability signals so discovery is useful from day one.",
    },
    {
      phase: "Next 6 months",
      title: "Improve member self-service",
      description:
        "Make profile details, borrowing history, due dates, and account support easier to understand.",
    },
    {
      phase: "Next 12 months",
      title: "Prepare smart recommendations",
      description:
        "Use catalogue and borrowing patterns responsibly to suggest relevant books and support staff decisions.",
    },
  ],
} as const

export const missionStatement = {
  title: "Mission statement",
  quote:
    "Every reader should know what is available, what is due, and where to go next.",
  description:
    "We treat books, programs, and digital access as one continuous learning experience for every member.",
  focusTitle: "Current focus",
  focusDescription:
    "Making the borrowing journey transparent while keeping the public catalogue welcoming and easy to scan.",
} as const
