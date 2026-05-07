import { zodResolver } from "@hookform/resolvers/zod"
import { KeyRound, Loader2, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import type { User } from "@/features/users/types"
import type { ResetUserPasswordFormValues } from "@/features/users/schemas"
import {
  defaultResetUserPasswordValues,
  resetPasswordValuesToUserBody,
  resetUserPasswordSchema,
} from "@/features/users/schemas"
import { getUserDisplayName } from "@/features/users/_components/user-form"
import { useUpdateUser } from "@/features/users/api.mutation"
import { ControlledInput } from "@/components/molecules/controlled"
import { Button } from "@/components/ui/button"
import { getHttpErrorMessage } from "@/lib/http-client"

type UserResetPasswordFormProps = {
  onCancel?: () => void
  onSaved?: () => void
  user: User
}

export function UserResetPasswordForm({
  onCancel,
  onSaved,
  user,
}: UserResetPasswordFormProps) {
  const form = useForm<ResetUserPasswordFormValues>({
    resolver: zodResolver(resetUserPasswordSchema),
    defaultValues: defaultResetUserPasswordValues,
  })
  const mutation = useUpdateUser()

  function handleSubmit(values: ResetUserPasswordFormValues) {
    mutation.mutate(
      {
        userId: user.id,
        payload: resetPasswordValuesToUserBody(user, values),
      },
      {
        onSuccess: () => {
          toast.success("Password reset", {
            description: getUserDisplayName(user),
          })
          form.reset(defaultResetUserPasswordValues)
          onSaved?.()
        },
        onError: (error) => {
          toast.error("Could not reset password", {
            description: getHttpErrorMessage(
              error,
              "Check the password and try again."
            ),
          })
        },
      }
    )
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
      <ControlledInput
        control={form.control}
        name="password"
        label="New password"
        type="password"
        inputClassName="h-10"
        disabled={mutation.isPending}
        autoComplete="new-password"
      />
      <div className="flex flex-col-reverse justify-end gap-2 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={mutation.isPending}
          className="h-10"
        >
          <X className="size-4" aria-hidden="true" />
          Cancel
        </Button>
        <Button type="submit" disabled={mutation.isPending} className="h-10">
          {mutation.isPending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <KeyRound className="size-4" aria-hidden="true" />
          )}
          {mutation.isPending ? "Resetting..." : "Reset password"}
        </Button>
      </div>
    </form>
  )
}
