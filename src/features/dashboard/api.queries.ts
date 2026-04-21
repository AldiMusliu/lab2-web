import { httpClient } from "@/services/http-client"
import type { DashboardStats } from "@/features/dashboard/types"

export function getDashboardStats() {
  return httpClient.get<DashboardStats>("/dashboard/stats")
}
