import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { SessionRole } from "@/stores/session.store"

type AuthRoleSwitchProps = {
  userLabel: string
  adminLabel: string
  onSelectRole: (role: SessionRole) => void
}

export function AuthRoleSwitch({
  userLabel,
  adminLabel,
  onSelectRole,
}: AuthRoleSwitchProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => onSelectRole("user")}
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "h-11 rounded-full"
        )}
      >
        {userLabel}
      </button>
      <button
        type="button"
        onClick={() => onSelectRole("admin")}
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "h-11 rounded-full"
        )}
      >
        {adminLabel}
      </button>
    </div>
  )
}
