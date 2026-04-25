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
  points: string[]
}

type PublicHomeContent = {
  hero: {
    badge: string
    title: string
    description: string
    metrics: PublicHomeHeroMetric[]
  }
  collection: {
    badge: string
    title: string
    description: string
    cards: PublicHomeCollectionCard[]
  }
  services: {
    badge: string
    title: string
    description: string
    cards: PublicHomeServiceCard[]
  }
  roles: {
    badge: string
    title: string
    description: string
    cards: PublicHomeRoleCard[]
  }
  cta: {
    badge: string
    title: string
    description: string
    primaryLabel: string
    secondaryLabel: string
  }
}

const activeBorrowings = mockBorrowings.filter((item) => item.returnedAt === null)
const returnedBorrowings = mockBorrowings.filter((item) => item.returnedAt !== null)
const overdueBorrowings = activeBorrowings.filter(
  (item) => new Date(item.dueAt).getTime() < Date.now(),
)

const booksByCategory = mockBooks.reduce<Record<string, number>>((acc, book) => {
  acc[book.categoryId] = (acc[book.categoryId] ?? 0) + 1
  return acc
}, {})

const topCategoryId = Object.entries(booksByCategory).sort((a, b) => b[1] - a[1])[0]?.[0]
const topCategory =
  mockCategories.find((category) => category.id === topCategoryId)?.name ??
  "Category setup in progress"

const uniqueRoles = new Set(mockUsers.map((user) => user.role))

export const publicHomeContent: PublicHomeContent = {
  hero: {
    badge: "Smart Library Project",
    title: "A real project workspace for modern library operations.",
    description:
      "This home page now reads from your current project data and reflects the actual scope: authentication, catalog management, borrowing workflow, profile area, and admin operations in one roadmap.",
    metrics: [
      {
        label: "Books",
        value: String(mockBooks.length),
        caption: "Catalog records currently available",
      },
      {
        label: "Categories",
        value: String(mockCategories.length),
        caption: "Shelves configured in the dataset",
      },
      {
        label: "Borrowings",
        value: String(mockBorrowings.length),
        caption: "Borrowing records tracked so far",
      },
      {
        label: "Roles",
        value: String(uniqueRoles.size),
        caption: "Distinct access roles prepared",
      },
    ],
  },
  collection: {
    badge: "Collection",
    title: "Driven by real records, not placeholder copy.",
    description:
      "Core cards below are now generated from your current Smart Library datasets so every section reflects live project context.",
    cards: [
      {
        id: "catalog",
        title: "Book catalog",
        description:
          "Track titles, authors, and category links in a single catalog ready for search and filtering workflows.",
        meta: `${mockBooks.length} titles indexed`,
      },
      {
        id: "categories",
        title: "Category shelves",
        description:
          "Group books into structured shelves so readers can discover content quickly and admins can manage taxonomy.",
        meta: `Top category: ${topCategory}`,
      },
      {
        id: "borrowings",
        title: "Borrowing health",
        description:
          "Monitor due dates, active loans, and return flow to keep borrowing operations transparent and predictable.",
        meta: `${activeBorrowings.length} active, ${overdueBorrowings.length} overdue`,
      },
    ],
  },
  services: {
    badge: "Services",
    title: "Mapped to your actual Smart Library scope.",
    description:
      "These service blocks align with your documented architecture, role flow, and future integration direction.",
    cards: [
      {
        id: "auth",
        title: "Authentication and protected flow",
        description:
          "Public visitors can move into protected routes with role-aware navigation for user and admin workspaces.",
        audience: "Readers and library staff",
        meta: `${uniqueRoles.size} role paths ready`,
      },
      {
        id: "catalog",
        title: "Catalog and category management",
        description:
          "Manage books and categories as the operational core for discovery, organization, and future search improvements.",
        audience: "Librarians and admins",
        meta: `${mockBooks.length} books across ${mockCategories.length} categories`,
      },
      {
        id: "borrowings",
        title: "Borrow and return lifecycle",
        description:
          "Cover the full timeline from checkout to return with clear status visibility and due date tracking.",
        audience: "Members and circulation desk",
        meta: `${returnedBorrowings.length} returned, ${activeBorrowings.length} active`,
      },
      {
        id: "architecture",
        title: "Scalable full-stack architecture",
        description:
          "Frontend is aligned with TanStack Start while backend and database layers are planned for Express, PostgreSQL, and MongoDB.",
        audience: "Project team and reviewers",
        meta: "AI-ready extension path included",
      },
    ],
  },
  roles: {
    badge: "Roles",
    title: "User and admin experiences are separated with intent.",
    description:
      "Role cards summarize how each path is designed inside the same product while keeping responsibilities clear.",
    cards: [
      {
        id: "user",
        title: "User role",
        description:
          "Readers focus on discovery, borrowing, returning, and reviewing personal activity without admin complexity.",
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
          "Administrators control library operations through a dedicated layout and management-oriented navigation.",
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
    title: "Open the protected area and test the role-based experience.",
    description:
      "Use login for existing credentials or register a new account to continue validating both user and admin navigation paths.",
    primaryLabel: "Go to login",
    secondaryLabel: "Create account",
  },
}
