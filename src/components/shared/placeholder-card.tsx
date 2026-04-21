type PlaceholderCardProps = {
  title: string
  description: string
}

export function PlaceholderCard({ title, description }: PlaceholderCardProps) {
  return (
    <section className="rounded-xl border bg-card p-5 text-card-foreground">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </section>
  )
}
