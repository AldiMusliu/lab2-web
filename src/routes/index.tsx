import { PublicLayout } from "@/components/layouts/public-layout"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PublicLayout>
      <section className="border-b border-border/60 bg-linear-to-br from-background via-muted/20 to-primary/5">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-primary uppercase">
              Public Library Portal
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Find books quickly, then sign in when you are ready to act.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                Anyone can browse the collection and discover what is available.
                Borrowing, reserving, and account actions stay protected behind
                authentication.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/#books"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Browse books
              </a>
              <Link
                to="/login"
                className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Login for actions
              </Link>
            </div>
          </div>

          <div className="grid gap-4 self-end sm:grid-cols-2">
            <article className="rounded-2xl border border-border/80 bg-card p-4 shadow-sm">
              <p className="text-sm font-semibold text-foreground">
                Public catalog
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Search and preview books without an account.
              </p>
            </article>
            <article className="rounded-2xl border border-border/80 bg-card p-4 shadow-sm">
              <p className="text-sm font-semibold text-foreground">
                Protected actions
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Borrow, reserve, and manage profile after login.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="books"
        className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="mb-6 space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Featured books
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Public visitors can preview titles and availability before logging
            in.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Modern React", "Data Modeling", "Design Systems"].map((title) => (
            <article
              key={title}
              className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm"
            >
              <p className="text-sm text-muted-foreground">
                Available in catalog
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h3>
              <Link
                to="/login"
                className="mt-4 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Login to borrow
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="border-y border-border/60 bg-muted/20">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Contact us
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Need help finding materials or understanding access rules? Reach
              our library team and we will guide you.
            </p>
          </div>
          <div className="rounded-2xl border border-border/80 bg-background p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="mt-1 font-medium text-foreground">
              hello@smartlibrary.edu
            </p>
            <p className="mt-4 text-sm text-muted-foreground">Phone</p>
            <p className="mt-1 font-medium text-foreground">
              +62 812 0000 1111
            </p>
          </div>
        </div>
      </section>

      <section
        id="newsletter"
        className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="rounded-3xl border border-border/80 bg-card px-6 py-8 sm:px-8 sm:py-10">
          <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
            Newsletter
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Get monthly reading picks and library updates.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Keep up with new arrivals, featured collections, and policy changes.
            Sign in to manage your subscription preferences.
          </p>
          <div className="mt-6">
            <Link
              to="/register"
              className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
