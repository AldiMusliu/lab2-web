export const bookFormats = ["Print", "E-book", "Audiobook"] as const

export type BookFormat = (typeof bookFormats)[number]

export const bookCoverImageDetails = {
  "library-shelves": {
    label: "Library shelves",
    imageUrl:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
  },
  "reading-table": {
    label: "Reading table",
    imageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
  },
  "digital-pages": {
    label: "Digital pages",
    imageUrl:
      "https://images.unsplash.com/photo-1455885666463-9b0384544e1b?auto=format&fit=crop&w=900&q=80",
  },
  "research-stack": {
    label: "Research stack",
    imageUrl:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80",
  },
} satisfies Record<string, { imageUrl: string; label: string }>

export const bookCoverTones = [
  "teal",
  "indigo",
  "slate",
  "emerald",
  "amber",
  "rose",
  "cyan",
  "lime",
  "violet",
  "sky",
  "orange",
  "fuchsia",
] as const

export type BookCoverTone = (typeof bookCoverTones)[number]

export type Book = {
  id: string
  title: string
  author: string
  categoryId: string
  availableCopies: number
  totalCopies: number
  publishedYear: number
  language: string
  pages: number
  isbn: string
  shelfLocation: string
  formats: Array<BookFormat>
  readOnline: boolean
  description: string
  tags: Array<string>
  coverImage: string
  coverTone: BookCoverTone
}

export type UpsertBookInput = Omit<
  Book,
  "coverTone" | "id" | "isbn" | "shelfLocation"
>
