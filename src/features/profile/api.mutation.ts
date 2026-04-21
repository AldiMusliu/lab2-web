import { httpClient } from "@/services/http-client"
import type { Profile, UpdateProfileInput } from "@/features/profile/types"

export function updateMyProfile(payload: UpdateProfileInput) {
  return httpClient.put<Profile>("/profile/me", payload)
}
