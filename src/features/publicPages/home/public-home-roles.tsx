const roleCards = [
  {
    title: "User role",
    description:
      "Readers can browse books, search categories, borrow titles, return them, and review personal borrowing history.",
  },
  {
    title: "Admin role",
    description:
      "Admins manage catalog structure, categories, borrowing records, and the broader library workflow from a dedicated layout.",
  },
] as const

export function PublicHomeRoles() {
  return (
    <section
      id="roles"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          Roles
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Two static roles are ready for the protected area right now.
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          `user` keeps the current member-style top layout, while `admin` opens
          a more CRM-like interface with sidebar navigation.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {roleCards.map((role) => (
          <article
            key={role.title}
            className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {role.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {role.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
