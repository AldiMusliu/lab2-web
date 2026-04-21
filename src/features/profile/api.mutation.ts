import { httpClient } from "@/lib/http-client"
import type { Profile, UpdateProfileInput } from "@/features/profile/types"

export function updateMyProfile(payload: UpdateProfileInput) {
  return httpClient.put<Profile>("/profile/me", payload)
}
