import { httpClient } from "@/lib/http-client"
import type {
  Profile,
  UpdatePasswordInput,
  UpdateProfileInput,
} from "@/features/profile/types"

export function updateMyProfile(payload: UpdateProfileInput) {
  return httpClient.put<Profile>("/profile/me", payload)
}

export function updateMyPassword(payload: UpdatePasswordInput) {
  return httpClient.put<void>("/profile/me/password", payload)
}
