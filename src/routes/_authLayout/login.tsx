import { useSessionStore, type SessionRole } from "@/stores/session.store"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

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
    <div className="mx-auto w-full max-w-md rounded-2xl border bg-white p-6 text-card-foreground shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Login form placeholder. Public users can browse pages, then sign in to
        access protected actions.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleDemoSignIn("user")}
          className="inline-flex justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Continue as user
        </button>
        <button
          type="button"
          onClick={() => handleDemoSignIn("admin")}
          className="inline-flex justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Continue as admin
        </button>
      </div>
    </div>
  )
}
