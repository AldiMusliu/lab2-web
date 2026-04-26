export type AuthUser = {
  id: string
  fullName: string
  email: string
  role: "admin" | "user"
}

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  fullName: string
  email: string
  password: string
}

export type AuthTokenResponse = {
  accessToken: string
  refreshToken?: string
  user: AuthUser
}
