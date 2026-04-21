import { create } from "zustand"
import type { ReactNode } from "react"

export type GlobalDialogOptions = {
  title: ReactNode
  description?: ReactNode
  content?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  hideCancel?: boolean
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
}

type UiStore = {
  isSidebarOpen: boolean
  globalDialog: {
    isOpen: boolean
    options: GlobalDialogOptions | null
  }
  setSidebarOpen: (isOpen: boolean) => void
  toggleSidebar: () => void
  openGlobalDialog: (options: GlobalDialogOptions) => void
  closeGlobalDialog: () => void
  setGlobalDialogOpen: (isOpen: boolean) => void
}

export const useUiStore = create<UiStore>((set) => ({
  isSidebarOpen: true,
  globalDialog: {
    isOpen: false,
    options: null,
  },
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  openGlobalDialog: (options) =>
    set({
      globalDialog: {
        isOpen: true,
        options,
      },
    }),
  closeGlobalDialog: () =>
    set({
      globalDialog: {
        isOpen: false,
        options: null,
      },
    }),
  setGlobalDialogOpen: (isOpen) =>
    set((state) => ({
      globalDialog: {
        isOpen,
        options: isOpen ? state.globalDialog.options : null,
      },
    })),
}))
