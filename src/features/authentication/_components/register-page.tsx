import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Loader2, UserPlus } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { AuthEntryCard } from "@/features/authentication/_components/auth-entry-card"
import { register } from "@/features/authentication/api.mutation"
import {
  registerFormSchema,
  type RegisterFormValues,
} from "@/features/authentication/schemas"
import { ControlledInput } from "@/components/molecules/controlled"
import { Button } from "@/components/ui/button"
import { getHttpErrorMessage } from "@/lib/http-client"
import { useSessionStore } from "@/stores/session.store"

const defaultRegisterValues: RegisterFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export function RegisterPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const setSession = useSessionStore((state) => state.setSession)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: defaultRegisterValues,
  })

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: async (response) => {
      setSession({
        accessToken: response.accessToken,
        user: response.user,
      })
      await queryClient.invalidateQueries()
      toast.success("Account created", {
        description: `Welcome, ${response.user.fullName}.`,
      })
      if (response.user.role === "admin") {
        await navigate({ to: "/dashboard" })
      } else {
        await navigate({ to: "/profile" })
      }
    },
    onError: (error) => {
      toast.error("Could not create account", {
        description: getHttpErrorMessage(
          error,
          "Review the form fields and try again."
        ),
      })
    },
  })

  function handleSubmit(values: RegisterFormValues) {
    mutation.mutate({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      password: values.password,
    })
  }

  return (
    <AuthEntryCard
      title="Create an account"
      description="Register as a library member and continue into the protected workspace."
      helperText="Already registered?"
      helperLinkLabel="Login"
      helperLinkTo="/login"
    >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
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
        <ControlledInput
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="you@library.com"
          autoComplete="email"
        />
        <ControlledInput
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
        />
        <ControlledInput
          control={form.control}
          name="confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
        />
        <Button
          type="submit"
          size="lg"
          disabled={mutation.isPending}
          className="h-11 w-full"
        >
          {mutation.isPending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <UserPlus className="size-4" aria-hidden="true" />
          )}
          {mutation.isPending ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthEntryCard>
  )
}
