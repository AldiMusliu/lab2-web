export type {
  ChangePasswordResponse,
  Profile,
} from "@/features/profile/schemas"

export type UpdateProfileInput = {
  firstName: string
  lastName: string
}

export type UpdatePasswordInput = {
  currentPassword: string
  newPassword: string
}
