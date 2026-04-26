import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2, Plus, Save, X } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import type { Category } from "@/features/categories/types"
import {
  createCategory,
  updateCategory,
} from "@/features/categories/api.mutation"
import {
  defaultCategoryFormValues,
  formValuesToCategoryInput,
  upsertCategorySchema,
  type UpsertCategoryFormValues,
} from "@/features/categories/schemas"
import { ControlledInput } from "@/components/molecules/controlled"
import { Button } from "@/components/ui/button"
import { getHttpErrorMessage } from "@/lib/http-client"
import { cn } from "@/lib/utils"

type CategoryFormProps = {
  category?: Category | null
  onCancelEdit?: () => void
  onSaved?: () => void
  variant?: "card" | "dialog"
}

export function CategoryForm({
  category,
  onCancelEdit,
  onSaved,
  variant = "card",
}: CategoryFormProps) {
  const queryClient = useQueryClient()
  const isEditing = Boolean(category)

  const form = useForm<UpsertCategoryFormValues>({
    resolver: zodResolver(upsertCategorySchema),
    defaultValues: defaultCategoryFormValues,
  })

  useEffect(() => {
    form.reset(category ? { name: category.name } : defaultCategoryFormValues)
  }, [category, form])

  const mutation = useMutation({
    mutationFn: (values: UpsertCategoryFormValues) => {
      const payload = formValuesToCategoryInput(values)

      return category
        ? updateCategory(category.id, payload)
        : createCategory(payload)
    },
    onSuccess: async (savedCategory) => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success(isEditing ? "Category updated" : "Category created", {
        description: savedCategory.name,
      })
      form.reset(defaultCategoryFormValues)
      onSaved?.()
    },
    onError: (error) => {
      toast.error("Could not save category", {
        description: getHttpErrorMessage(
          error,
          "Check the category name and try again."
        ),
      })
    },
  })

  function handleSubmit(values: UpsertCategoryFormValues) {
    mutation.mutate(values)
  }

  function handleCancelEdit() {
    form.reset(defaultCategoryFormValues)
    onCancelEdit?.()
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn(
        variant === "card" ? "rounded-lg border bg-card" : "grid gap-4"
      )}
    >
      {variant === "card" ? (
        <div className="border-b p-4">
          <h3 className="text-base font-semibold text-foreground">
            {isEditing ? "Edit category" : "Add category"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Category names are used by book forms, filters, and catalogue views.
          </p>
        </div>
      ) : null}

      <div className={cn("flex flex-col gap-4", variant === "card" && "p-4")}>
        <ControlledInput
          control={form.control}
          name="name"
          label="Category name"
          placeholder="Software Engineering"
          inputClassName="h-10"
        />
        <div className="flex flex-col-reverse justify-end gap-2 sm:flex-row">
          {isEditing || variant === "dialog" ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelEdit}
              disabled={mutation.isPending}
              className="h-10"
            >
              <X className="size-4" aria-hidden="true" />
              Cancel
            </Button>
          ) : null}
          <Button type="submit" disabled={mutation.isPending} className="h-10">
            {mutation.isPending ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : isEditing ? (
              <Save className="size-4" aria-hidden="true" />
            ) : (
              <Plus className="size-4" aria-hidden="true" />
            )}
            {mutation.isPending
              ? "Saving..."
              : isEditing
                ? "Save category"
                : "Add category"}
          </Button>
        </div>
      </div>
    </form>
  )
}
