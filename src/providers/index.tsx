import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { useState } from "react"
import type { ReactNode } from "react"

import { GlobalDialog } from "@/components/molecules/global-dialog"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthSessionBootstrap } from "@/features/authentication/_components/auth-session-bootstrap"
import { createQueryClient } from "@/lib/query-client"

function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthSessionBootstrap />
        {children}
        <GlobalDialog />
        <Toaster />
      </TooltipProvider>

      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export { AppProviders }
