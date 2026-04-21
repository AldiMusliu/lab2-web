import { httpClient } from "@/lib/http-client"
import type {
  AuthTokenResponse,
  LoginRequest,
  RegisterRequest,
} from "@/features/authentication/types"

export function login(payload: LoginRequest) {
  return httpClient.post<AuthTokenResponse>("/auth/login", payload)
}

export function register(payload: RegisterRequest) {
  return httpClient.post<AuthTokenResponse>("/auth/register", payload)
}

export function logout() {
  return httpClient.post<void>("/auth/logout")
}
