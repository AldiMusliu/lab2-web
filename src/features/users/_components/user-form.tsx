import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Save, UserPlus, X } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import type { User } from "@/features/users/types"
import type {
  CreateUserFormValues,
  UpdateUserFormValues,
} from "@/features/users/schemas"
import {
  createFormValuesToUserBody,
  createUserSchema,
  defaultCreateUserValues,
  toUpdateUserValues,
  updateFormValuesToUserBody,
  updateUserSchema,
  userRoleOptions,
} from "@/features/users/schemas"
import { useCreateUser, useUpdateUser } from "@/features/users/api.mutation"
import {
  ControlledInput,
  ControlledSelect,
} from "@/components/molecules/controlled"
import { Button } from "@/components/ui/button"
import { getHttpErrorMessage } from "@/lib/http-client"

type UserFormProps =
  | {
      currentUserId?: string | null
      mode: "create"
      onCancel?: () => void
      onSaved?: () => void
      user?: never
    }
  | {
      currentUserId?: string | null
      mode: "edit"
      onCancel?: () => void
      onSaved?: () => void
      user: User
    }

export function UserForm({
  currentUserId,
  mode,
  onCancel,
  onSaved,
  user,
}: UserFormProps) {
  const isEditing = mode === "edit"
  const isCurrentUser = isEditing && user.id === currentUserId
  const createMutation = useCreateUser()
  const updateMutation = useUpdateUser()

  const createForm = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: defaultCreateUserValues,
  })
  const updateForm = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: isEditing ? toUpdateUserValues(user) : undefined,
  })

  useEffect(() => {
    if (isEditing) {
      updateForm.reset(toUpdateUserValues(user))
      return
    }

    createForm.reset(defaultCreateUserValues)
  }, [createForm, isEditing, updateForm, user])

  function handleDuplicateEmail(error: unknown) {
    const message = getHttpErrorMessage(error, "Try a different email address.")

    if (/409|email|duplicate|conflict/i.test(message)) {
      const fieldError = {
        message,
      }

      if (isEditing) {
        updateForm.setError("email", fieldError)
      } else {
        createForm.setError("email", fieldError)
      }
    }

    return message
  }

  function handleCreate(values: CreateUserFormValues) {
    createMutation.mutate(createFormValuesToUserBody(values), {
      onSuccess: (createdUser) => {
        toast.success("User created", {
          description: getUserDisplayName(createdUser),
        })
        createForm.reset(defaultCreateUserValues)
        onSaved?.()
      },
      onError: (error) => {
        handleDuplicateEmail(error)
        toast.error("Could not create user", {
          description: getHttpErrorMessage(
            error,
            "Check the user details and try again."
          ),
        })
      },
    })
  }

  function handleUpdate(values: UpdateUserFormValues) {
    if (!isEditing) {
      return
    }

    updateMutation.mutate(
      {
        userId: user.id,
        payload: updateFormValuesToUserBody(values),
      },
      {
        onSuccess: (updatedUser) => {
          toast.success("User updated", {
            description: getUserDisplayName(updatedUser),
          })
          onSaved?.()
        },
        onError: (error) => {
          handleDuplicateEmail(error)
          toast.error("Could not update user", {
            description: getHttpErrorMessage(
              error,
              "Check the user details and try again."
            ),
          })
        },
      }
    )
  }

  if (!isEditing) {
    return (
      <form
        onSubmit={createForm.handleSubmit(handleCreate)}
        className="grid gap-4"
      >
        <CreateUserFormFields
          form={createForm}
          disabled={createMutation.isPending}
        />
        <UserFormFooter
          isPending={createMutation.isPending}
          onCancel={onCancel}
          pendingLabel="Creating..."
          submitIcon="create"
          submitLabel="Create user"
        />
      </form>
    )
  }

  return (
    <form
      onSubmit={updateForm.handleSubmit(handleUpdate)}
      className="grid gap-4"
    >
      <UpdateUserFormFields
        form={updateForm}
        disabled={updateMutation.isPending}
        roleDisabled={isCurrentUser}
      />
      {isCurrentUser ? (
        <p className="rounded-lg border bg-muted px-3 py-2 text-xs text-muted-foreground">
          You cannot change your own role from this form.
        </p>
      ) : null}
      <UserFormFooter
        isPending={updateMutation.isPending}
        onCancel={onCancel}
        pendingLabel="Saving..."
        submitIcon="save"
        submitLabel="Save user"
      />
    </form>
  )
}

type CreateUserFormFieldsProps = {
  form: ReturnType<typeof useForm<CreateUserFormValues>>
  disabled: boolean
}

function CreateUserFormFields({ disabled, form }: CreateUserFormFieldsProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <ControlledInput
          control={form.control}
          name="firstName"
          label="First name"
          placeholder="Alex"
          inputClassName="h-10"
          disabled={disabled}
          autoComplete="given-name"
        />
        <ControlledInput
          control={form.control}
          name="lastName"
          label="Last name"
          placeholder="Reader"
          inputClassName="h-10"
          disabled={disabled}
          autoComplete="family-name"
        />
      </div>
      <ControlledInput
        control={form.control}
        name="email"
        label="Email"
        placeholder="alex@example.com"
        type="email"
        inputClassName="h-10"
        disabled={disabled}
        autoComplete="email"
      />
      <ControlledInput
        control={form.control}
        name="password"
        label="Password"
        type="password"
        inputClassName="h-10"
        disabled={disabled}
        autoComplete="new-password"
      />
      <ControlledSelect
        control={form.control}
        name="role"
        label="Role"
        options={userRoleOptions}
        triggerClassName="h-10 w-full"
        disabled={disabled}
      />
    </>
  )
}

type UpdateUserFormFieldsProps = {
  form: ReturnType<typeof useForm<UpdateUserFormValues>>
  disabled: boolean
  roleDisabled: boolean
}

function UpdateUserFormFields({
  disabled,
  form,
  roleDisabled,
}: UpdateUserFormFieldsProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <ControlledInput
          control={form.control}
          name="firstName"
          label="First name"
          placeholder="Alex"
          inputClassName="h-10"
          disabled={disabled}
          autoComplete="given-name"
        />
        <ControlledInput
          control={form.control}
          name="lastName"
          label="Last name"
          placeholder="Reader"
          inputClassName="h-10"
          disabled={disabled}
          autoComplete="family-name"
        />
      </div>
      <ControlledInput
        control={form.control}
        name="email"
        label="Email"
        placeholder="alex@example.com"
        type="email"
        inputClassName="h-10"
        disabled={disabled}
        autoComplete="email"
      />
      <ControlledInput
        control={form.control}
        name="password"
        label="New password"
        placeholder="Leave blank to keep current password"
        type="password"
        inputClassName="h-10"
        disabled={disabled}
        autoComplete="new-password"
      />
      <ControlledSelect
        control={form.control}
        name="role"
        label="Role"
        options={userRoleOptions}
        triggerClassName="h-10 w-full"
        disabled={disabled || roleDisabled}
      />
    </>
  )
}

type UserFormFooterProps = {
  isPending: boolean
  onCancel?: () => void
  pendingLabel: string
  submitIcon: "create" | "save"
  submitLabel: string
}

function UserFormFooter({
  isPending,
  onCancel,
  pendingLabel,
  submitIcon,
  submitLabel,
}: UserFormFooterProps) {
  return (
    <div className="flex flex-col-reverse justify-end gap-2 sm:flex-row">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isPending}
        className="h-10"
      >
        <X className="size-4" aria-hidden="true" />
        Cancel
      </Button>
      <Button type="submit" disabled={isPending} className="h-10">
        {isPending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : submitIcon === "create" ? (
          <UserPlus className="size-4" aria-hidden="true" />
        ) : (
          <Save className="size-4" aria-hidden="true" />
        )}
        {isPending ? pendingLabel : submitLabel}
      </Button>
    </div>
  )
}

export function getUserDisplayName(user: User) {
  return (
    [user.firstName, user.lastName]
      .map((value) => value?.trim())
      .filter(Boolean)
      .join(" ") || user.email
  )
}
