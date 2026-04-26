import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Loader2, LogIn } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { AuthEntryCard } from "@/features/authentication/_components/auth-entry-card"
import { login } from "@/features/authentication/api.mutation"
import {
  loginFormSchema,
  type LoginFormValues,
} from "@/features/authentication/schemas"
import { ControlledInput } from "@/components/molecules/controlled"
import { Button } from "@/components/ui/button"
import { getHttpErrorMessage } from "@/lib/http-client"
import { useSessionStore } from "@/stores/session.store"

const defaultLoginValues: LoginFormValues = {
  email: "",
  password: "",
}

export function LoginPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const setSession = useSessionStore((state) => state.setSession)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: defaultLoginValues,
  })

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      setSession({
        accessToken: response.accessToken,
        user: response.user,
      })
      await queryClient.invalidateQueries()
      toast.success("Signed in", {
        description: `Welcome back, ${response.user.fullName}.`,
      })
      await navigate({ to: "/dashboard" })
    },
    onError: (error) => {
      toast.error("Could not sign in", {
        description: getHttpErrorMessage(
          error,
          "Check your email and password, then try again."
        ),
      })
    },
  })

  function handleSubmit(values: LoginFormValues) {
    mutation.mutate({
      email: values.email.trim(),
      password: values.password,
    })
  }

  return (
    <AuthEntryCard
      title="Welcome back"
      description="Sign in with your library account to borrow books and manage your profile."
      helperText="Need an account?"
      helperLinkLabel="Register"
      helperLinkTo="/register"
    >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
          placeholder="Enter your password"
          autoComplete="current-password"
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
            <LogIn className="size-4" aria-hidden="true" />
          )}
          {mutation.isPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </AuthEntryCard>
  )
}
