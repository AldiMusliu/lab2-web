import { FriendsFeature } from '@/features/friends/friends.feature'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protectedLayout/friend/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FriendsFeature />
}
