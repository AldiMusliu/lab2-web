import { Link } from "@tanstack/react-router"
import {
  aboutUsCta,
  aboutUsGuide,
  aboutUsHero,
  aboutUsJourney,
  aboutUsMilestones,
  aboutUsStats,
  aboutUsValues,
  type AboutUsValueIcon,
} from "@/mocks/mockup-data/public-pages/about-us"
import {
  BookMarked,
  HandHeart,
  LibraryBig,
  MapPinned,
  type LucideIcon,
  Users,
} from "lucide-react"

const valueIcons: Record<AboutUsValueIcon, LucideIcon> = {
  "book-marked": BookMarked,
  "hand-heart": HandHeart,
  users: Users,
}

export function PublicAboutUsPage() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_15%_10%,rgba(56,189,248,0.24),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(2,132,199,0.2),transparent_34%)]" />

      <section className="relative border-b border-border/60">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
              {aboutUsHero.badge}
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {aboutUsHero.title}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {aboutUsHero.description}
              </p>
            </div>

            <div className="grid gap-3 sm:max-w-xl sm:grid-cols-3">
              {aboutUsStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/70 bg-card p-4"
                >
                  <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-lg shadow-primary/5">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <LibraryBig className="size-5" />
              </span>
              <div>
                <p className="text-lg font-semibold tracking-tight text-foreground">
                  {aboutUsJourney.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {aboutUsJourney.description}
                </p>
              </div>
            </div>

            <ol className="mt-6 space-y-4">
              {aboutUsMilestones.map((item) => (
                <li
                  key={item.year}
                  className="rounded-2xl border border-border/70 bg-secondary p-4"
                >
                  <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                    {item.year}
                  </p>
                  <p className="mt-1 text-base font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.note}
                  </p>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="border-b border-border/60 bg-secondary/65">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {aboutUsGuide.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {aboutUsGuide.description}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-primary uppercase">
              <MapPinned className="size-3.5" />
              {aboutUsGuide.districtBadge}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {aboutUsValues.map((value) => {
              const Icon = valueIcons[value.icon]
              return (
                <article
                  key={value.title}
                  className="h-full rounded-3xl border border-border/70 bg-card p-6 shadow-sm"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {aboutUsCta.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {aboutUsCta.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/services"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {aboutUsCta.primaryLabel}
            </Link>
            <Link
              to="/our-mission"
              className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              {aboutUsCta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
