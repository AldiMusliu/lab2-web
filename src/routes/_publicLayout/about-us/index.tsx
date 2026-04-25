import { PublicAboutUsPage } from "@/features/publicPages/about-us/public-about-us-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_publicLayout/about-us/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <PublicAboutUsPage />
}
