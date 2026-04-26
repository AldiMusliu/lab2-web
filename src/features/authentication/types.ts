export type UserRole = "admin" | "user"

export type AuthUser = {
  id: string
  fullName: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
}

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type AuthResponse = {
  accessToken: string
  user: AuthUser
}

export type AuthTokenResponse = AuthResponse
