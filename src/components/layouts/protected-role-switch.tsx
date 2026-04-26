import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Loader2, LogOut } from "lucide-react"

import { logout } from "@/features/authentication/api.mutation"
import { Button } from "@/components/ui/button"
import { useSessionStore } from "@/stores/session.store"
import { cn } from "@/lib/utils"

type ProtectedRoleSwitchProps = {
  tone?: "default" | "primary"
  className?: string
}

export function ProtectedRoleSwitch({
  tone = "default",
  className,
}: ProtectedRoleSwitchProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const role = useSessionStore((state) => state.role)
  const user = useSessionStore((state) => state.user)
  const reset = useSessionStore((state) => state.reset)
  const roleLabel = role === "admin" ? "Admin" : "User"
  const displayName = user?.fullName ?? roleLabel

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      reset()
      queryClient.clear()
      void navigate({ to: "/login" })
    },
  })

  return (
    <div
      className={cn(
        "inline-flex min-w-0 items-center gap-2 rounded-lg border px-2 py-1.5",
        tone === "primary"
          ? "border-white/20 bg-white/10 text-primary-foreground"
          : "border-border bg-muted/40 text-foreground",
        className
      )}
    >
      <div className="min-w-0 px-1">
        <p className="max-w-40 truncate text-xs font-semibold">{displayName}</p>
        <p
          className={cn(
            "text-[0.7rem] font-medium",
            tone === "primary"
              ? "text-primary-foreground/70"
              : "text-muted-foreground"
          )}
        >
          {roleLabel}
        </p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Log out"
        disabled={logoutMutation.isPending}
        onClick={() => logoutMutation.mutate()}
        className={cn(
          tone === "primary" &&
            "text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
        )}
      >
        {logoutMutation.isPending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <LogOut className="size-4" aria-hidden="true" />
        )}
      </Button>
    </div>
  )
}
