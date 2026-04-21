import { BookCopy, BookMarked, Tags } from "lucide-react"

const collectionCards = [
  {
    title: "Book catalog",
    description:
      "Present the library collection in one place so readers can discover what the system offers.",
    icon: BookCopy,
  },
  {
    title: "Category shelves",
    description:
      "Organize books by category to make searching and browsing easier for everyone.",
    icon: Tags,
  },
  {
    title: "Borrowing history",
    description:
      "Track what has been borrowed, what is active, and what should be returned next.",
    icon: BookMarked,
  },
] as const

export function PublicHomeCollection() {
  return (
    <section
      id="collection"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          Collection
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Built around the way a library actually works.
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Instead of a generic landing page, this public view now speaks about
          books, categories, borrowing, and the library experience itself.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {collectionCards.map((card) => {
          const Icon = card.icon

          return (
            <article
              key={card.title}
              className="rounded-3xl border border-border/70 bg-background p-5 shadow-sm"
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
    </section>
  )
}
