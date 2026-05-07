import { Link } from "@tanstack/react-router"
import {
  ArrowRight,
  BookCheck,
  BookCopy,
  CalendarClock,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { StatCard } from "./stat-card"
import { StatusRow } from "./status-row"
import { useSessionStore } from "@/stores/session.store"
import { cn } from "@/lib/utils"

import type { UserDashboardStats } from "../types"

export function UserDashboard({ stats }: { stats: UserDashboardStats }) {
  const user = useSessionStore((state) => state.user)
  const displayName = user?.firstName ? user.firstName : "Reader"

  return (
    <div className="flex min-h-0 min-w-0 flex-col gap-4">
      <section className="rounded-lg border bg-card p-4">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <BookCheck className="size-5 text-primary" aria-hidden="true" />
              <h2 className="text-xl font-semibold">
                {displayName}'s reading dashboard
              </h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Track current checkouts, due-soon books, and borrowing history.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              to="/collections"
              className={cn(buttonVariants({ variant: "outline" }), "h-10")}
            >
              <BookCopy className="size-4" aria-hidden="true" />
              Browse books
            </Link>
            <Link to="/borrowings" className={cn(buttonVariants(), "h-10")}>
              <BookCheck className="size-4" aria-hidden="true" />
              My borrowings
            </Link>
          </div>
        </div>
      </section>

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Member dashboard statistics"
      >
        <StatCard
          icon={BookCheck}
          label="Current"
          value={stats.currentBorrowings}
          description={`${new Intl.NumberFormat("en-US").format(stats.activeBorrowings)} active borrowing records.`}
          tone="primary"
        />
        <StatCard
          icon={CalendarClock}
          label="Due soon"
          value={stats.dueSoonBorrowings}
          description="Open books approaching their due date."
          tone={stats.dueSoonBorrowings > 0 ? "amber" : "slate"}
        />
        <StatCard
          icon={AlertTriangle}
          label="Overdue"
          value={stats.overdueBorrowings}
          description="Open borrowings with due dates in the past."
          tone={stats.overdueBorrowings > 0 ? "rose" : "slate"}
        />
        <StatCard
          icon={CheckCircle2}
          label="Returned"
          value={stats.returnedBorrowings}
          description={`${new Intl.NumberFormat("en-US").format(stats.totalBorrowings)} total borrowing records.`}
          tone="emerald"
        />
      </section>

      <section className="rounded-lg border bg-card p-4">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start">
          <div>
            <div className="flex items-center gap-2">
              <BookCheck className="size-5 text-primary" aria-hidden="true" />
              <h3 className="text-base font-semibold text-foreground">
                Borrowing health
              </h3>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              A quick view of what needs attention in your account.
            </p>
          </div>

          <Link
            to="/borrowings"
            className={cn(buttonVariants({ variant: "outline" }), "h-10")}
          >
            Review records
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
          <div>
            <StatusRow
              icon={BookCheck}
              label="Current borrowings"
              value={stats.currentBorrowings}
              tone="primary"
            />
            <StatusRow
              icon={CalendarClock}
              label="Due soon"
              value={stats.dueSoonBorrowings}
              tone={stats.dueSoonBorrowings > 0 ? "amber" : "slate"}
            />
            <StatusRow
              icon={AlertTriangle}
              label="Overdue"
              value={stats.overdueBorrowings}
              tone={stats.overdueBorrowings > 0 ? "rose" : "slate"}
            />
            <StatusRow
              icon={CheckCircle2}
              label="Returned"
              value={stats.returnedBorrowings}
              tone="emerald"
            />
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm font-medium text-foreground">
              {stats.overdueBorrowings > 0
                ? "Overdue books need attention"
                : stats.dueSoonBorrowings > 0
                  ? "You have books due soon"
                  : "Your account is up to date"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {stats.overdueBorrowings > 0
                ? "Open your borrowing records to review which books should be returned first."
                : stats.dueSoonBorrowings > 0
                  ? "Check due dates and plan returns before they become overdue."
                  : "Explore the collection when you are ready for your next read."}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UserDashboard
