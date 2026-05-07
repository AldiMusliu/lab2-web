import { create } from "zustand"

import type { AuthUser, UserRole } from "@/features/authentication/types"

const ACCESS_TOKEN_STORAGE_KEY = "accessToken"
const AUTH_USER_STORAGE_KEY = "authUser"

export type SessionRole = UserRole

type SessionState = {
  accessToken: string | null
  isAuthenticated: boolean
  role: SessionRole
  user: AuthUser | null
}

type SessionStore = {
  accessToken: string | null
  isAuthenticated: boolean
  role: SessionRole
  user: AuthUser | null
  setAuthenticated: (value: boolean) => void
  setSession: (session: {
    accessToken?: string | null
    user: AuthUser | null
  }) => void
  setUser: (user: AuthUser) => void
  reset: () => void
}

function getStorage() {
  if (typeof window === "undefined") {
    return null
  }

  return window.localStorage
}

function isSessionRole(value: unknown): value is SessionRole {
  return value === "admin" || value === "user"
}

function normalizeStoredUser(value: unknown): AuthUser | null {
  if (!value || typeof value !== "object") {
    return null
  }

  const user = value as Partial<AuthUser>

  if (
    typeof user.id !== "string" ||
    typeof user.firstName !== "string" ||
    typeof user.lastName !== "string" ||
    typeof user.email !== "string" ||
    !isSessionRole(user.role)
  ) {
    return null
  }

  const [fallbackFirstName = "", ...fallbackLastNameParts] =
    user.firstName.split(" ")

  return {
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`,
    firstName:
      typeof user.firstName === "string" ? user.firstName : fallbackFirstName,
    lastName:
      typeof user.lastName === "string"
        ? user.lastName
        : fallbackLastNameParts.join(" "),
    email: user.email,
    role: user.role,
  }
}

export function getStoredAccessToken() {
  return getStorage()?.getItem(ACCESS_TOKEN_STORAGE_KEY) ?? null
}

function getStoredUser() {
  const rawUser = getStorage()?.getItem(AUTH_USER_STORAGE_KEY)

  if (!rawUser) {
    return null
  }

  try {
    return normalizeStoredUser(JSON.parse(rawUser))
  } catch {
    return null
  }
}

function persistStoredSession(accessToken: string, user: AuthUser | null) {
  const storage = getStorage()

  if (!storage) {
    return
  }

  storage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken)

  if (user) {
    storage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user))
  } else {
    storage.removeItem(AUTH_USER_STORAGE_KEY)
  }
}

export function clearStoredSession() {
  const storage = getStorage()

  if (!storage) {
    return
  }

  storage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
  storage.removeItem(AUTH_USER_STORAGE_KEY)
}

const storedAccessToken = getStoredAccessToken()
const storedUser = getStoredUser()

const initialState: SessionState = {
  accessToken: storedAccessToken,
  isAuthenticated: Boolean(storedAccessToken),
  role: storedUser?.role ?? "user",
  user: storedUser,
}

const emptySessionState: SessionState = {
  accessToken: null,
  isAuthenticated: false,
  role: "user",
  user: null,
}

export const useSessionStore = create<SessionStore>((set) => ({
  ...initialState,
  setAuthenticated: (value) =>
    set((state) => {
      if (!value) {
        clearStoredSession()
        return emptySessionState
      }

      return {
        ...state,
        isAuthenticated: true,
      }
    }),
  setSession: ({ accessToken, user }) =>
    set((state) => {
      const nextAccessToken =
        accessToken === undefined ? state.accessToken : accessToken

      if (!nextAccessToken) {
        clearStoredSession()
        return emptySessionState
      }

      persistStoredSession(nextAccessToken, user)

      return {
        accessToken: nextAccessToken,
        isAuthenticated: true,
        role: user?.role ?? state.role,
        user,
      }
    }),
  setUser: (user) =>
    set((state) => {
      if (state.accessToken) {
        persistStoredSession(state.accessToken, user)
      }

      return {
        isAuthenticated: Boolean(state.accessToken),
        role: user.role,
        user,
      }
    }),
  reset: () => {
    clearStoredSession()
    set(emptySessionState)
  },
}))
