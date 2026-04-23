import { Link } from "@tanstack/react-router"

export function PublicHomeCta() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-border/70 bg-background px-6 py-8 shadow-sm sm:px-8 sm:py-10">
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          Continue
        </p>
        <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Enter the protected area as a user or admin and test both layouts.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          The demo auth flow now supports both static roles so you can preview
          the user and admin experiences separately.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/login"
            className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Go to login
          </Link>
          <Link
            to="/register"
            className="inline-flex rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Create account
          </Link>
        </div>
      </div>
    </section>
  )
}
