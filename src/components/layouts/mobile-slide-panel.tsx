import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

type MobileSlidePanelProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  side?: "left" | "right"
  children: ReactNode
  className?: string
}

export function MobileSlidePanel({
  open,
  onClose,
  title,
  description,
  side = "left",
  children,
  className,
}: MobileSlidePanelProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    return () => {
      setIsMounted(false)
    }
  }, [])

  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onClose])

  if (!isMounted) {
    return null
  }

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[70] transition-all md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
      />

      <aside
        className={cn(
          "absolute top-0 h-full w-[min(86vw,22rem)] border-border shadow-2xl transition-transform duration-300 ease-out",
          side === "left" ? "left-0 border-r" : "right-0 border-l",
          side === "left"
            ? open
              ? "translate-x-0"
              : "-translate-x-full"
            : open
              ? "translate-x-0"
              : "translate-x-full",
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-inherit px-5 py-4">
          <div>
            <p className="text-base font-semibold tracking-tight">{title}</p>
            {description ? (
              <p className="mt-1 text-sm opacity-80">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 transition-colors hover:bg-black/5"
            aria-label="Close panel"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="h-[calc(100%-81px)] overflow-y-auto px-5 py-5">
          {children}
        </div>
      </aside>
    </div>,
    document.body
  )
}
