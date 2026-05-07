import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { KeyRound, Loader2, Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import type { UpdatePasswordFormValues } from "@/features/profile/schemas"
import { updateMyPassword } from "@/features/profile/api.mutation"
import {
  defaultPasswordFormValues,
  formValuesToPasswordInput,
  updatePasswordSchema,
} from "@/features/profile/schemas"
import { ControlledInput } from "@/components/molecules/controlled"
import { Button } from "@/components/ui/button"
import { getHttpErrorMessage } from "@/lib/http-client"

export function ProfilePasswordForm() {
  const form = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: defaultPasswordFormValues,
  })

  const mutation = useMutation({
    mutationFn: (values: UpdatePasswordFormValues) =>
      updateMyPassword(formValuesToPasswordInput(values)),
    onSuccess: (response) => {
      form.reset(defaultPasswordFormValues)
      toast.success("Password updated", {
        description: response.message,
      })
    },
    onError: (error) => {
      toast.error("Could not update password", {
        description: getHttpErrorMessage(
          error,
          "Check your current password and try again."
        ),
      })
    },
  })

  function handleSubmit(values: UpdatePasswordFormValues) {
    mutation.mutate(values)
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="rounded-lg border bg-card"
    >
      <div className="border-b p-4">
        <div className="flex items-center gap-2">
          <KeyRound className="size-5 text-primary" aria-hidden="true" />
          <h2 className="text-xl font-semibold tracking-tight">Password</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Change your password by confirming your current credentials.
        </p>
      </div>

      <div className="grid gap-4 p-4 md:grid-cols-2">
        <ControlledInput
          control={form.control}
          name="currentPassword"
          label="Current password"
          type="password"
          autoComplete="current-password"
          className="col-span-2"
        />
        <ControlledInput
          control={form.control}
          name="newPassword"
          label="New password"
          type="password"
          autoComplete="new-password"
        />
        <ControlledInput
          control={form.control}
          name="confirmPassword"
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
        />
      </div>

      <div className="flex flex-col-reverse gap-2 border-t p-4 sm:flex-row sm:justify-end">
        <Button
          type="submit"
          disabled={mutation.isPending || !form.formState.isDirty}
          className="h-10"
        >
          {mutation.isPending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Save className="size-4" aria-hidden="true" />
          )}
          {mutation.isPending ? "Saving..." : "Update password"}
        </Button>
      </div>
    </form>
  )
}
