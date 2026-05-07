import type { UserRole } from "@/features/authentication/types"

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export type CreateUserBody = {
  firstName: string
  lastName: string
  email: string
  password: string
  role: UserRole
}

export type UpdateUserBody = {
  firstName: string
  lastName: string
  email: string
  role: UserRole
  password?: string
}
