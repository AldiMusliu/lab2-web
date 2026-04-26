export type Profile = {
  id: string
  fullName: string
  firstName: string
  lastName: string
  email: string
}

export type UpdateProfileInput = {
  firstName: string
  lastName: string
}

export type UpdatePasswordInput = {
  currentPassword: string
  newPassword: string
}
