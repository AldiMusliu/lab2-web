import { z } from "zod"

import type { Book, UpsertBookInput } from "@/features/books/types"
import {
  bookAvailabilities,
  bookFormats,
  bookSorts,
} from "@/features/books/types"

const nextPublishedYear = new Date().getFullYear() + 1

function wholeNumberString(label: string, minimum = 0) {
  return z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .regex(/^\d+$/, `${label} must be a whole number`)
    .refine((value) => Number(value) >= minimum, {
      message:
        minimum === 0
          ? `${label} cannot be negative`
          : `${label} must be at least ${minimum}`,
    })
}

export const upsertBookSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required"),
    author: z.string().trim().min(1, "Author is required"),
    categoryId: z.string().trim().min(1, "Category is required"),
    availableCopies: wholeNumberString("Available copies"),
    totalCopies: wholeNumberString("Total copies", 1),
    publishedYear: wholeNumberString("Published year", 1000).refine(
      (value) => Number(value) <= nextPublishedYear,
      `Published year cannot be later than ${nextPublishedYear}`
    ),
    language: z.string().trim().min(1, "Language is required"),
    pages: wholeNumberString("Pages", 1),
    isbn: z.string().trim(),
    shelfLocation: z.string().trim(),
    formats: z.array(z.enum(bookFormats)).min(1, "Select at least one format"),
    readOnline: z.boolean(),
    description: z.string().trim().min(1, "Description is required"),
    tags: z.string().trim(),
    coverImage: z.string().trim().min(1, "Cover image is required"),
    coverTone: z.string().trim(),
  })
  .superRefine((values, ctx) => {
    const availableCopies = Number(values.availableCopies)
    const totalCopies = Number(values.totalCopies)

    if (
      Number.isFinite(availableCopies) &&
      Number.isFinite(totalCopies) &&
      availableCopies > totalCopies
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Available copies cannot be greater than total copies",
        path: ["availableCopies"],
      })
    }
  })

export type UpsertBookFormValues = z.infer<typeof upsertBookSchema>

export const defaultBookFormValues: UpsertBookFormValues = {
  title: "",
  author: "",
  categoryId: "",
  availableCopies: "1",
  totalCopies: "1",
  publishedYear: String(new Date().getFullYear()),
  language: "English",
  pages: "1",
  isbn: "",
  shelfLocation: "",
  formats: ["Print"],
  readOnline: false,
  description: "",
  tags: "",
  coverImage: "",
  coverTone: "",
}

export function bookToFormValues(book: Book): UpsertBookFormValues {
  return {
    title: book.title,
    author: book.author,
    categoryId: book.categoryId,
    availableCopies: String(book.availableCopies),
    totalCopies: String(book.totalCopies),
    publishedYear: String(book.publishedYear),
    language: book.language,
    pages: String(book.pages),
    isbn: book.isbn,
    shelfLocation: book.shelfLocation,
    formats: book.formats,
    readOnline: book.readOnline,
    description: book.description,
    tags: book.tags.join(", "),
    coverImage: book.coverImage,
    coverTone: book.coverTone,
  }
}

export function formValuesToBookInput(
  values: UpsertBookFormValues
): UpsertBookInput {
  const isbn = values.isbn.trim()
  const shelfLocation = values.shelfLocation.trim()
  const coverTone = values.coverTone.trim()
  const tags = values.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)

  return {
    title: values.title.trim(),
    author: values.author.trim(),
    categoryId: values.categoryId,
    availableCopies: Number(values.availableCopies),
    totalCopies: Number(values.totalCopies),
    publishedYear: Number(values.publishedYear),
    language: values.language.trim(),
    pages: Number(values.pages),
    ...(isbn ? { isbn } : {}),
    ...(shelfLocation ? { shelfLocation } : {}),
    formats: values.formats,
    readOnline: values.readOnline,
    description: values.description.trim(),
    ...(tags.length > 0 ? { tags } : {}),
    coverImage: values.coverImage.trim(),
    ...(coverTone ? { coverTone } : {}),
  }
}

export const bookSearchSchema = z.object({
  q: z.string().optional(),
  categoryId: z.string().optional(),
  availability: z.enum(bookAvailabilities).optional(),
  sort: z.enum(bookSorts).optional(),
  page: z.coerce.number().int().min(1).optional(),
  pageSize: z.coerce.number().int().min(1).optional(),
})

export type BookSearchInput = z.infer<typeof bookSearchSchema>
