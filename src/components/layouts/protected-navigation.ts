import {
  BookCheck,
  BookCopy,
  LayoutDashboard,
  Tags,
  UserRound,
  UsersRound,
} from "lucide-react"

export const protectedNavigationItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    description: "Overview and recent activity",
    icon: LayoutDashboard,
  },
  {
    to: "/books",
    label: "Books",
    description: "Catalog and book records",
    icon: BookCopy,
  },
  {
    to: "/categories",
    label: "Categories",
    description: "Organize the collection",
    icon: Tags,
  },
  {
    to: "/users",
    label: "Users",
    description: "Manage member accounts",
    icon: UsersRound,
  },
  {
    to: "/borrowings",
    label: "Borrowings",
    description: "Track checkouts and returns",
    icon: BookCheck,
  },
  {
    to: "/profile",
    label: "Profile",
    description: "Personal details and history",
    icon: UserRound,
  },
] as const
