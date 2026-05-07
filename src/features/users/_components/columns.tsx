import { format } from "date-fns"
import { Edit3, KeyRound, ShieldCheck, Trash2, UserRound } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

import type { DataTableActions } from "@/components/molecules/data-table"
import type { User } from "@/features/users/types"
import { getUserDisplayName } from "@/features/users/_components/user-form"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function formatDateTime(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "Unknown"
  }

  return format(date, "MMM d, yyyy, HH:mm")
}

export const columns =
  (currentUserId?: string | null) =>
  (actions?: DataTableActions<User>): Array<ColumnDef<User>> => {
    const userColumns: Array<ColumnDef<User>> = [
      {
        id: "name",
        accessorFn: getUserDisplayName,
        header: "Name",
        cell: ({ row }) => (
          <div className="min-w-56">
            <p className="font-medium text-foreground">
              {getUserDisplayName(row.original)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {row.original.id}
            </p>
          </div>
        ),
      },
      {
        id: "email",
        accessorKey: "email",
        header: "Email",
      },
      {
        id: "role",
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const isAdmin = row.original.role === "admin"

          return (
            <span
              className={cn(
                "inline-flex w-fit items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium",
                isAdmin
                  ? "border-sky-200 bg-sky-50 text-sky-700"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              )}
            >
              {isAdmin ? (
                <ShieldCheck className="size-3.5" aria-hidden="true" />
              ) : (
                <UserRound className="size-3.5" aria-hidden="true" />
              )}
              {isAdmin ? "Admin" : "User"}
            </span>
          )
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => formatDateTime(row.original.createdAt),
      },
      {
        id: "updatedAt",
        accessorKey: "updatedAt",
        header: "Updated",
        cell: ({ row }) => formatDateTime(row.original.updatedAt),
      },
    ]

    if (!actions) {
      return userColumns
    }

    return [
      ...userColumns,
      {
        id: "actions",
        enableSorting: false,
        header: () => <div className="min-w-32 pr-6 text-right">Actions</div>,
        cell: ({ row }) => {
          const isCurrentUser = row.original.id === currentUserId
          const displayName = getUserDisplayName(row.original)

          return (
            <div className="flex min-w-32 justify-end gap-1 pr-6">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Edit ${displayName}`}
                onClick={(event) => {
                  event.stopPropagation()
                  actions.edit(row.original)
                }}
              >
                <Edit3 className="size-4" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Reset password for ${displayName}`}
                onClick={(event) => {
                  event.stopPropagation()
                  actions.resetPassword(row.original)
                }}
              >
                <KeyRound className="size-4" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="icon-sm"
                aria-label={`Delete ${displayName}`}
                disabled={isCurrentUser}
                title={
                  isCurrentUser
                    ? "You cannot delete your own account"
                    : undefined
                }
                onClick={(event) => {
                  event.stopPropagation()

                  if (!isCurrentUser) {
                    actions.delete(row.original)
                  }
                }}
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>
            </div>
          )
        },
      },
    ]
  }
