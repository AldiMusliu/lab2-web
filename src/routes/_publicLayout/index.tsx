import { PublicHomeCollection } from "@/features/publicPages/home/public-home-collection"
import { PublicHomeCta } from "@/features/publicPages/home/public-home-cta"
import { PublicHomeHero } from "@/features/publicPages/home/public-home-hero"
import { PublicHomeRoles } from "@/features/publicPages/home/public-home-roles"
import { PublicHomeServices } from "@/features/publicPages/home/public-home-services"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_publicLayout/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PublicHomeHero />
      <PublicHomeCollection />
      <PublicHomeServices />
      <PublicHomeRoles />
      <PublicHomeCta />
    </>
  )
}
