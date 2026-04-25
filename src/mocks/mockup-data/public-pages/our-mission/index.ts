export type MissionPillarIcon = "book-heart" | "school" | "lightbulb"

export const missionHero = {
  badge: "Our Mission",
  title: "We exist to make knowledge practical, local, and shared.",
  description:
    "Smart Library is not only a place to borrow books. Our mission is to help people build lasting learning habits, connect with ideas, and grow together through accessible reading programs.",
} as const

export const missionImpact = {
  title: "Impact goals for 2026",
  description: "Targets we are actively working toward.",
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
    "These priorities help us align library operations, digital tools, and community partnerships.",
} as const

export const missionPillars = [
  {
    title: "Reading confidence",
    description:
      "Help children and adults build consistent reading habits with guided programs and friendly recommendations.",
    icon: "book-heart",
  },
  {
    title: "Equal learning access",
    description:
      "Ensure every member can find resources regardless of background, schedule, or experience level.",
    icon: "school",
  },
  {
    title: "Future-ready literacy",
    description:
      "Expand from traditional reading support to digital literacy and research skill development.",
    icon: "lightbulb",
  },
] as const

export const missionRoadmap = {
  badge: "Mission roadmap",
  items: [
    {
      phase: "Now",
      title: "Strengthen the core collection",
      description:
        "Increase high-demand titles, refresh children shelves, and improve category discoverability.",
    },
    {
      phase: "Next 6 months",
      title: "Launch neighborhood reading circles",
      description:
        "Host small group sessions that connect readers, librarians, and local educators.",
    },
    {
      phase: "Next 12 months",
      title: "Scale digital member support",
      description:
        "Roll out richer recommendations, better account insights, and easier reservation tracking.",
    },
  ],
} as const

export const missionStatement = {
  title: "Mission statement",
  quote: "Every shelf should open a new opportunity for someone in our city.",
  description:
    "We treat books, programs, and digital access as one continuous learning experience for every member.",
  focusTitle: "Current focus",
  focusDescription:
    "Expanding family literacy events and improving support for first-time readers.",
} as const
