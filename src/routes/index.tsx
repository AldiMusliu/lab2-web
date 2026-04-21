import { PublicLayout } from "@/components/layouts/public-layout"
import { PublicHomeCollection } from "@/features/public-home/components/public-home-collection"
import { PublicHomeCta } from "@/features/public-home/components/public-home-cta"
import { PublicHomeHero } from "@/features/public-home/components/public-home-hero"
import { PublicHomeRoles } from "@/features/public-home/components/public-home-roles"
import { PublicHomeServices } from "@/features/public-home/components/public-home-services"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PublicLayout>
      <PublicHomeHero />
      <PublicHomeCollection />
      <PublicHomeServices />
      <PublicHomeRoles />
      <PublicHomeCta />
    </PublicLayout>
  )
}
