import type { ReactNode } from "react"
import { useState } from "react"
import { Link, useLocation } from "@tanstack/react-router"
import { ChevronLeft, ChevronRight, LibraryBig, Menu } from "lucide-react"

import { MobileSlidePanel } from "@/components/layouts/mobile-slide-panel"
import { protectedNavigationItems } from "@/components/layouts/protected-navigation"
import { ProtectedRoleSwitch } from "@/components/layouts/protected-role-switch"
import { cn } from "@/lib/utils"

type AdminShellProps = {
  title?: string
  subtitle?: string
  children: ReactNode
}

export function AdminShell({ title, subtitle, children }: AdminShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()

  const navigation = (
    <nav aria-label="Admin navigation" className="space-y-2">
      {protectedNavigationItems.map((item) => {
        const isActive = location.pathname.startsWith(item.to)
        const Icon = item.icon

        return (
          <Link
            key={item.to}
            to={item.to}
            title={item.label}
            aria-label={item.label}
            onClick={() => setMobileNavOpen(false)}
            className={cn(
              "flex items-start gap-3 rounded-2xl px-4 py-3 text-sm transition-colors",
              sidebarCollapsed && "justify-center px-3",
              isActive
                ? "bg-white text-slate-950 shadow-sm"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            )}
          >
            <Icon
              className={cn(
                "mt-0.5 size-4 shrink-0",
                sidebarCollapsed && "mt-0",
                isActive ? "text-primary" : "text-white/70"
              )}
            />
            {!sidebarCollapsed ? (
              <span>
                <span className="block font-semibold">{item.label}</span>
                <span
                  className={cn(
                    "block text-xs",
                    isActive ? "text-slate-500" : "text-white/60"
                  )}
                >
                  {item.description}
                </span>
              </span>
            ) : null}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="flex h-svh overflow-hidden bg-muted/[0.35]">
      <aside
        className={cn(
          "hidden shrink-0 flex-col overflow-hidden bg-primary text-primary-foreground transition-[width] duration-300 lg:flex",
          sidebarCollapsed ? "w-[5.5rem]" : "w-[19rem]"
        )}
      >
        <div
          className={cn(
            "border-b border-white/10 px-4 py-6",
            sidebarCollapsed ? "items-center" : "px-6"
          )}
        >
          <div
            className={cn(
              "flex items-start justify-between gap-3",
              sidebarCollapsed && "flex-col items-center"
            )}
          >
            <Link
              to="/"
              className={cn(
                "flex items-center gap-3",
                sidebarCollapsed && "justify-center"
              )}
              title="Smart Library"
            >
              <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10">
                <LibraryBig className="size-5" />
              </div>
              {!sidebarCollapsed ? (
                <div>
                  <p className="text-base font-semibold tracking-tight">
                    Smart Library
                  </p>
                  <p className="text-xs tracking-[0.16em] text-white/70 uppercase">
                    Admin workspace
                  </p>
                </div>
              ) : null}
            </Link>

            <button
              type="button"
              onClick={() => setSidebarCollapsed((value) => !value)}
              className="inline-flex rounded-xl border border-white/15 bg-white/10 p-2 text-primary-foreground transition-colors hover:bg-white/15"
              aria-label={sidebarCollapsed ? "Open sidebar" : "Close sidebar"}
              title={sidebarCollapsed ? "Open sidebar" : "Close sidebar"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="size-4" />
              ) : (
                <ChevronLeft className="size-4" />
              )}
            </button>
          </div>

          {!sidebarCollapsed ? (
            <div className="mt-5 space-y-2">
              <p className="text-xs font-semibold tracking-[0.16em] text-white/70 uppercase">
                Demo role
              </p>
              <ProtectedRoleSwitch tone="primary" />
            </div>
          ) : null}
        </div>

        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto py-5",
            sidebarCollapsed ? "px-2" : "px-4"
          )}
        >
          {navigation}
        </div>

        {!sidebarCollapsed ? (
          <div className="border-t border-white/10 px-6 py-5 text-sm text-white/70">
            CRM-style admin layout for managing catalog and operations.
          </div>
        ) : (
          <div className="border-t border-white/10 px-2 py-4" />
        )}
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-30 border-b bg-background/[0.92] backdrop-blur">
          <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                className="mt-0.5 inline-flex rounded-2xl border border-border bg-background p-2.5 text-foreground transition-colors hover:bg-muted lg:hidden"
                aria-label="Open admin navigation"
              >
                <Menu className="size-5" />
              </button>

              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                  Admin panel
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                  {title ?? "Dashboard"}
                </h1>
                {subtitle ? (
                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="hidden lg:block">
              <ProtectedRoleSwitch />
            </div>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto bg-secondary p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      <MobileSlidePanel
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        title="Admin navigation"
        description="Switch sections and test the static demo roles."
        side="left"
        className="border-white/10 bg-primary text-primary-foreground"
      >
        <div className="space-y-5">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-white/70 uppercase">
              Demo role
            </p>
            <ProtectedRoleSwitch tone="primary" />
          </div>

          <nav aria-label="Admin mobile navigation" className="space-y-2">
            {protectedNavigationItems.map((item) => {
              const isActive = location.pathname.startsWith(item.to)
              const Icon = item.icon

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileNavOpen(false)}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl px-4 py-3 text-sm transition-colors",
                    isActive
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      isActive ? "text-primary" : "text-white/70"
                    )}
                  />
                  <span>
                    <span className="block font-semibold">{item.label}</span>
                    <span
                      className={cn(
                        "block text-xs",
                        isActive ? "text-slate-500" : "text-white/60"
                      )}
                    >
                      {item.description}
                    </span>
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>
      </MobileSlidePanel>
    </div>
  )
}
