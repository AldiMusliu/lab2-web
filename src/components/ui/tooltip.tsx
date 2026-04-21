import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import type * as React from "react"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delay = 150,
  closeDelay = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider delay={delay} closeDelay={closeDelay} {...props} />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger {...props} />
}

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Popup> & {
  side?: React.ComponentProps<typeof TooltipPrimitive.Positioner>["side"]
  align?: React.ComponentProps<typeof TooltipPrimitive.Positioner>["align"]
  sideOffset?: React.ComponentProps<typeof TooltipPrimitive.Positioner>["sideOffset"]
}

function TooltipContent({
  className,
  side = "top",
  align = "center",
  sideOffset = 8,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner side={side} align={align} sideOffset={sideOffset}>
        <TooltipPrimitive.Popup
          className={cn(
            "bg-primary text-primary-foreground z-50 rounded-md px-3 py-1.5 text-xs shadow-md",
            className
          )}
          {...props}
        />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
