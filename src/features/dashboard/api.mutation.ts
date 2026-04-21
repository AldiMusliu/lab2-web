import { httpClient } from "@/services/http-client"
import type { DashboardFilterInput } from "@/features/dashboard/schemas"
import type { DashboardStats } from "@/features/dashboard/types"

export function refreshDashboardStats(payload: DashboardFilterInput) {
  return httpClient.post<DashboardStats>("/dashboard/stats/refresh", payload)
}
