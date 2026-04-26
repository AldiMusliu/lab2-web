import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Loader2, Mail, Save, UserRound } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { ProfilePasswordForm } from "@/features/profile/_components/profile-password-form"
import { updateMyProfile } from "@/features/profile/api.mutation"
import { getMyProfile } from "@/features/profile/api.queries"
import {
  defaultProfileFormValues,
  formValuesToProfileInput,
  updateProfileSchema,
  type UpdateProfileFormValues,
} from "@/features/profile/schemas"
import { ControlledInput } from "@/components/molecules/controlled"
import { Button } from "@/components/ui/button"
import { getHttpErrorMessage } from "@/lib/http-client"
import { useSessionStore } from "@/stores/session.store"

export function ProfilePage() {
  const queryClient = useQueryClient()
  const currentUser = useSessionStore((state) => state.user)
  const setUser = useSessionStore((state) => state.setUser)

  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: defaultProfileFormValues,
  })

  const {
    data: profile,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["profile", "me"],
    queryFn: getMyProfile,
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
      })
    }
  }, [form, profile])

  const mutation = useMutation({
    mutationFn: (values: UpdateProfileFormValues) =>
      updateMyProfile(formValuesToProfileInput(values)),
    onSuccess: async (savedProfile) => {
      await queryClient.invalidateQueries({ queryKey: ["profile", "me"] })

      if (currentUser) {
        setUser({
          ...currentUser,
          email: savedProfile.email,
          firstName: savedProfile.firstName,
          fullName: savedProfile.fullName,
          lastName: savedProfile.lastName,
        })
      }

      toast.success("Profile updated", {
        description: savedProfile.fullName,
      })
    },
    onError: (error) => {
      toast.error("Could not update profile", {
        description: getHttpErrorMessage(
          error,
          "Check your profile details and try again."
        ),
      })
    },
  })

  function handleSubmit(values: UpdateProfileFormValues) {
    mutation.mutate(values)
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
          Profile unavailable
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We could not load your profile details.
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
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="grid gap-4">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="rounded-lg border bg-card"
        >
          <div className="border-b p-4">
            <div className="flex items-center gap-2">
              <UserRound className="size-5 text-primary" aria-hidden="true" />
              <h2 className="text-xl font-semibold tracking-tight">
                Personal details
              </h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep your name current for borrowing records and library notices.
            </p>
          </div>

          <div className="grid gap-4 p-4 md:grid-cols-2">
            <ControlledInput
              control={form.control}
              name="firstName"
              label="First name"
              placeholder="Alex"
              autoComplete="given-name"
            />
            <ControlledInput
              control={form.control}
              name="lastName"
              label="Last name"
              placeholder="Reader"
              autoComplete="family-name"
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
              {mutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>

        <ProfilePasswordForm />
      </div>

      <aside className="rounded-lg border bg-card p-4">
        <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <UserRound className="size-6" aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">
          {profile?.fullName}
        </h3>
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="size-4" aria-hidden="true" />
          <span className="min-w-0 truncate">{profile?.email}</span>
        </div>
      </aside>
    </div>
  )
}
