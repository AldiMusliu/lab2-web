import { httpClient } from "@/lib/http-client"
import type { DashboardStats } from "@/features/dashboard/types"

export function getDashboardStats() {
  return httpClient.get<DashboardStats>("/dashboard/stats")
}
