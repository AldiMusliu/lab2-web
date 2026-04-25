export type AboutUsValueIcon = "book-marked" | "hand-heart" | "users"

export const aboutUsHero = {
  badge: "About Smart Library",
  title: "A local library built to make reading easier to reach.",
  description:
    "Smart Library blends a warm neighborhood reading space with a practical digital borrowing system. We help members find books, reserve titles, and stay connected to learning programs.",
} as const

export const aboutUsStats = [
  {
    label: "Active members",
    value: "3,450+",
  },
  {
    label: "Physical books",
    value: "12,800",
  },
  {
    label: "Weekly programs",
    value: "18",
  },
] as const

export const aboutUsJourney = {
  title: "Our journey",
  description: "Milestones that shaped our library.",
} as const

export const aboutUsMilestones = [
  {
    year: "2019",
    label: "Library launch",
    note: "Started with 1,200 donated books and a small volunteer team.",
  },
  {
    year: "2022",
    label: "Digital borrowing portal",
    note: "Introduced member logins, borrowing history, and category-based discovery.",
  },
  {
    year: "2026",
    label: "Community learning hub",
    note: "Now supporting workshops, reading circles, and youth mentoring events.",
  },
] as const

export const aboutUsGuide = {
  title: "What guides our work",
  description:
    "Our team uses these principles to shape every shelf update, program plan, and member interaction.",
  districtBadge: "City Library District",
} as const

export const aboutUsValues = [
  {
    title: "Open access for every reader",
    description:
      "We keep the collection discoverable and easy to navigate for students, teachers, and casual readers.",
    icon: "book-marked",
  },
  {
    title: "People first support",
    description:
      "Our librarians and volunteers guide members through borrowing, recommendations, and account support.",
    icon: "hand-heart",
  },
  {
    title: "Neighborhood driven",
    description:
      "From reading clubs to after-school sessions, our programs are shaped by local community needs.",
    icon: "users",
  },
] as const

export const aboutUsCta = {
  title: "Want to see how we support readers daily?",
  description:
    "Explore our services and mission to understand the programs, borrowing support, and learning opportunities we provide.",
  primaryLabel: "Explore services",
  secondaryLabel: "Read our mission",
} as const
