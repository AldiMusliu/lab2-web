import { Link } from "@tanstack/react-router"
import { BookOpenText, LibraryBig } from "lucide-react"

const publicNavigationItems = [
  { href: "/#books", label: "Books" },
  { href: "/#contact", label: "Contact" },
  { href: "/#newsletter", label: "Newsletter" },
] as const

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 text-foreground">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LibraryBig className="size-5" />
            </span>
            <span>
              <strong className="block text-sm leading-tight tracking-tight sm:text-base">
                Smart Library
              </strong>
              <span className="block text-xs text-muted-foreground">
                Discover and borrow with ease
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hidden items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
            >
              <BookOpenText className="size-4" />
              Join now
            </Link>
          </div>
        </div>

        <nav
          aria-label="Public navigation"
          className="mt-3 overflow-x-auto pb-1 md:mt-4"
        >
          <ul className="flex min-w-max items-center gap-2">
            {publicNavigationItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex rounded-full border border-border/80 bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
