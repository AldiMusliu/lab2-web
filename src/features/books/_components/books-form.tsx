import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import { ArrowLeft, ImageUp, Loader2, Save } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { ChangeEvent } from "react"

import type { UpsertBookFormValues } from "@/features/books/schemas"
import type { BookFormat } from "@/features/books/types"
import { bookFormats } from "@/features/books/types"
import { createBook, updateBook } from "@/features/books/api.mutation"
import { getBookById } from "@/features/books/api.queries"
import {
  bookToFormValues,
  defaultBookFormValues,
  formValuesToBookInput,
  upsertBookSchema,
} from "@/features/books/schemas"
import { mockCategories } from "@/mocks"
import {
  ControlledCheckbox,
  ControlledInput,
  ControlledSelect,
  ControlledTextarea,
} from "@/components/molecules/controlled"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const categoryOptions = mockCategories.map((category) => ({
  label: category.name,
  value: category.id,
}))

function BooksForm({ id }: { id?: string }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
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
    queryKey: ["books", id],
    queryFn: () => getBookById(id!),
    enabled: isEditing,
  })

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
      await queryClient.invalidateQueries({ queryKey: ["books"] })
      toast.success(isEditing ? "Book updated" : "Book added", {
        description: savedBook.title,
      })
      navigate({
        to: "/books/$id",
        params: { id: savedBook.id },
      })
    },
    onError: () => {
      toast.error("Could not save book", {
        description: "Check the form fields and try again.",
      })
    },
  })

  const selectedFormats = form.watch("formats")
  const selectedCoverImage = form.watch("coverImage")
  const formatError = form.formState.errors.formats?.message
  const coverImageError = form.formState.errors.coverImage?.message

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

    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === "string") {
        form.setValue("coverImage", reader.result, {
          shouldDirty: true,
          shouldValidate: true,
        })
      }
    }

    reader.readAsDataURL(file)
  }

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
                  htmlFor="cover-image"
                  className="text-sm leading-none font-medium"
                >
                  Cover image *
                </label>
                <Input
                  id="cover-image"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
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
                label="Tags *"
                description="Separate tags with commas."
                placeholder="Refactoring, Testing, Best Practices"
              />
            </div>
            <div className="overflow-hidden rounded-lg border bg-muted">
              {selectedCoverImage ? (
                <img
                  src={selectedCoverImage}
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
                  The uploaded image will be used in catalogue cards.
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
          <Button type="submit" disabled={mutation.isPending} className="h-10">
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
