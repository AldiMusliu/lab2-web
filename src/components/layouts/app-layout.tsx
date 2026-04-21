import type { ReactNode } from "react"

import { AdminShell } from "@/components/layouts/admin-shell"
import { UserShell } from "@/components/layouts/user-shell"
import { useSessionStore } from "@/stores/session.store"

type AppLayoutProps = {
  title?: string
  subtitle?: string
  children: ReactNode
}

export function AppLayout({ title, subtitle, children }: AppLayoutProps) {
  const role = useSessionStore((state) => state.role)

  if (role === "admin") {
    return (
      <AdminShell title={title} subtitle={subtitle}>
        {children}
      </AdminShell>
    )
  }

  return (
    <UserShell title={title} subtitle={subtitle}>
      {children}
    </UserShell>
  )
}
