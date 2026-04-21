import { useState } from "react"
import { Link, useLocation } from "@tanstack/react-router"
import {
  BookCheck,
  BookCopy,
  House,
  LayoutDashboard,
  LibraryBig,
  Menu,
  Tags,
  UserRound,
} from "lucide-react"

import { MobileSlidePanel } from "@/components/layouts/mobile-slide-panel"
import { ProtectedRoleSwitch } from "@/components/layouts/protected-role-switch"
import { cn } from "@/lib/utils"

const navigationItems = [
  { to: "/", label: "Home", icon: House },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/books", label: "Books", icon: BookCopy },
  { to: "/categories", label: "Categories", icon: Tags },
  { to: "/borrowings", label: "Borrowings", icon: BookCheck },
  { to: "/profile", label: "Profile", icon: UserRound },
] as const

export function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const location = useLocation()

  const navigationLinks = navigationItems.map((item) => {
    const isActive =
      item.to === "/"
        ? location.pathname === item.to
        : location.pathname.startsWith(item.to)
    const Icon = item.icon

    return (
      <li key={item.to}>
        <Link
          to={item.to}
          onClick={() => setMobileNavOpen(false)}
          className={cn(
            "group flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:outline-none",
            isActive
              ? "bg-secondary text-secondary-foreground shadow-sm"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Icon
            className={cn(
              "size-4 transition-colors",
              isActive
                ? "text-secondary-foreground"
                : "text-primary-foreground group-hover:text-primary-foreground"
            )}
          />
          <span>{item.label}</span>
        </Link>
      </li>
    )
  })

  return (
    <header className="border-b border-border/70 bg-background/90 backdrop-blur-xl supports-backdrop-filter:bg-background/75">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-wrap items-center justify-between gap-4 pb-4">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent" />
          <Link
            to="/"
            className="group flex items-center gap-3 text-foreground"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary transition-transform duration-200 group-hover:-translate-y-0.5">
              <LibraryBig className="size-5" />
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight">
                Smart Library
              </p>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                User workspace
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-3 md:flex">
              <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground xl:flex">
                <span
                  className="size-2 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <span>Library member workspace</span>
              </div>
              <ProtectedRoleSwitch />
            </div>

            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="inline-flex rounded-2xl border border-border bg-background p-2.5 text-foreground transition-colors hover:bg-muted md:hidden"
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>

        <nav
          className="hidden overflow-x-auto pb-1 md:block"
          aria-label="Primary navigation"
        >
          <ul className="flex min-w-max items-center gap-1.5 rounded-2xl border border-primary/15 bg-primary p-1.5">
            {navigationLinks}
          </ul>
        </nav>
      </div>

      <MobileSlidePanel
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        title="Library navigation"
        description="Browse the protected user workspace."
        side="left"
        className="bg-background text-foreground"
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              Demo role
            </p>
            <ProtectedRoleSwitch />
          </div>

          <ul className="space-y-2">{navigationLinks}</ul>
        </div>
      </MobileSlidePanel>
    </header>
  )
}
