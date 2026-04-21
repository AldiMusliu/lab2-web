import { httpClient } from "@/lib/http-client"
import type { Category, UpsertCategoryInput } from "@/features/categories/types"

export function createCategory(payload: UpsertCategoryInput) {
  return httpClient.post<Category>("/categories", payload)
}

export function updateCategory(categoryId: string, payload: UpsertCategoryInput) {
  return httpClient.put<Category>(`/categories/${categoryId}`, payload)
}

export function deleteCategory(categoryId: string) {
  return httpClient.delete<void>(`/categories/${categoryId}`)
}
