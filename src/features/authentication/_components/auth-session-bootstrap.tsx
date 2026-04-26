import { useEffect, useRef } from "react"

import { getCurrentUser } from "@/features/authentication/api.queries"
import { useSessionStore } from "@/stores/session.store"

export function AuthSessionBootstrap() {
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
  }, [accessToken, reset, setSession])

  return null
}
