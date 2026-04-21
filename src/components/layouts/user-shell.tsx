import type { ReactNode } from "react"

import { Footer } from "@/components/layouts/footer"
import { Navbar } from "@/components/layouts/navbar"

type UserShellProps = {
  title?: string
  subtitle?: string
  children: ReactNode
}

export function UserShell({ title, subtitle, children }: UserShellProps) {
  return (
    <div className="flex min-h-svh flex-col bg-secondary">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
        {title ? (
          <section className="mb-6 rounded-3xl border bg-card px-5 py-6 text-card-foreground shadow-sm">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {subtitle}
              </p>
            ) : null}
          </section>
        ) : null}

        <div className="flex-1">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
