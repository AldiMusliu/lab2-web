import { Link } from "@tanstack/react-router"
import {
  AlertTriangle,
  BookCheck,
  BookCopy,
  LibraryBig,
  RefreshCw,
  Tags,
  UsersRound,
} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { StatCard } from "./stat-card"
import { StatusRow } from "./status-row"
import { cn } from "@/lib/utils"

import type { AdminDashboardStats } from "../types"

function getPercent(value: number, total: number) {
  if (total <= 0) return 0
  return Math.min(100, Math.round((value / total) * 100))
}

export function AdminDashboard({ stats }: { stats: AdminDashboardStats }) {
  const availableCopyPercent = getPercent(
    stats.availableCopies,
    stats.totalCopies
  )
  const borrowedCopyPercent = getPercent(
    stats.borrowedCopies,
    stats.totalCopies
  )

  return (
    <div className="flex min-h-0 min-w-0 flex-col gap-4">
      <section className="rounded-lg border bg-card p-4">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <LibraryBig className="size-5 text-primary" aria-hidden="true" />
              <h2 className="text-xl font-semibold">Library overview</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitor catalogue capacity, members, and borrowing risk from the
              latest API summary.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              to="/books"
              className={cn(buttonVariants({ variant: "outline" }), "h-10")}
            >
              <BookCopy className="size-4" aria-hidden="true" />
              Books
            </Link>
            <Link to="/borrowings" className={cn(buttonVariants(), "h-10")}>
              <BookCheck className="size-4" aria-hidden="true" />
              Borrowings
            </Link>
          </div>
        </div>
      </section>

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Admin dashboard statistics"
      >
        <StatCard
          icon={BookCopy}
          label="Total books"
          value={stats.totalBooks}
          description={`${new Intl.NumberFormat("en-US").format(stats.availableBooks)} titles currently have available copies.`}
          tone="primary"
        />
        <StatCard
          icon={LibraryBig}
          label="Available copies"
          value={stats.availableCopies}
          description={`${availableCopyPercent}% of all copies are ready to borrow.`}
          tone="emerald"
        />
        <StatCard
          icon={UsersRound}
          label="Active users"
          value={stats.activeUsers}
          description={`${new Intl.NumberFormat("en-US").format(stats.totalUsers)} total registered users.`}
          tone="sky"
        />
        <StatCard
          icon={AlertTriangle}
          label="Overdue"
          value={stats.overdueBorrowings}
          description="Open borrowings with due dates in the past."
          tone={stats.overdueBorrowings > 0 ? "rose" : "slate"}
        />
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)]">
        <section className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2">
            <BookCopy className="size-5 text-primary" aria-hidden="true" />
            <h3 className="text-base font-semibold text-foreground">
              Catalogue capacity
            </h3>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Copy availability across the physical collection.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-foreground">Available</span>
                <span className="text-muted-foreground">
                  {availableCopyPercent}%
                </span>
              </div>
              <div
                className="mt-2 h-2 rounded-full bg-muted"
                role="meter"
                aria-label="Available copy ratio"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={availableCopyPercent}
              >
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${availableCopyPercent}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {new Intl.NumberFormat("en-US").format(stats.availableCopies)}{" "}
                of {new Intl.NumberFormat("en-US").format(stats.totalCopies)}{" "}
                copies can be checked out.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-foreground">Borrowed</span>
                <span className="text-muted-foreground">
                  {borrowedCopyPercent}%
                </span>
              </div>
              <div
                className="mt-2 h-2 rounded-full bg-muted"
                role="meter"
                aria-label="Borrowed copy ratio"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={borrowedCopyPercent}
              >
                <div
                  className="h-full rounded-full bg-amber-600"
                  style={{ width: `${borrowedCopyPercent}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {new Intl.NumberFormat("en-US").format(stats.borrowedCopies)}{" "}
                copies are currently out.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 border-t pt-4 sm:grid-cols-3">
            <StatusRow
              icon={Tags}
              label="Categories"
              value={stats.totalCategories}
            />
            <StatusRow
              icon={BookCopy}
              label="Book titles"
              value={stats.totalBooks}
              tone="sky"
            />
            <StatusRow
              icon={LibraryBig}
              label="Total copies"
              value={stats.totalCopies}
              tone="emerald"
            />
          </div>
        </section>

        <section className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2">
            <BookCheck className="size-5 text-primary" aria-hidden="true" />
            <h3 className="text-base font-semibold text-foreground">
              Borrowing status
            </h3>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Active, returned, and overdue activity for all members.
          </p>

          <div className="mt-5">
            <StatusRow
              icon={BookCheck}
              label="Active borrowings"
              value={stats.activeBorrowings}
              tone="sky"
            />
            <StatusRow
              icon={AlertTriangle}
              label="Overdue borrowings"
              value={stats.overdueBorrowings}
              tone={stats.overdueBorrowings > 0 ? "rose" : "slate"}
            />
            <StatusRow
              icon={BookCheck}
              label="Returned borrowings"
              value={stats.returnedBorrowings}
              tone="emerald"
            />
            <StatusRow
              icon={BookCheck}
              label="Total borrowings"
              value={stats.totalBorrowings}
            />
            <StatusRow
              icon={UsersRound}
              label="Admin users"
              value={stats.adminUsers}
              tone="amber"
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminDashboard
