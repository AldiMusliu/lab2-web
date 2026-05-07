import { useCallback, useMemo } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Loader2, Plus, Tags } from "lucide-react"
import { toast } from "sonner"

import type { Category } from "@/features/categories/types"
import { CategoryForm } from "@/features/categories/_components/category-form"
import { columns } from "@/features/categories/_components/columns"
import { deleteCategory } from "@/features/categories/api.mutation"
import { getCategories } from "@/features/categories/api.queries"
import { invalidateDashboardStats } from "@/features/dashboard/api.mutation"
import { DataTable } from "@/components/molecules/data-table"
import { NoData } from "@/components/molecules/no-data"
import { Button } from "@/components/ui/button"
import { getHttpErrorMessage } from "@/lib/http-client"
import { useSessionStore } from "@/stores/session.store"
import { useUiStore } from "@/stores/ui.store"

export function CategoriesPage() {
  const queryClient = useQueryClient()
  const role = useSessionStore((state) => state.role)
  const openGlobalDialog = useUiStore((state) => state.openGlobalDialog)
  const closeGlobalDialog = useUiStore((state) => state.closeGlobalDialog)
  const isAdmin = role === "admin"

  const {
    data: categories = [],
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] })
      await invalidateDashboardStats(queryClient)
      toast.success("Category deleted")
    },
    onError: (error) => {
      toast.error("Could not delete category", {
        description: getHttpErrorMessage(
          error,
          "This category may still be used by books."
        ),
      })
    },
  })

  const openCategoryDialog = useCallback(
    (category?: Category) => {
      openGlobalDialog({
        title: category ? "Edit category" : "Add category",
        description:
          "Category names are used by book forms, filters, and catalogue views.",
        hideFooter: true,
        children: (
          <CategoryForm
            category={category}
            variant="dialog"
            onCancelEdit={closeGlobalDialog}
            onSaved={closeGlobalDialog}
          />
        ),
      })
    },
    [closeGlobalDialog, openGlobalDialog]
  )

  const actions = useMemo(
    () =>
      isAdmin
        ? {
            edit: (category: Category) => {
              openCategoryDialog(category)
            },
            delete: (category: Category) => {
              openGlobalDialog({
                title: "Delete category",
                description: `Delete "${category.name}" from the catalogue?`,
                confirmLabel: "Delete",
                cancelLabel: "Cancel",
                onConfirm: async () => {
                  await deleteMutation.mutateAsync(category.id)
                },
              })
            },
          }
        : undefined,
    [deleteMutation, isAdmin, openCategoryDialog, openGlobalDialog]
  )

  if (isLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center rounded-lg border bg-card">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          Categories unavailable
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We could not load category records.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => void refetch()}
          className="mt-5"
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-col gap-4">
      <div className="shrink-0 rounded-lg border bg-card p-4">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Tags className="size-5 text-primary" aria-hidden="true" />
              <h2 className="text-xl font-semibold tracking-tight">
                Category data
              </h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Organize catalogue records for browsing, filtering, and book
              forms.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <p className="w-fit rounded-lg border bg-muted px-3 py-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {categories.length}
              </span>{" "}
              categories
            </p>
            {isAdmin ? (
              <Button
                type="button"
                onClick={() => openCategoryDialog()}
                className="h-10"
              >
                <Plus className="size-4" aria-hidden="true" />
                Add category
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <DataTable
        actions={actions}
        columns={columns}
        data={categories}
        initialPageSize={10}
        paginationEndPosition
        notFoundText={
          <NoData
            title="No categories found"
            description={
              isAdmin
                ? "Add a category to start organizing the catalogue."
                : "Categories will appear here when the catalogue is configured."
            }
          />
        }
        tableId="/categories"
      />
    </div>
  )
}
