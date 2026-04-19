import { createFileRoute, Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

const statCards = [
  { label: "Revenue", value: "$48,290", delta: "+12.4%" },
  { label: "Orders", value: "1,204", delta: "+6.9%" },
  { label: "Customers", value: "3,891", delta: "+3.1%" },
  { label: "Refunds", value: "42", delta: "-1.2%" },
]

const recentOrders = [
  { id: "#1001", customer: "Ava Johnson", status: "Paid", total: "$129.00" },
  { id: "#1002", customer: "Leo Cruz", status: "Pending", total: "$59.00" },
  { id: "#1003", customer: "Nina Park", status: "Shipped", total: "$220.00" },
  { id: "#1004", customer: "Mason Fox", status: "Canceled", total: "$15.00" },
]

const activityFeed = [
  "New order from Ava Johnson",
  "Inventory alert: Wireless Mouse",
  "Refund processed for order #0988",
  "Weekly report generated",
]

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <main className="min-h-svh bg-muted/40 p-4 md:p-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="rounded-xl border bg-card p-4 shadow-sm md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Welcome back</p>
              <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                className="h-9 w-full rounded-md border bg-background px-3 text-sm md:w-64"
                placeholder="Search orders, customers..."
                type="search"
              />
              <Button variant="outline">Export</Button>
              <Button>Create report</Button>
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <article key={card.label} className="rounded-xl border bg-card p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="mt-2 text-2xl font-semibold">{card.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.delta} this month</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-xl border bg-card p-4 shadow-sm lg:col-span-2 md:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Sales Overview</h2>
              <select className="h-8 rounded-md border bg-background px-2 text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="mt-4 h-56 rounded-lg border bg-gradient-to-br from-primary/10 via-background to-primary/5 p-4">
              <div className="grid h-full grid-cols-12 items-end gap-2">
                {[35, 54, 42, 67, 58, 73, 64, 79, 62, 84, 70, 90].map((height, idx) => (
                  <div
                    key={idx}
                    className="rounded-sm bg-primary/70"
                    style={{ height: `${height}%` }}
                    title={`Week ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-xl border bg-card p-4 shadow-sm md:p-6">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <div className="mt-4 grid gap-2">
              <Button variant="outline">Add Product</Button>
              <Button variant="outline">Invite Team Member</Button>
              <Button variant="outline">Create Discount</Button>
              <Button>Publish Update</Button>
            </div>
            <div className="mt-6 rounded-lg border bg-muted/40 p-3 text-sm">
              <p className="font-medium">Profile completion</p>
              <p className="mt-1 text-muted-foreground">You are 80% done. Add billing details to unlock reports.</p>
              <div className="mt-3 h-2 rounded-full bg-muted">
                <div className="h-2 w-4/5 rounded-full bg-primary" />
              </div>
            </div>
          </article>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-xl border bg-card p-4 shadow-sm lg:col-span-2 md:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="text-muted-foreground">
                  <tr className="border-b">
                    <th className="py-2 font-medium">Order</th>
                    <th className="py-2 font-medium">Customer</th>
                    <th className="py-2 font-medium">Status</th>
                    <th className="py-2 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-3 font-medium">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">
                        <span className="rounded-full bg-muted px-2 py-1 text-xs">{order.status}</span>
                      </td>
                      <td className="py-3">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-xl border bg-card p-4 shadow-sm md:p-6">
            <h2 className="text-lg font-semibold">Activity</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {activityFeed.map((item) => (
                <li key={item} className="rounded-md border bg-muted/30 p-3">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link to="/" className="text-sm font-medium text-primary hover:underline">
                Back to home
              </Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  )
}
