import { mockBooks, mockBorrowings, mockCategories, mockUsers } from "@/mocks"

export type PublicHomeHeroMetric = {
  label: string
  value: string
  caption: string
}

export type PublicHomeCollectionCard = {
  id: "catalog" | "categories" | "borrowings"
  title: string
  description: string
  meta: string
}

export type PublicHomeServiceCard = {
  id: "auth" | "catalog" | "borrowings" | "architecture"
  title: string
  description: string
  audience: string
  meta: string
}

export type PublicHomeRoleCard = {
  id: "user" | "admin"
  title: string
  description: string
  points: Array<string>
}

type PublicHomeContent = {
  hero: {
    badge: string
    title: string
    description: string
    metrics: Array<PublicHomeHeroMetric>
  }
  collection: {
    badge: string
    title: string
    description: string
    cards: Array<PublicHomeCollectionCard>
  }
  services: {
    badge: string
    title: string
    description: string
    cards: Array<PublicHomeServiceCard>
  }
  roles: {
    badge: string
    title: string
    description: string
    cards: Array<PublicHomeRoleCard>
  }
  cta: {
    badge: string
    title: string
    description: string
    primaryLabel: string
    secondaryLabel: string
  }
}

const activeBorrowings = mockBorrowings.filter(
  (item) => item.returnedAt === null
)
const returnedBorrowings = mockBorrowings.filter(
  (item) => item.returnedAt !== null
)
const overdueBorrowings = activeBorrowings.filter(
  (item) => new Date(item.dueAt).getTime() < Date.now()
)

const booksByCategory = mockBooks.reduce<Record<string, number>>(
  (acc, book) => {
    acc[book.categoryId] = (acc[book.categoryId] ?? 0) + 1
    return acc
  },
  {}
)

const topCategoryId = Object.entries(booksByCategory).sort(
  (a, b) => b[1] - a[1]
)[0]?.[0]
const topCategory =
  mockCategories.find((category) => category.id === topCategoryId)?.name ??
  "Category setup in progress"

const uniqueRoles = new Set(mockUsers.map((user) => user.role))

export const publicHomeContent: PublicHomeContent = {
  hero: {
    badge: "Smart Library",
    title:
      "A connected library for faster discovery, borrowing, and community learning.",
    description:
      "Smart Library combines a searchable digital catalogue, member accounts, due-date tracking, and staff tools so readers can spend less time waiting and more time reading.",
    metrics: [
      {
        label: "Books",
        value: String(mockBooks.length),
        caption: "Titles available in the catalogue preview",
      },
      {
        label: "Categories",
        value: String(mockCategories.length),
        caption: "Organized shelves for guided discovery",
      },
      {
        label: "Borrowings",
        value: String(mockBorrowings.length),
        caption: "Loans tracked through the member portal",
      },
      {
        label: "Roles",
        value: String(uniqueRoles.size),
        caption: "Reader and staff access paths",
      },
    ],
  },
  collection: {
    badge: "Catalogue",
    title: "Find the right book from a catalogue built for daily use.",
    description:
      "Books are grouped by category, linked to borrowing status, and prepared for search-first workflows that match how members actually ask for help.",
    cards: [
      {
        id: "catalog",
        title: "Book catalog",
        description:
          "Browse titles, authors, availability, and category links from one clean catalogue experience.",
        meta: `${mockBooks.length} titles indexed`,
      },
      {
        id: "categories",
        title: "Category shelves",
        description:
          "Use structured shelves to guide readers toward technology, learning, fiction, research, and local-interest material.",
        meta: `Top category: ${topCategory}`,
      },
      {
        id: "borrowings",
        title: "Borrowing health",
        description:
          "Check active loans, due dates, and return status so members and staff share the same view of circulation.",
        meta: `${activeBorrowings.length} active, ${overdueBorrowings.length} overdue`,
      },
    ],
  },
  services: {
    badge: "Services",
    title: "Useful services for members, librarians, and reviewers.",
    description:
      "The public site explains the service layer clearly while the protected portal handles accounts, catalogue management, and borrowing operations.",
    cards: [
      {
        id: "auth",
        title: "Authentication and protected flow",
        description:
          "Members can sign in to view profile details, borrowing history, and the routes available for their role.",
        audience: "Readers and library staff",
        meta: `${uniqueRoles.size} role paths ready`,
      },
      {
        id: "catalog",
        title: "Catalog and category management",
        description:
          "Staff can keep the collection organized with book records, category structure, and availability signals.",
        audience: "Librarians and admins",
        meta: `${mockBooks.length} books across ${mockCategories.length} categories`,
      },
      {
        id: "borrowings",
        title: "Borrow and return lifecycle",
        description:
          "The system follows each loan from checkout to return with clear due dates and operational status.",
        audience: "Members and circulation desk",
        meta: `${returnedBorrowings.length} returned, ${activeBorrowings.length} active`,
      },
      {
        id: "architecture",
        title: "Scalable full-stack architecture",
        description:
          "The product is designed to grow into recommendations, analytics, and richer integrations without changing the public experience.",
        audience: "Project team and reviewers",
        meta: "AI-ready extension path included",
      },
    ],
  },
  roles: {
    badge: "Roles",
    title: "Readers and staff get different workspaces for different jobs.",
    description:
      "The same Smart Library product supports member self-service and librarian operations without mixing responsibilities.",
    cards: [
      {
        id: "user",
        title: "User role",
        description:
          "Readers focus on discovery, borrowing, returns, and their own account history without staff-only tools in the way.",
        points: [
          "Browse books and categories",
          "Borrow and return with due-date awareness",
          "Access profile and personal borrowing history",
        ],
      },
      {
        id: "admin",
        title: "Admin role",
        description:
          "Administrators manage the catalogue, categories, and borrowing records through a dedicated operational layout.",
        points: [
          "Manage catalog and category structure",
          "Oversee borrowing records and workflow health",
          "Prepare data foundation for analytics and AI features",
        ],
      },
    ],
  },
  cta: {
    badge: "Continue",
    title: "Enter the portal to try the member and staff experience.",
    description:
      "Use login for existing credentials or register a new account to explore how Smart Library handles real borrowing workflows.",
    primaryLabel: "Go to login",
    secondaryLabel: "Create account",
  },
}
