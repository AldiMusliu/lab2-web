import { z } from "zod"

export const updateProfileSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
})

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>
