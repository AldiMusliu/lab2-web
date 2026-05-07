import { z } from "zod"

const dashboardCountSchema = z.number().int().nonnegative()

export const adminDashboardStatsSchema = z.object({
  role: z.literal("admin"),
  totalBooks: dashboardCountSchema,
  totalCopies: dashboardCountSchema,
  availableCopies: dashboardCountSchema,
  borrowedCopies: dashboardCountSchema,
  availableBooks: dashboardCountSchema,
  totalCategories: dashboardCountSchema,
  totalUsers: dashboardCountSchema,
  adminUsers: dashboardCountSchema,
  activeUsers: dashboardCountSchema,
  totalBorrowings: dashboardCountSchema,
  activeBorrowings: dashboardCountSchema,
  overdueBorrowings: dashboardCountSchema,
  returnedBorrowings: dashboardCountSchema,
})

export const userDashboardStatsSchema = z.object({
  role: z.literal("user"),
  totalBorrowings: dashboardCountSchema,
  activeBorrowings: dashboardCountSchema,
  overdueBorrowings: dashboardCountSchema,
  returnedBorrowings: dashboardCountSchema,
  currentBorrowings: dashboardCountSchema,
  dueSoonBorrowings: dashboardCountSchema,
})

export const dashboardStatsSchema = z.discriminatedUnion("role", [
  adminDashboardStatsSchema,
  userDashboardStatsSchema,
])

export type AdminDashboardStats = z.infer<typeof adminDashboardStatsSchema>
export type UserDashboardStats = z.infer<typeof userDashboardStatsSchema>
export type DashboardStats = z.infer<typeof dashboardStatsSchema>
