import { z } from "zod"

import type {
  CreateUserBody,
  UpdateUserBody,
  User,
} from "@/features/users/types"

export const userRoleOptions = [
  { label: "User", value: "user" },
  { label: "Admin", value: "admin" },
] satisfies Array<{ label: string; value: "admin" | "user" }>

const userRoleSchema = z.enum(["admin", "user"])

export const createUserSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: userRoleSchema,
})

export const updateUserSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email"),
  password: z
    .union([
      z.string().min(8, "Password must be at least 8 characters"),
      z.literal(""),
    ])
    .optional(),
  role: userRoleSchema,
})

export const resetUserPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export type CreateUserFormValues = z.infer<typeof createUserSchema>
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>
export type ResetUserPasswordFormValues = z.infer<
  typeof resetUserPasswordSchema
>

export const defaultCreateUserValues: CreateUserFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "user",
}

export function toUpdateUserValues(user: User): UpdateUserFormValues {
  return {
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.email,
    password: "",
    role: user.role,
  }
}

export const defaultResetUserPasswordValues: ResetUserPasswordFormValues = {
  password: "",
}

export function createFormValuesToUserBody(
  values: CreateUserFormValues
): CreateUserBody {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim(),
    password: values.password,
    role: values.role,
  }
}

export function updateFormValuesToUserBody(
  values: UpdateUserFormValues
): UpdateUserBody {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim(),
    role: values.role,
    ...(values.password ? { password: values.password } : {}),
  }
}

export function resetPasswordValuesToUserBody(
  user: User,
  values: ResetUserPasswordFormValues
): UpdateUserBody {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    password: values.password,
  }
}
