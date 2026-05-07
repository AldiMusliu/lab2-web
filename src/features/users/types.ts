import type { UserRole } from "@/features/authentication/types"

export type User = {
  id: string
  fullName?: string
  firstName?: string
  lastName?: string
  email?: string
  role: UserRole
}
