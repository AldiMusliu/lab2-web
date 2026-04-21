import type { Category } from "@/features/categories/types"
import { httpClient } from "@/lib/http-client"

export function getCategories() {
  return httpClient.get<Category[]>("/categories")
}

export function getCategoryById(categoryId: string) {
  return httpClient.get<Category>(`/categories/${categoryId}`)
}
