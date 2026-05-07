import type {
  ChangePasswordResponse,
  Profile,
  UpdatePasswordInput,
  UpdateProfileInput,
} from "@/features/profile/types"
import {
  changePasswordResponseSchema,
  profileSchema,
} from "@/features/profile/schemas"
import { httpClient } from "@/lib/http-client"

export async function updateMyProfile(payload: UpdateProfileInput) {
  const profile = await httpClient.put<unknown>("/profile/me", payload)

  return profileSchema.parse(profile) satisfies Profile
}

export async function updateMyPassword(payload: UpdatePasswordInput) {
  const response = await httpClient.put<unknown>(
    "/profile/me/password",
    payload
  )

  return changePasswordResponseSchema.parse(
    response
  ) satisfies ChangePasswordResponse
}
