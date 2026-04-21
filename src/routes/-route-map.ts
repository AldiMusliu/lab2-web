export const routeMap = {
  home: "/",
  dashboard: "/dashboard",
  books: "/books",
  categories: "/categories",
  borrowings: "/borrowings",
  profile: "/profile",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
} as const

export type RouteMap = typeof routeMap
