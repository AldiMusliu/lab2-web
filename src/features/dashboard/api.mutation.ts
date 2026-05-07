import type { QueryClient } from "@tanstack/react-query"

import { dashboardKeys } from "@/features/dashboard/api.queries"

export function invalidateDashboardStats(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
}
