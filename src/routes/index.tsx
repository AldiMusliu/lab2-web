import { PublicLayout } from "@/components/layouts/public-layout"
import { createFileRoute, Link } from "@tanstack/react-router"
import {
  BookCopy,
  BookMarked,
  Clock3,
  LibraryBig,
  Search,
  ShieldCheck,
  Tags,
  UserRound,
} from "lucide-react"

const collectionCards = [
  {
    title: "Book catalog",
    description:
      "Present the library collection in one place so readers can discover what the system offers.",
    icon: BookCopy,
  },
  {
    title: "Category shelves",
    description:
      "Organize books by category to make searching and browsing easier for everyone.",
    icon: Tags,
  },
  {
    title: "Borrowing history",
    description:
      "Track what has been borrowed, what is active, and what should be returned next.",
    icon: BookMarked,
  },
] as const

const serviceCards = [
  {
    title: "Browse and search",
    description:
      "Public visitors and members can explore titles, discover categories, and understand the collection quickly.",
    icon: Search,
  },
  {
    title: "Borrow and return",
    description:
      "The platform supports the full borrowing flow, from selecting a book to tracking its return status.",
    icon: Clock3,
  },
  {
    title: "Protected member area",
    description:
      "After login, users reach profile, dashboard, books, categories, and borrowings in a protected workspace.",
    icon: UserRound,
  },
  {
    title: "Admin operations",
    description:
      "Administrators get a more CRM-like layout with a sidebar for managing the library system.",
    icon: ShieldCheck,
  },
] as const

const roleCards = [
  {
    title: "User role",
    description:
      "Readers can browse books, search categories, borrow titles, return them, and review personal borrowing history.",
  },
  {
    title: "Admin role",
    description:
      "Admins manage catalog structure, categories, borrowing records, and the broader library workflow from a dedicated layout.",
  },
] as const

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PublicLayout>
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
                returning them, and managing everything with clear user and
                admin roles.
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

      <section
        id="collection"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            Collection
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Built around the way a library actually works.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Instead of a generic landing page, this public view now speaks about
            books, categories, borrowing, and the library experience itself.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {collectionCards.map((card) => {
            const Icon = card.icon

            return (
              <article
                key={card.title}
                className="rounded-3xl border border-border/70 bg-background p-5 shadow-sm"
              >
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      <section
        id="services"
        className="border-y border-border/50 bg-background/[0.65]"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
              Services
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Readers and librarians each get the tools they need.
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              The app is structured to support both the member journey and the
              admin workflow inside the same library system.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((card) => {
              const Icon = card.icon

              return (
                <article
                  key={card.title}
                  className="rounded-3xl border border-border/70 bg-secondary p-5 shadow-sm"
                >
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section
        id="roles"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            Roles
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Two static roles are ready for the protected area right now.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            `user` keeps the current member-style top layout, while `admin`
            opens a more CRM-like interface with sidebar navigation.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {roleCards.map((role) => (
            <article
              key={role.title}
              className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                {role.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {role.description}
              </p>
            </article>
          ))}
        </div>
      </section>

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
    </PublicLayout>
  )
}
