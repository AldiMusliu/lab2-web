import { Link, useLocation } from "@tanstack/react-router"
import {
  BookCheck,
  BookCopy,
  House,
  LayoutDashboard,
  LibraryBig,
  Tags,
  UserRound,
} from "lucide-react"

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
  const location = useLocation()

  return (
    <header className="border-b border-border/70 bg-background/90 backdrop-blur-xl supports-backdrop-filter:bg-background/75">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-wrap items-center justify-between gap-4 pb-4">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/65 to-transparent" />
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
                Management workspace
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground md:flex">
            <span
              className="size-2 rounded-full bg-primary"
              aria-hidden="true"
            />
            <span>Library operations desk</span>
          </div>
        </div>

        <nav className="overflow-x-auto pb-1" aria-label="Primary navigation">
          <ul className="flex min-w-max items-center gap-1.5 rounded-2xl border border-border/70 bg-muted/30 p-1.5">
            {navigationItems.map((item) => {
              const isActive =
                item.to === "/"
                  ? location.pathname === item.to
                  : location.pathname.startsWith(item.to)
              const Icon = item.icon

              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "group flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all",
                      "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:outline-none",
                      isActive
                        ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                        : "text-muted-foreground hover:bg-background/80 hover:text-foreground"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4 transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-primary"
                      )}
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
