import { Input } from "@/components/ui/input"
import { useSessionStore, type SessionRole } from "@/stores/session.store"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

import { AuthEntryCard } from "../../features/authentication/_components/auth-entry-card"

export const Route = createFileRoute("/_authLayout/login")({
  component: LoginPage,
})

function LoginPage() {
  const startDemoSession = useSessionStore((state) => state.startDemoSession)
  const navigate = useNavigate()

  const handleDemoSignIn = (role: SessionRole) => {
    startDemoSession(role)
    void navigate({ to: "/dashboard" })
  }

  return (
    <AuthEntryCard
      title="Welcome back"
      description="Login form placeholder. Public users can browse pages, then sign in to access protected actions."
      fields={
        <>
          <div className="grid gap-2">
            <label
              htmlFor="login-email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </label>
            <Input
              id="login-email"
              type="email"
              placeholder="you@library.com"
              autoComplete="email"
              className="h-11"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="login-password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <Input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              className="h-11"
            />
          </div>
        </>
      }
      userActionLabel="Continue as user"
      adminActionLabel="Continue as admin"
      onSelectRole={handleDemoSignIn}
      helperText="Need an account?"
      helperLinkLabel="Register"
      helperLinkTo="/register"
    />
  )
}
