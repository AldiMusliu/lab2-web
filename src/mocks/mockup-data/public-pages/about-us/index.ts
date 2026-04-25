export type AboutUsValueIcon = "book-marked" | "hand-heart" | "users"

export const aboutUsHero = {
  badge: "About Smart Library",
  title: "A city library service redesigned for how people borrow today.",
  description:
    "Smart Library brings the physical reading room, digital catalogue, member accounts, and staff operations into one reliable service. Members can discover titles quickly while librarians keep circulation visible and organized.",
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
  title: "From front desk to smart service",
  description: "Milestones that shaped the current platform.",
} as const

export const aboutUsMilestones = [
  {
    year: "2019",
    label: "Community branch opened",
    note: "Started with a compact public collection, reading tables, and a volunteer-led circulation desk.",
  },
  {
    year: "2022",
    label: "Digital borrowing introduced",
    note: "Added member logins, borrowing history, category browsing, and basic due-date tracking.",
  },
  {
    year: "2026",
    label: "Smart Library platform",
    note: "Expanded into a role-based portal for members, librarians, catalogue updates, and service reporting.",
  },
] as const

export const aboutUsGuide = {
  title: "What guides our work",
  description:
    "Every decision is measured against access, operational clarity, and the small daily moments that make a public library feel dependable.",
  districtBadge: "Smart Library District",
} as const

export const aboutUsValues = [
  {
    title: "Open access for every reader",
    description:
      "The catalogue is structured so students, teachers, parents, and casual readers can find useful material without needing staff intervention every time.",
    icon: "book-marked",
  },
  {
    title: "People-first support",
    description:
      "Librarians use the system as a support tool, not a barrier, helping members with accounts, borrowing questions, and recommendations.",
    icon: "hand-heart",
  },
  {
    title: "Neighborhood driven",
    description:
      "Programs, reading lists, and service hours are shaped around local school schedules, working families, and community demand.",
    icon: "users",
  },
] as const

export const aboutUsCta = {
  title: "See the services behind the public experience.",
  description:
    "Explore how Smart Library handles discovery, borrowing support, member accounts, and the mission behind the platform.",
  primaryLabel: "Explore services",
  secondaryLabel: "Read our mission",
} as const
