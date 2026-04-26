import { Link } from "@tanstack/react-router"
import type { ReactNode } from "react"

type AuthEntryCardProps = {
  title: string
  description: string
  helperText: string
  helperLinkLabel: string
  helperLinkTo: "/login" | "/register"
  children: ReactNode
}

export function AuthEntryCard({
  title,
  description,
  helperText,
  helperLinkLabel,
  helperLinkTo,
  children,
}: AuthEntryCardProps) {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-7">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <div className="mt-6">{children}</div>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        {helperText}{" "}
        <Link
          to={helperLinkTo}
          className="font-semibold text-primary transition-colors hover:text-primary/80"
        >
          {helperLinkLabel}
        </Link>
      </p>
    </div>
  )
}
