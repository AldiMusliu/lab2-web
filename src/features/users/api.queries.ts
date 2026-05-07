import { useQuery } from "@tanstack/react-query"

import type { User } from "@/features/users/types"
import { httpClient } from "@/lib/http-client"

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: () => [...userKeys.lists()] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (userId: string) => [...userKeys.details(), userId] as const,
}

export function getUsers() {
  return httpClient.get<User[]>("/users")
}

export function getUserById(userId: string) {
  return httpClient.get<User>(`/users/${userId}`)
}

export function useUsers() {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: getUsers,
  })
}

export function useUser(userId: string) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUserById(userId),
    enabled: Boolean(userId),
  })
}
