import { Link } from "@tanstack/react-router"
import { ArrowUpRight } from "lucide-react"

const quickLinks = [
  { to: "/books", label: "Browse books" },
  { to: "/categories", label: "Categories" },
  { to: "/borrowings", label: "Borrowings" },
  { to: "/profile", label: "Profile" },
] as const

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-10 border-t border-border/70 bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <section className="space-y-4">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            Smart Library
          </span>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Keep shelves full and workflows calm.
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              A focused workspace for cataloging books, organizing categories,
              and tracking every borrowing journey from checkout to return.
            </p>
          </div>
        </section>

        <section className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-[0.12em] text-foreground/85 uppercase">
              Navigation
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="size-3.5 opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-[0.12em] text-foreground/85 uppercase">
              Build
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>TanStack Start architecture</li>
              <li>Feature-based modules</li>
              <li>Reusable design system primitives</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="border-t border-border/70 bg-muted/20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {currentYear} Smart Library Management System</p>
          <p>Designed for fast catalog and borrowing operations</p>
        </div>
      </div>
    </footer>
  )
}
