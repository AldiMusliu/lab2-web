import { createFileRoute } from "@tanstack/react-router"
import { AppShell } from "@/components/layouts/app-shell"
import { DashboardPlaceholder } from "@/features/dashboard/components/dashboard-placeholder"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <AppShell
      title="Smart Library Management"
      subtitle="Frontend foundation for a modular dashboard-style app"
    >
      <DashboardPlaceholder />
    </AppShell>
  )
}
