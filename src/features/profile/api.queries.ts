import type { Profile } from "@/features/profile/types"
import { httpClient } from "@/services/http-client"

export function getMyProfile() {
  return httpClient.get<Profile>("/profile/me")
}
