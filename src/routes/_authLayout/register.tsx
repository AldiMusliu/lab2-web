import { Input } from "@/components/ui/input"
import { useSessionStore, type SessionRole } from "@/stores/session.store"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

import { AuthEntryCard } from "./_components/auth-entry-card"

export const Route = createFileRoute("/_authLayout/register")({
  component: RegisterPage,
})

function RegisterPage() {
  const startDemoSession = useSessionStore((state) => state.startDemoSession)
  const navigate = useNavigate()

  const handleDemoRegister = (role: SessionRole) => {
    startDemoSession(role)
    void navigate({ to: "/dashboard" })
  }

  return (
    <AuthEntryCard
      title="Create an account"
      description="Register form placeholder. This route is public and separate from the protected app layout."
      fields={
        <>
          <div className="grid gap-2">
            <label
              htmlFor="register-name"
              className="text-sm font-medium text-foreground"
            >
              Full name
            </label>
            <Input
              id="register-name"
              type="text"
              placeholder="Alex Reader"
              autoComplete="name"
              className="h-11"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="register-email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </label>
            <Input
              id="register-email"
              type="email"
              placeholder="you@library.com"
              autoComplete="email"
              className="h-11"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="register-password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <Input
              id="register-password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              className="h-11"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="register-confirm-password"
              className="text-sm font-medium text-foreground"
            >
              Confirm password
            </label>
            <Input
              id="register-confirm-password"
              type="password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              className="h-11"
            />
          </div>
        </>
      }
      userActionLabel="Create user account"
      adminActionLabel="Create admin account"
      onSelectRole={handleDemoRegister}
      helperText="Already registered?"
      helperLinkLabel="Login"
      helperLinkTo="/login"
    />
  )
}
