import { Toaster as Sonner } from "sonner"
import type { ComponentProps } from "react"

type ToasterProps = ComponentProps<typeof Sonner>

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      closeButton={false}
      duration={4000}
      position="top-right"
      richColors
      toastOptions={{
        classNames: {
          toast:
            "group border-border bg-background text-foreground shadow-lg",
          title: "text-sm font-semibold",
          description: "text-muted-foreground text-sm",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
