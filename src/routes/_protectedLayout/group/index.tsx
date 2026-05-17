import { GroupsFeature } from '@/features/groups/groups.feature'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protectedLayout/group/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <GroupsFeature />
}
