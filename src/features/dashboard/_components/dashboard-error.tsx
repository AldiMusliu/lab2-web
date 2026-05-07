import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-lg border bg-card p-6 text-center">
      <h2 className="text-lg font-semibold text-foreground">
        Dashboard unavailable
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        We could not load the latest library statistics.
      </p>
      <Button
        type="button"
        variant="outline"
        onClick={onRetry}
        className="mt-5"
      >
        <RefreshCw className="size-4" aria-hidden="true" />
        Retry
      </Button>
    </div>
  )
}

export default DashboardError
