export type ServiceIcon =
  | "book-check"
  | "book-copy"
  | "calendar-clock"
  | "shield-check"

export const servicesHero = {
  badge: "Services",
  title: "Library services designed around real member needs.",
  description:
    "From borrowing support to learning sessions, we offer practical services that help readers access books and knowledge without friction.",
} as const

export const servicesSnapshot = {
  title: "Service quality snapshot",
  metrics: [
    {
      label: "Avg wait time",
      value: "4 min",
    },
    {
      label: "Monthly checkouts",
      value: "8.2k",
    },
    {
      label: "Member rating",
      value: "4.9/5",
    },
  ],
} as const

export const servicesSectionIntro = {
  title: "Core services",
  description:
    "Built to make every step of the library journey straightforward, fast, and welcoming.",
} as const

export const serviceCards = [
  {
    title: "Borrow & Return Desk",
    description:
      "Quick checkouts with member ID, due-date reminders, and smooth return tracking.",
    audience: "Students, teachers, and public members",
    icon: "book-check",
  },
  {
    title: "Curated Reading Lists",
    description:
      "Monthly collections built around genres, school curriculum needs, and local events.",
    audience: "Families and book clubs",
    icon: "book-copy",
  },
  {
    title: "Community Learning Sessions",
    description:
      "Workshops on digital literacy, research basics, and reading habits for all ages.",
    audience: "Youth and lifelong learners",
    icon: "calendar-clock",
  },
  {
    title: "Member Account Assistance",
    description:
      "Support for registration, profile updates, borrowing history, and account recovery.",
    audience: "New and returning members",
    icon: "shield-check",
  },
] as const

export const serviceFlow = {
  title: "How members usually use our services",
  steps: [
    {
      step: "01",
      title: "Discover",
      description: "Search by title, author, or category to find the right book.",
    },
    {
      step: "02",
      title: "Reserve or borrow",
      description:
        "Reserve online or borrow at the desk with transparent availability and due dates.",
    },
    {
      step: "03",
      title: "Stay informed",
      description:
        "Receive gentle reminders and updates for returns, extensions, and new arrivals.",
    },
  ],
} as const

export const serviceHours = {
  title: "Service hours",
  description:
    "We balance day-time and evening availability so members can visit after school or work.",
  slots: [
    {
      label: "Monday to Friday",
      value: "08:00 - 20:00",
    },
    {
      label: "Saturday",
      value: "09:00 - 18:00",
    },
    {
      label: "Sunday",
      value: "10:00 - 16:00",
    },
  ],
} as const
