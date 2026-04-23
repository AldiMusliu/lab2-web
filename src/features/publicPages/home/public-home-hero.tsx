import { Link } from "@tanstack/react-router"
import { LibraryBig } from "lucide-react"

export function PublicHomeHero() {
  return (
    <section className="border-b border-border/50 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_24%),linear-gradient(180deg,var(--color-secondary),var(--color-secondary),var(--color-background))]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            Welcome to Smart Library
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              A digital library space for books, categories, and borrowing.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Smart Library is built around the real flow of a library:
              discovering books, organizing collections, borrowing titles,
              returning them, and managing everything with clear user and admin
              roles.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/#collection"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Explore collection
            </a>
            <Link
              to="/login"
              className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Login to continue
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border/70 bg-background/[0.92] p-6 shadow-lg shadow-primary/5">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LibraryBig className="size-6" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-foreground">
                Library at a glance
              </p>
              <p className="text-sm text-muted-foreground">
                What this system is designed to support
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-secondary p-4">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                Catalog
              </p>
              <p className="mt-2 text-base font-semibold text-foreground">
                Books and categories
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-secondary p-4">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                Member flow
              </p>
              <p className="mt-2 text-base font-semibold text-foreground">
                Borrow and return
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-secondary p-4">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                Protected area
              </p>
              <p className="mt-2 text-base font-semibold text-foreground">
                Dashboard and profile
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-secondary p-4">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                Administration
              </p>
              <p className="mt-2 text-base font-semibold text-foreground">
                CRM-style sidebar layout
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
