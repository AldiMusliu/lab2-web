import { useSessionStore, type SessionRole } from "@/stores/session.store"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

import { AuthEntryCard } from "./_components/auth-entry-card"

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
      userActionLabel="Continue as user"
      adminActionLabel="Continue as admin"
      onSelectRole={handleDemoSignIn}
      helperText="Need an account?"
      helperLinkLabel="Register"
      helperLinkTo="/register"
    />
  )
}
