import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { BookOpenText, LibraryBig, Menu } from "lucide-react"

import { MobileSlidePanel } from "@/components/layouts/mobile-slide-panel"

const publicNavigationItems = [
  { href: "/#collection", label: "Collection" },
  { href: "/#services", label: "Services" },
  { href: "/#roles", label: "Roles" },
] as const

export function PublicNavbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-primary/70 bg-primary text-primary-foreground shadow-sm">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 text-primary-foreground"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10 text-primary-foreground">
              <LibraryBig className="size-5" />
            </span>
            <span>
              <strong className="block text-sm leading-tight tracking-tight sm:text-base">
                Smart Library
              </strong>
              <span className="block text-xs text-primary-foreground/75">
                Library portal
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="inline-flex rounded-full border border-white/20 bg-white/10 p-2 text-primary-foreground transition-colors hover:bg-white/20 sm:hidden"
              aria-label="Open mobile menu"
            >
              <Menu className="size-4" />
            </button>
            <Link
              to="/login"
              className="hidden rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-white/20 sm:inline-flex"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hidden items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary transition-opacity hover:opacity-90 sm:inline-flex"
            >
              <BookOpenText className="size-4" />
              Join now
            </Link>
          </div>
        </div>

        <nav
          aria-label="Public navigation"
          className="mt-3 hidden overflow-x-auto pb-1 md:mt-4 sm:block"
        >
          <ul className="flex min-w-max items-center gap-2">
            {publicNavigationItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <MobileSlidePanel
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        title="Library menu"
        description="Move through the public library sections."
        side="right"
        className="border-white/10 bg-primary text-primary-foreground"
      >
        <div className="space-y-6">
          <nav className="space-y-2">
            {publicNavigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className="block rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-primary-foreground/90 transition-colors hover:bg-white/20 hover:text-primary-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="grid gap-2">
            <Link
              to="/login"
              onClick={() => setMobileNavOpen(false)}
              className="inline-flex justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-white/20"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileNavOpen(false)}
              className="inline-flex justify-center rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
            >
              Join now
            </Link>
          </div>
        </div>
      </MobileSlidePanel>
    </header>
  )
}
