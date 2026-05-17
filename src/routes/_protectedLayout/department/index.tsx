import { DepartmentsFeature } from '@/features/departments/departments.feature'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protectedLayout/department/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DepartmentsFeature />
}
