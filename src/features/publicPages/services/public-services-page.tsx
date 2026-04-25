import {
  serviceCards,
  serviceFlow,
  serviceHours,
  servicesHero,
  servicesSectionIntro,
  servicesSnapshot,
  type ServiceIcon,
} from "@/mocks/mockup-data/public-pages/services"
import {
  BookCheck,
  BookCopy,
  CalendarClock,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  "book-check": BookCheck,
  "book-copy": BookCopy,
  "calendar-clock": CalendarClock,
  "shield-check": ShieldCheck,
}

export function PublicServicesPage() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-88 bg-[radial-gradient(circle_at_90%_0%,rgba(22,163,74,0.2),transparent_34%),radial-gradient(circle_at_20%_10%,rgba(2,132,199,0.14),transparent_42%)]" />

      <section className="relative border-b border-border/60">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-22">
          <p className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            {servicesHero.badge}
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {servicesHero.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {servicesHero.description}
              </p>
            </div>

            <div className="rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-lg shadow-primary/5">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="size-4" />
                <p className="text-sm font-semibold tracking-[0.12em] uppercase">
                  {servicesSnapshot.title}
                </p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {servicesSnapshot.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-border/70 bg-secondary p-4"
                  >
                    <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-foreground">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-secondary/55">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {servicesSectionIntro.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {servicesSectionIntro.description}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {serviceCards.map((service) => {
              const Icon = serviceIcons[service.icon]
              return (
                <article
                  key={service.title}
                  className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <p className="mt-3 text-xs font-semibold tracking-[0.12em] text-primary uppercase">
                    Best for: {service.audience}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {serviceFlow.title}
            </h2>
            <ol className="mt-6 space-y-4">
              {serviceFlow.steps.map((item) => (
                <li
                  key={item.step}
                  className="rounded-2xl border border-border/70 bg-card p-5"
                >
                  <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                    Step {item.step}
                  </p>
                  <p className="mt-1 text-base font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="rounded-[2rem] border border-border/70 bg-secondary p-6">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {serviceHours.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {serviceHours.description}
            </p>

            <dl className="mt-5 space-y-3 text-sm">
              {serviceHours.slots.map((slot) => (
                <div
                  key={slot.label}
                  className="flex items-center justify-between rounded-xl border border-border/70 bg-card px-4 py-3"
                >
                  <dt className="text-muted-foreground">{slot.label}</dt>
                  <dd className="font-semibold text-foreground">
                    {slot.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>
    </div>
  )
}
