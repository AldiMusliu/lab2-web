import { useState } from "react"
import { useMediaQuery } from "@base-ui/react/unstable-use-media-query"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useUiStore } from "@/stores/ui.store"

function GlobalDialog() {
  const globalDialog = useUiStore((state) => state.globalDialog)
  const closeGlobalDialog = useUiStore((state) => state.closeGlobalDialog)
  const setGlobalDialogOpen = useUiStore((state) => state.setGlobalDialogOpen)
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    defaultMatches: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const options = globalDialog.options

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && isSubmitting) {
      return
    }

    if (!isOpen) {
      options?.onCancel?.()
      closeGlobalDialog()
      return
    }

    setGlobalDialogOpen(true)
  }

  const handleConfirm = async () => {
    if (!options?.onConfirm) {
      closeGlobalDialog()
      return
    }

    try {
      setIsSubmitting(true)
      await options.onConfirm()
      closeGlobalDialog()
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isDesktop) {
    return (
      <Drawer open={globalDialog.isOpen} onOpenChange={handleOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{options?.title}</DrawerTitle>
            {options?.description ? (
              <DrawerDescription>{options.description}</DrawerDescription>
            ) : null}
          </DrawerHeader>

          {options?.children ? (
            <div className="px-4 pb-4 text-sm">{options.children}</div>
          ) : null}

          {options?.hideFooter ? null : (
            <DrawerFooter>
              {options?.hideCancel ? null : (
                <Button
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  disabled={isSubmitting}
                >
                  {options?.cancelLabel ?? "Cancel"}
                </Button>
              )}
              <Button onClick={handleConfirm} disabled={isSubmitting}>
                {isSubmitting
                  ? "Please wait..."
                  : (options?.confirmLabel ?? "Confirm")}
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={globalDialog.isOpen} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={!isSubmitting}>
        <DialogHeader>
          <DialogTitle>{options?.title}</DialogTitle>
          {options?.description ? (
            <DialogDescription>{options.description}</DialogDescription>
          ) : null}
        </DialogHeader>

        {options?.children ? (
          <div className="text-sm">{options.children}</div>
        ) : null}

        {options?.hideFooter ? null : (
          <DialogFooter>
            {options?.hideCancel ? null : (
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isSubmitting}
              >
                {options?.cancelLabel ?? "Cancel"}
              </Button>
            )}
            <Button onClick={handleConfirm} disabled={isSubmitting}>
              {isSubmitting
                ? "Please wait..."
                : (options?.confirmLabel ?? "Confirm")}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { GlobalDialog }
