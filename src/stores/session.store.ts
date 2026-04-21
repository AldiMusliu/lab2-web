import { create } from "zustand"

type SessionStore = {
  isAuthenticated: boolean
  setAuthenticated: (value: boolean) => void
  reset: () => void
}

const initialState = {
  isAuthenticated: false,
}

export const useSessionStore = create<SessionStore>((set) => ({
  ...initialState,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  reset: () => set(initialState),
}))
