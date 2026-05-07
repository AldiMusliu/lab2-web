import type { DashboardStats } from "@/features/dashboard/types"
import { dashboardStatsSchema } from "@/features/dashboard/schemas"
import { httpClient } from "@/lib/http-client"

export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
}

export async function getDashboardStats() {
  const stats = await httpClient.get<unknown>("/dashboard/stats")

  return dashboardStatsSchema.parse(stats) satisfies DashboardStats
}
