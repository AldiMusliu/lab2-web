import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { ArrowLeft, ImageUp, Loader2, Save, ShieldAlert } from "lucide-react"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { ChangeEvent } from "react"

import type { UpsertBookFormValues } from "@/features/books/schemas"
import type { BookFormat } from "@/features/books/types"
import { bookCoverTones, bookFormats } from "@/features/books/types"
import { createBook, updateBook } from "@/features/books/api.mutation"
import { bookKeys, getBookById } from "@/features/books/api.queries"
import { invalidateDashboardStats } from "@/features/dashboard/api.mutation"
import {
  createCoverImagePath,
  registerLocalBookCoverPreview,
  resolveBookCoverImageSrc,
} from "@/features/books/cover-image"
import { getCategories } from "@/features/categories/api.queries"
import {
  bookToFormValues,
  defaultBookFormValues,
  formValuesToBookInput,
  upsertBookSchema,
} from "@/features/books/schemas"
import {
  ControlledCheckbox,
  ControlledInput,
  ControlledSelect,
  ControlledTextarea,
} from "@/components/molecules/controlled"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getHttpErrorMessage } from "@/lib/http-client"
import { cn } from "@/lib/utils"
import { useSessionStore } from "@/stores/session.store"

const coverToneClassNames = {
  amber: "bg-amber-500",
  cyan: "bg-cyan-500",
  emerald: "bg-emerald-500",
  fuchsia: "bg-fuchsia-500",
  indigo: "bg-indigo-500",
  lime: "bg-lime-500",
  orange: "bg-orange-500",
  rose: "bg-rose-500",
  sky: "bg-sky-500",
  slate: "bg-slate-500",
  teal: "bg-teal-500",
  violet: "bg-violet-500",
} satisfies Record<(typeof bookCoverTones)[number], string>

function BooksForm({ id }: { id?: string }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const role = useSessionStore((state) => state.role)
  const isAdmin = role === "admin"
  const isEditing = Boolean(id)

  const form = useForm<UpsertBookFormValues>({
    resolver: zodResolver(upsertBookSchema),
    defaultValues: defaultBookFormValues,
  })

  const {
    data: book,
    isError,
    isLoading,
  } = useQuery({
    queryKey: bookKeys.detail(id ?? ""),
    queryFn: () => getBookById(id!),
    enabled: isEditing && isAdmin,
  })

  const {
    data: categories = [],
    isError: categoriesIsError,
    isLoading: categoriesLoading,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    enabled: isAdmin,
  })

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categories]
  )

  const coverToneOptions = useMemo(
    () =>
      bookCoverTones.map((tone) => ({
        label: (
          <span className="inline-flex items-center gap-2">
            <span
              className={cn(
                "size-3 rounded-full ring-1 ring-black/10",
                coverToneClassNames[tone]
              )}
              aria-hidden="true"
            />
            <span className="capitalize">{tone}</span>
          </span>
        ),
        value: tone,
      })),
    []
  )

  useEffect(() => {
    if (book) {
      form.reset(bookToFormValues(book))
    }
  }, [book, form])

  const mutation = useMutation({
    mutationFn: (values: UpsertBookFormValues) => {
      const payload = formValuesToBookInput(values)

      return isEditing ? updateBook(id!, payload) : createBook(payload)
    },
    onSuccess: async (savedBook) => {
      await queryClient.invalidateQueries({ queryKey: bookKeys.all })
      await invalidateDashboardStats(queryClient)
      queryClient.setQueryData(bookKeys.detail(savedBook.id), savedBook)
      toast.success(isEditing ? "Book updated" : "Book added", {
        description: savedBook.title,
      })
      navigate({
        to: "/books/$id",
        params: { id: savedBook.id },
      })
    },
    onError: (error) => {
      toast.error("Could not save book", {
        description: getHttpErrorMessage(
          error,
          "Check the form fields and try again."
        ),
      })
    },
  })

  const selectedFormats = form.watch("formats")
  const selectedCoverImage = form.watch("coverImage")
  const availableCopiesValue = form.watch("availableCopies")
  const totalCopiesValue = form.watch("totalCopies")
  const availableCopies = Number(availableCopiesValue)
  const totalCopies = Number(totalCopiesValue)
  const hasCopyTotalConflict =
    availableCopiesValue.trim().length > 0 &&
    totalCopiesValue.trim().length > 0 &&
    Number.isFinite(availableCopies) &&
    Number.isFinite(totalCopies) &&
    availableCopies > totalCopies
  const formatError = form.formState.errors.formats?.message
  const coverImageError = form.formState.errors.coverImage?.message
  const selectedCoverImageSrc = selectedCoverImage
    ? resolveBookCoverImageSrc(selectedCoverImage)
    : ""

  function toggleFormat(format: BookFormat) {
    const nextFormats = selectedFormats.includes(format)
      ? selectedFormats.filter((item) => item !== format)
      : [...selectedFormats, format]

    form.setValue("formats", nextFormats, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  function handleSubmit(values: UpsertBookFormValues) {
    if (hasCopyTotalConflict) {
      return
    }

    mutation.mutate(values)
  }

  function handleCoverImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file")
      event.target.value = ""
      return
    }

    const coverImagePath = createCoverImagePath(file)

    registerLocalBookCoverPreview(coverImagePath, file)
    form.setValue("coverImage", coverImagePath, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  if (!isAdmin) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <ShieldAlert className="mx-auto size-10 text-muted-foreground" />
        <h2 className="mt-3 text-lg font-semibold text-foreground">
          Admin access required
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Book records can be created and edited only from an admin session.
        </p>
        <Link
          to="/books"
          className={cn(buttonVariants({ variant: "outline" }), "mt-5")}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to books
        </Link>
      </div>
    )
  }

  if (isLoading || categoriesLoading) {
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
          Book not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This record may have been moved or removed.
        </p>
        <Link
          to="/books"
          className={cn(buttonVariants({ variant: "outline" }), "mt-5")}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to book data
        </Link>
      </div>
    )
  }

  if (categoriesIsError) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          Categories unavailable
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Categories are required before saving a book record.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => void refetchCategories()}
          className="mt-5"
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-3 rounded-lg border bg-card p-4 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            {isEditing ? "Edit book" : "Add book"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the catalogue, availability, access, and discovery fields.
          </p>
        </div>
        <Link
          to="/books"
          className={cn(buttonVariants({ variant: "outline" }), "h-10")}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to books
        </Link>
      </div>

      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="rounded-lg border bg-card"
      >
        <section className="border-b p-4">
          <h3 className="text-base font-semibold text-foreground">
            Catalogue details
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <ControlledInput
              control={form.control}
              name="title"
              label="Title *"
              placeholder="Clean Code"
            />
            <ControlledInput
              control={form.control}
              name="author"
              label="Author *"
              placeholder="Robert C. Martin"
            />
            <ControlledSelect
              control={form.control}
              name="categoryId"
              label="Category *"
              options={categoryOptions}
              placeholder="Select category"
              triggerClassName="w-full"
            />
            <ControlledInput
              control={form.control}
              name="publishedYear"
              label="Published year *"
              inputMode="numeric"
              placeholder="2008"
            />
            <ControlledInput
              control={form.control}
              name="language"
              label="Language *"
              placeholder="English"
            />
            <ControlledInput
              control={form.control}
              name="pages"
              label="Pages *"
              inputMode="numeric"
              placeholder="464"
            />
            <ControlledInput
              control={form.control}
              name="isbn"
              label="ISBN"
              placeholder="9780132350884"
            />
            <ControlledInput
              control={form.control}
              name="shelfLocation"
              label="Shelf location"
              placeholder="A2-SW-014"
            />
            <ControlledSelect
              control={form.control}
              name="coverTone"
              label="Cover tone"
              options={coverToneOptions}
              placeholder="Select tone"
              triggerClassName="w-full"
            />
          </div>
        </section>

        <section className="border-b p-4">
          <h3 className="text-base font-semibold text-foreground">
            Copies and access
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <ControlledInput
              control={form.control}
              name="availableCopies"
              label="Available copies *"
              inputMode="numeric"
              placeholder="4"
            />
            <ControlledInput
              control={form.control}
              name="totalCopies"
              label="Total copies *"
              inputMode="numeric"
              placeholder="6"
            />
            <ControlledCheckbox
              control={form.control}
              name="readOnline"
              label="Read online"
              description="Allow users to access a digital reading option."
              className="self-end rounded-lg border p-3"
            />
          </div>

          {hasCopyTotalConflict ? (
            <p className="mt-2 text-sm text-destructive">
              Available copies cannot be greater than total copies.
            </p>
          ) : null}

          <div className="mt-4">
            <p className="text-sm leading-none font-medium">Formats *</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {bookFormats.map((format) => {
                const isSelected = selectedFormats.includes(format)

                return (
                  <Button
                    key={format}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => toggleFormat(format)}
                    aria-pressed={isSelected}
                  >
                    {format}
                  </Button>
                )
              })}
            </div>
            {formatError ? (
              <p className="mt-2 text-sm text-destructive">
                {String(formatError)}
              </p>
            ) : null}
          </div>
        </section>

        <section className="p-4">
          <h3 className="text-base font-semibold text-foreground">Discovery</h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_280px]">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label
                  htmlFor="cover-image-upload"
                  className="text-sm leading-none font-medium"
                >
                  Cover image *
                </label>
                <Input
                  id="cover-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  aria-invalid={Boolean(coverImageError)}
                />
                {coverImageError ? (
                  <p className="text-sm text-destructive">
                    {String(coverImageError)}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Upload a JPG, PNG, or WebP cover image.
                  </p>
                )}
              </div>
              <ControlledTextarea
                control={form.control}
                name="description"
                label="Description *"
                placeholder="Describe the book and why it belongs in the collection."
                textareaClassName="min-h-32"
              />
              <ControlledInput
                control={form.control}
                name="tags"
                label="Tags"
                description="Separate tags with commas."
                placeholder="Refactoring, Testing, Best Practices"
              />
            </div>
            <div className="overflow-hidden rounded-lg border bg-muted">
              {selectedCoverImageSrc ? (
                <img
                  src={selectedCoverImageSrc}
                  alt="Cover preview"
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="flex h-44 flex-col items-center justify-center gap-2 text-muted-foreground">
                  <ImageUp className="size-8" aria-hidden="true" />
                  <span className="text-sm font-medium">No image selected</span>
                </div>
              )}
              <div className="p-3">
                <p className="text-sm font-medium text-foreground">
                  Cover preview
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  The image file is previewed here; the backend stores its cover
                  path.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col-reverse gap-2 border-t p-4 sm:flex-row sm:justify-end">
          <Link
            to="/books"
            className={cn(buttonVariants({ variant: "outline" }), "h-10")}
          >
            Cancel
          </Link>
          <Button
            type="submit"
            disabled={mutation.isPending || hasCopyTotalConflict}
            className="h-10"
          >
            {mutation.isPending ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Save className="size-4" aria-hidden="true" />
            )}
            {mutation.isPending ? "Saving..." : "Save book"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BooksForm
