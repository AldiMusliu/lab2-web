import { z } from "zod"

export const profileSchema = z.object({
  id: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
})

export const changePasswordResponseSchema = z.object({
  message: z.string().min(1),
})

export type Profile = z.infer<typeof profileSchema>
export type ChangePasswordResponse = z.infer<
  typeof changePasswordResponseSchema
>

export const updateProfileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
})

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>

export const defaultProfileFormValues: UpdateProfileFormValues = {
  firstName: "",
  lastName: "",
}

export function formValuesToProfileInput(values: UpdateProfileFormValues) {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
  }
}

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>

export const defaultPasswordFormValues: UpdatePasswordFormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

export function formValuesToPasswordInput(values: UpdatePasswordFormValues) {
  return {
    currentPassword: values.currentPassword,
    newPassword: values.newPassword,
  }
}
