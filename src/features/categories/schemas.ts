import { z } from "zod"

export const upsertCategorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),
})

export type UpsertCategoryFormValues = z.infer<typeof upsertCategorySchema>

export const defaultCategoryFormValues: UpsertCategoryFormValues = {
  name: "",
}

export function formValuesToCategoryInput(values: UpsertCategoryFormValues) {
  return {
    name: values.name.trim(),
  }
}
