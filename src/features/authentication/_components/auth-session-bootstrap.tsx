import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef } from "react"

import { getCurrentUser } from "@/features/authentication/api.queries"
import {
  dashboardKeys,
  getDashboardStats,
} from "@/features/dashboard/api.queries"
import { useSessionStore } from "@/stores/session.store"

export function AuthSessionBootstrap() {
  const queryClient = useQueryClient()
  const accessToken = useSessionStore((state) => state.accessToken)
  const reset = useSessionStore((state) => state.reset)
  const setSession = useSessionStore((state) => state.setSession)
  const checkedTokenRef = useRef<string | null>(null)

  useEffect(() => {
    if (!accessToken || checkedTokenRef.current === accessToken) {
      return
    }

    let isCancelled = false
    checkedTokenRef.current = accessToken

    getCurrentUser()
      .then((user) => {
        if (!isCancelled) {
          setSession({ accessToken, user })
          void queryClient.prefetchQuery({
            queryKey: dashboardKeys.stats(),
            queryFn: getDashboardStats,
          })
        }
      })
      .catch(() => {
        if (!isCancelled) {
          reset()
        }
      })

    return () => {
      isCancelled = true
    }
  }, [accessToken, queryClient, reset, setSession])

  return null
}
