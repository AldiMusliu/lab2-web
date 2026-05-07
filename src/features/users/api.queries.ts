import { useQuery } from "@tanstack/react-query"

import type { Borrowing } from "@/features/borrowings/types"
import { getBorrowings } from "@/features/borrowings/api.queries"
import type { User } from "@/features/users/types"

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: () => [...userKeys.lists()] as const,
}

export async function getUsers() {
  const borrowings = await getBorrowings()
  const usersById = new Map<string, User>()

  borrowings.forEach((borrowing) => {
    const user = toUserFromBorrowing(borrowing)

    if (user && !usersById.has(user.id)) {
      usersById.set(user.id, user)
    }
  })

  return Array.from(usersById.values()).sort((firstUser, secondUser) =>
    getUserSortLabel(firstUser).localeCompare(getUserSortLabel(secondUser))
  )
}

export function useUsers() {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: getUsers,
  })
}

function toUserFromBorrowing(borrowing: Borrowing): User | null {
  const userId = borrowing.user?.id ?? borrowing.userId

  if (!userId) {
    return null
  }

  return {
    id: userId,
    firstName: borrowing.user?.firstName,
    lastName: borrowing.user?.lastName,
    fullName: borrowing.user?.name,
    role: "user",
  }
}

function getUserSortLabel(user: User) {
  return (
    user.fullName?.trim() ||
    [user.firstName, user.lastName]
      .map((value) => value?.trim())
      .filter(Boolean)
      .join(" ") ||
    user.email ||
    user.id
  )
}
