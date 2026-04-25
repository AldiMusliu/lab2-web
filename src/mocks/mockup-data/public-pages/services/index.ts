export type ServiceIcon =
  | "book-check"
  | "book-copy"
  | "calendar-clock"
  | "shield-check"

export const servicesHero = {
  badge: "Services",
  title: "Smart services for borrowing, discovery, and member support.",
  description:
    "Smart Library makes common library tasks easier: finding a book, checking availability, managing a member account, tracking due dates, and getting help from staff when it matters.",
} as const

export const servicesSnapshot = {
  title: "Service snapshot",
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
    "Each service maps to a real workflow in the public library: discovery, circulation, learning support, and account care.",
} as const

export const serviceCards = [
  {
    title: "Borrow and return desk",
    description:
      "Fast checkout with member identification, clear due dates, staff visibility, and return tracking.",
    audience: "Students, teachers, and public members",
    icon: "book-check",
  },
  {
    title: "Smart catalogue discovery",
    description:
      "Category-led browsing that helps members move from a broad interest to a specific available title.",
    audience: "Students, families, and book clubs",
    icon: "book-copy",
  },
  {
    title: "Community learning sessions",
    description:
      "Workshops on digital literacy, research basics, reading habits, and responsible use of online resources.",
    audience: "Youth and lifelong learners",
    icon: "calendar-clock",
  },
  {
    title: "Member account assistance",
    description:
      "Help with registration, profile updates, borrowing history, account recovery, and role-based portal access.",
    audience: "New and returning members",
    icon: "shield-check",
  },
] as const

export const serviceFlow = {
  title: "How members usually use Smart Library",
  steps: [
    {
      step: "01",
      title: "Discover",
      description:
        "Search or browse by title, author, and category to find a useful book faster.",
    },
    {
      step: "02",
      title: "Borrow with visibility",
      description:
        "Borrow through the desk or portal with availability, due date, and account status clearly visible.",
    },
    {
      step: "03",
      title: "Stay on track",
      description:
        "Follow borrowing history, return status, and upcoming due dates from the member workspace.",
    },
  ],
} as const

export const serviceHours = {
  title: "Service hours",
  description:
    "The branch keeps daytime and evening coverage so students, staff, and working families can use the service without rearranging the whole day.",
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
