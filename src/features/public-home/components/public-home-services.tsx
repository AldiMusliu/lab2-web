import { Clock3, Search, ShieldCheck, UserRound } from "lucide-react"

const serviceCards = [
  {
    title: "Browse and search",
    description:
      "Public visitors and members can explore titles, discover categories, and understand the collection quickly.",
    icon: Search,
  },
  {
    title: "Borrow and return",
    description:
      "The platform supports the full borrowing flow, from selecting a book to tracking its return status.",
    icon: Clock3,
  },
  {
    title: "Protected member area",
    description:
      "After login, users reach profile, dashboard, books, categories, and borrowings in a protected workspace.",
    icon: UserRound,
  },
  {
    title: "Admin operations",
    description:
      "Administrators get a more CRM-like layout with a sidebar for managing the library system.",
    icon: ShieldCheck,
  },
] as const

export function PublicHomeServices() {
  return (
    <section
      id="services"
      className="border-y border-border/50 bg-background/[0.65]"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            Services
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Readers and librarians each get the tools they need.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            The app is structured to support both the member journey and the
            admin workflow inside the same library system.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {serviceCards.map((card) => {
            const Icon = card.icon

            return (
              <article
                key={card.title}
                className="rounded-3xl border border-border/70 bg-secondary p-5 shadow-sm"
              >
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
