import { useSessionStore, type SessionRole } from "@/stores/session.store"
import { cn } from "@/lib/utils"

type ProtectedRoleSwitchProps = {
  tone?: "default" | "primary"
  className?: string
}

const roleLabels: Record<SessionRole, string> = {
  user: "User",
  admin: "Admin",
}

export function ProtectedRoleSwitch({
  tone = "default",
  className,
}: ProtectedRoleSwitchProps) {
  const role = useSessionStore((state) => state.role)
  const setRole = useSessionStore((state) => state.setRole)

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border p-1",
        tone === "primary"
          ? "border-white/20 bg-white/10 text-primary-foreground"
          : "border-border bg-muted/40 text-foreground",
        className
      )}
    >
      {(["user", "admin"] as const).map((value) => {
        const active = role === value

        return (
          <button
            key={value}
            type="button"
            onClick={() => setRole(value)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              tone === "primary"
                ? active
                  ? "bg-background text-foreground"
                  : "text-primary-foreground/80 hover:text-primary-foreground"
                : active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
            )}
          >
            {roleLabels[value]}
          </button>
        )
      })}
    </div>
  )
}
