import type { ReactNode } from "react"

import { PublicFooter } from "@/components/layouts/public-footer"
import { PublicNavbar } from "@/components/layouts/public-navbar"

type PublicLayoutProps = {
  children: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  )
}
