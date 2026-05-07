import { useCallback, useMemo, useState } from "react"
import { Loader2, Plus, RotateCcw, Search, UsersRound } from "lucide-react"
import { toast } from "sonner"

import type { User } from "@/features/users/types"
import {
  UserForm,
  getUserDisplayName,
} from "@/features/users/_components/user-form"
import { UserResetPasswordForm } from "@/features/users/_components/user-reset-password-form"
import { columns } from "@/features/users/_components/columns"
import { useDeleteUser } from "@/features/users/api.mutation"
import { useUsers } from "@/features/users/api.queries"
import { DataTable } from "@/components/molecules/data-table"
import { NoData } from "@/components/molecules/no-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getHttpErrorMessage } from "@/lib/http-client"
import { useSessionStore } from "@/stores/session.store"
import { useUiStore } from "@/stores/ui.store"

type RoleFilter = "all" | "admin" | "user"

const roleFilterOptions = [
  { label: "All roles", value: "all" },
  { label: "Admins", value: "admin" },
  { label: "Users", value: "user" },
] satisfies Array<{ label: string; value: RoleFilter }>

export function UsersPage() {
  const currentUser = useSessionStore((state) => state.user)
  const openGlobalDialog = useUiStore((state) => state.openGlobalDialog)
  const closeGlobalDialog = useUiStore((state) => state.closeGlobalDialog)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all")
  const { data: users = [], isError, isLoading, refetch } = useUsers()
  const deleteMutation = useDeleteUser()

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return users.filter((user) => {
      const matchesRole = roleFilter === "all" || user.role === roleFilter

      if (!matchesRole) {
        return false
      }

      if (!normalizedSearch) {
        return true
      }

      return [
        getUserDisplayName(user),
        user.firstName ?? "",
        user.lastName ?? "",
        user.email,
        user.id,
        user.role,
      ].some((value) => value.toLowerCase().includes(normalizedSearch))
    })
  }, [roleFilter, searchTerm, users])

  const adminCount = users.filter((user) => user.role === "admin").length
  const regularUserCount = users.filter((user) => user.role === "user").length
  const hasActiveFilters = searchTerm.trim().length > 0 || roleFilter !== "all"

  const openCreateDialog = useCallback(() => {
    openGlobalDialog({
      title: "Create user",
      description: "Add a member or admin account to Smart Library.",
      hideFooter: true,
      children: (
        <UserForm
          mode="create"
          currentUserId={currentUser?.id}
          onCancel={closeGlobalDialog}
          onSaved={closeGlobalDialog}
        />
      ),
    })
  }, [closeGlobalDialog, currentUser?.id, openGlobalDialog])

  const openEditDialog = useCallback(
    (user: User) => {
      openGlobalDialog({
        title: "Edit user",
        description: getUserDisplayName(user),
        hideFooter: true,
        children: (
          <UserForm
            mode="edit"
            currentUserId={currentUser?.id}
            user={user}
            onCancel={closeGlobalDialog}
            onSaved={closeGlobalDialog}
          />
        ),
      })
    },
    [closeGlobalDialog, currentUser?.id, openGlobalDialog]
  )

  const openResetPasswordDialog = useCallback(
    (user: User) => {
      openGlobalDialog({
        title: "Reset password",
        description: getUserDisplayName(user),
        hideFooter: true,
        children: (
          <UserResetPasswordForm
            user={user}
            onCancel={closeGlobalDialog}
            onSaved={closeGlobalDialog}
          />
        ),
      })
    },
    [closeGlobalDialog, openGlobalDialog]
  )

  const openDeleteDialog = useCallback(
    (user: User) => {
      openGlobalDialog({
        title: "Delete user",
        description: `Delete "${getUserDisplayName(user)}" from Smart Library?`,
        confirmLabel: "Delete",
        cancelLabel: "Cancel",
        onConfirm: async () => {
          try {
            await deleteMutation.mutateAsync(user.id)
            toast.success("User deleted", {
              description: getUserDisplayName(user),
            })
          } catch (error) {
            toast.error("Could not delete user", {
              description: getHttpErrorMessage(
                error,
                "This account may still be protected."
              ),
            })
          }
        },
      })
    },
    [deleteMutation, openGlobalDialog]
  )

  const actions = useMemo(
    () => ({
      edit: openEditDialog,
      resetPassword: openResetPasswordDialog,
      delete: openDeleteDialog,
    }),
    [openDeleteDialog, openEditDialog, openResetPasswordDialog]
  )

  const userColumns = useMemo(() => columns(currentUser?.id), [currentUser?.id])

  function resetFilters() {
    setSearchTerm("")
    setRoleFilter("all")
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
          Users unavailable
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We could not load user records. Admin access may be required.
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
              <UsersRound className="size-5 text-primary" aria-hidden="true" />
              <h2 className="text-xl font-semibold tracking-tight">
                User accounts
              </h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage member and administrator access.
            </p>
          </div>

          <Button type="button" onClick={openCreateDialog} className="h-10">
            <Plus className="size-4" aria-hidden="true" />
            Add user
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 border-t pt-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{users.length}</span>{" "}
            total users
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{adminCount}</span>{" "}
            admins
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {regularUserCount}
            </span>{" "}
            members
          </p>
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="grid gap-3 md:grid-cols-[minmax(220px,1fr)_minmax(160px,14rem)_auto]">
            <div className="grid gap-1.5">
              <label
                htmlFor="user-search"
                className="text-sm leading-none font-medium"
              >
                Search
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="user-search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Name, email, or role"
                  className="h-10 pl-8"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="user-role-filter"
                className="text-sm leading-none font-medium"
              >
                Role
              </label>
              <Select
                items={roleFilterOptions}
                value={roleFilter}
                onValueChange={(nextValue) =>
                  setRoleFilter((nextValue as RoleFilter | null) ?? "all")
                }
              >
                <SelectTrigger id="user-role-filter" className="h-10 w-full">
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>
                <SelectContent align="start">
                  {roleFilterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                disabled={!hasActiveFilters}
                onClick={resetFilters}
                className="h-10 w-full md:w-auto"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        actions={actions}
        columns={userColumns}
        data={filteredUsers}
        initialPageSize={10}
        paginationEndPosition
        notFoundText={
          <NoData
            title="No users found"
            description={
              hasActiveFilters
                ? "Try different search terms or role filters."
                : "Create a user account to get started."
            }
          />
        }
        tableId="/users"
      />
    </div>
  )
}
