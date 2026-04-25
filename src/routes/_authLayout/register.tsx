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
      userActionLabel="Create user account"
      adminActionLabel="Create admin account"
      onSelectRole={handleDemoRegister}
      helperText="Already registered?"
      helperLinkLabel="Login"
      helperLinkTo="/login"
    />
  )
}
