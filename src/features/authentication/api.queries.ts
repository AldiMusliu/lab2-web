import { httpClient } from "@/lib/http-client"
import type { AuthUser } from "@/features/authentication/types"

export function getCurrentUser() {
  return httpClient.get<AuthUser>("/auth/me")
}
