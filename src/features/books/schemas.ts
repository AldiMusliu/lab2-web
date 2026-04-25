import { z } from "zod"

export const dashboardFilterSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
})

export type DashboardFilterInput = z.infer<typeof dashboardFilterSchema>
