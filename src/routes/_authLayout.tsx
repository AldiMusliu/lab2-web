import { createFileRoute, Outlet } from "@tanstack/react-router"
import Lottie from "lottie-react"
import authAnimation from "@/lotties/books.json"

export const Route = createFileRoute("/_authLayout")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid min-h-svh bg-secondary lg:grid-cols-2">
      <section className="hidden border-r border-border/60 bg-linear-to-br from-primary/10 via-background to-background p-10 lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.12em] text-primary uppercase">
            Smart Library
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-foreground">
            Public browsing first, protected actions when you sign in.
          </h1>
        </div>
        <div className="flex justify-center">
          <Lottie animationData={authAnimation} className="size-[400px]" />
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Explore the catalog on public pages, then continue to borrowing and
          profile management in the protected workspace.
        </p>
      </section>

      <section className="flex items-center justify-center bg-primary px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full">
          <Outlet />
        </div>
      </section>
    </div>
  )
}
