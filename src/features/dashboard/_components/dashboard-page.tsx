import { useQuery } from "@tanstack/react-query"
import { Loader2, RefreshCw } from "lucide-react"

import {
  dashboardKeys,
  getDashboardStats,
} from "@/features/dashboard/api.queries"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DashboardError } from "./dashboard-error"
import AdminDashboard from "./admin-dashboard"
import UserDashboard from "./user-dashboard"

// Components were split into separate files in the same folder.

export function DashboardPage() {
  const {
    data: stats,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getDashboardStats,
  })

  if (isLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center rounded-lg border bg-card">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError || !stats) {
    return <DashboardError onRetry={() => void refetch()} />
  }

  return (
    <div className="grid gap-4">
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isFetching}
          onClick={() => void refetch()}
          className="h-10"
        >
          <RefreshCw
            className={cn("size-4", isFetching && "animate-spin")}
            aria-hidden="true"
          />
          Refresh stats
        </Button>
      </div>

      {stats.role === "admin" ? (
        <AdminDashboard stats={stats} />
      ) : (
        <UserDashboard stats={stats} />
      )}
    </div>
  )
}
