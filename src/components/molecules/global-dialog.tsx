import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useUiStore } from "@/stores/ui.store"

function GlobalDialog() {
  const { globalDialog, closeGlobalDialog, setGlobalDialogOpen } = useUiStore(
    (state) => ({
      globalDialog: state.globalDialog,
      closeGlobalDialog: state.closeGlobalDialog,
      setGlobalDialogOpen: state.setGlobalDialogOpen,
    })
  )
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

  return (
    <Dialog open={globalDialog.isOpen} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={!isSubmitting}>
        <DialogHeader>
          <DialogTitle>{options?.title}</DialogTitle>
          {options?.description ? (
            <DialogDescription>{options.description}</DialogDescription>
          ) : null}
        </DialogHeader>

        {options?.content ? <div className="text-sm">{options.content}</div> : null}

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
            {isSubmitting ? "Please wait..." : options?.confirmLabel ?? "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { GlobalDialog }
