import { Link } from "@tanstack/react-router"

const footerLinks = [
  { href: "/#collection", label: "Collection" },
  { href: "/#services", label: "Services" },
  { href: "/#roles", label: "Roles" },
] as const

export function PublicFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-primary/70 bg-primary text-primary-foreground">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <section className="space-y-3">
          <p className="text-base font-semibold tracking-tight">
            Smart Library
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/80">
            Welcome readers, guide members, and present the digital library in a
            way that feels like part of the institution itself.
          </p>
        </section>

        <section className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.08em] uppercase">
            Explore
          </p>
          <ul className="space-y-2">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.08em] uppercase">
            Account
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/login"
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-white/20"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
            >
              Create account
            </Link>
          </div>
        </section>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 text-xs text-primary-foreground/70 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>(c) {currentYear} Smart Library</p>
          <p>Library discovery outside, protected operations inside</p>
        </div>
      </div>
    </footer>
  )
}
