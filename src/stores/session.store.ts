import { create } from "zustand"

export type SessionRole = "user" | "admin"

type SessionStore = {
  isAuthenticated: boolean
  role: SessionRole
  setAuthenticated: (value: boolean) => void
  setRole: (role: SessionRole) => void
  startDemoSession: (role: SessionRole) => void
  reset: () => void
}

const initialState = {
  isAuthenticated: false,
  role: "user" as SessionRole,
}

export const useSessionStore = create<SessionStore>((set) => ({
  ...initialState,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setRole: (role) => set({ role }),
  startDemoSession: (role) => set({ isAuthenticated: true, role }),
  reset: () => set(initialState),
}))
