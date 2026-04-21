import { Link } from "@tanstack/react-router"

const footerLinks = [
  { href: "/#books", label: "Books" },
  { href: "/#contact", label: "Contact" },
  { href: "/#newsletter", label: "Newsletter" },
] as const

export function PublicFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/70 bg-muted/20">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <section className="space-y-3">
          <p className="text-base font-semibold tracking-tight text-foreground">
            Smart Library
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Browse books publicly and sign in whenever you are ready to borrow,
            reserve, or manage your activity.
          </p>
        </section>

        <section className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.08em] text-foreground uppercase">
            Explore
          </p>
          <ul className="space-y-2">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.08em] text-foreground uppercase">
            Account
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/login"
              className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Create account
            </Link>
          </div>
        </section>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {currentYear} Smart Library</p>
          <p>Public browsing, protected actions</p>
        </div>
      </div>
    </footer>
  )
}
