import {ShkollatFeature } from '@/features/shkollat/shkollat.features'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protectedLayout/shkolla/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ShkollatFeature />
}
