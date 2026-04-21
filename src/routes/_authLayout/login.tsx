import { useSessionStore } from "@/stores/session.store"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/_authLayout/login")({
  component: LoginPage,
})

function LoginPage() {
  const setAuthenticated = useSessionStore((state) => state.setAuthenticated)
  const navigate = useNavigate()

  const handleDemoSignIn = () => {
    setAuthenticated(true)
    void navigate({ to: "/dashboard" })
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Login form placeholder. Public users can browse pages, then sign in to
        access protected actions.
      </p>
      <button
        type="button"
        onClick={handleDemoSignIn}
        className="mt-6 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Continue as demo user
      </button>
    </div>
  )
}
