import { useSessionStore } from "@/stores/session.store"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/_authLayout/register")({
  component: RegisterPage,
})

function RegisterPage() {
  const setAuthenticated = useSessionStore((state) => state.setAuthenticated)
  const navigate = useNavigate()

  const handleDemoRegister = () => {
    setAuthenticated(true)
    void navigate({ to: "/dashboard" })
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight">
        Create an account
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Register form placeholder. This route is public and separate from the
        protected app layout.
      </p>
      <button
        type="button"
        onClick={handleDemoRegister}
        className="mt-6 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Create demo account
      </button>
    </div>
  )
}
