import type { Profile } from "@/features/profile/types"
import { profileSchema } from "@/features/profile/schemas"
import { httpClient } from "@/lib/http-client"

export const profileKeys = {
  all: ["profile"] as const,
  me: () => [...profileKeys.all, "me"] as const,
}

export async function getProfile() {
  const profile = await httpClient.get<unknown>("/profile/me")

  return profileSchema.parse(profile) satisfies Profile
}

export const getMyProfile = getProfile
