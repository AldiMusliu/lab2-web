import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { QueryClient } from "@tanstack/react-query"

import { invalidateDashboardStats } from "@/features/dashboard/api.mutation"
import { userKeys } from "@/features/users/api.queries"
import type {
  CreateUserBody,
  UpdateUserBody,
  User,
} from "@/features/users/types"
import { httpClient } from "@/lib/http-client"

export function createUser(payload: CreateUserBody) {
  return httpClient.post<User>("/users", payload)
}

export function updateUser(userId: string, payload: UpdateUserBody) {
  return httpClient.put<User>(`/users/${userId}`, payload)
}

export function deleteUser(userId: string) {
  return httpClient.delete<void>(`/users/${userId}`)
}

export function invalidateUsers(queryClient: QueryClient) {
  void queryClient.invalidateQueries({ queryKey: userKeys.all })
  return invalidateDashboardStats(queryClient)
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      void invalidateUsers(queryClient)
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string
      payload: UpdateUserBody
    }) => updateUser(userId, payload),
    onSuccess: (user) => {
      void invalidateUsers(queryClient)
      queryClient.setQueryData(userKeys.detail(user.id), user)
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      void invalidateUsers(queryClient)
    },
  })
}
