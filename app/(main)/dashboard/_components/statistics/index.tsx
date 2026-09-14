import {
  BanknotesIcon,
  ClockIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatNumber } from "@/lib/utils";
import { fetchDashboardStats } from "../../data";

export default async function Statistics({ className }: { className: string }) {
  const statistics = await fetchDashboardStats();

  return (
    <section
      className={cn(
        className,
        "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      )}
    >
      <Card className="grid-cols-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            <BanknotesIcon className="w-4 text-muted-foreground" />
            <p>Collected</p>
          </CardTitle>
          <CardContent>
            <p className="text-xl mt-4 text-center">
              ${formatNumber(statistics.invoices.collected)}
            </p>
          </CardContent>
        </CardHeader>
      </Card>
      <Card className="grid-cols-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            <ClockIcon className="w-4 text-muted-foreground" />
            <p>Pending</p>
          </CardTitle>
          <CardContent>
            <p className="text-xl mt-4 text-center">
              ${formatNumber(statistics.invoices.pending)}
            </p>
          </CardContent>
        </CardHeader>
      </Card>
      <Card className="grid-cols-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            <InboxIcon className="w-4 text-muted-foreground" />
            <p>Total Invoices</p>
          </CardTitle>
          <CardContent>
            <p className="text-xl mt-4 text-center">
              {formatNumber(statistics.invoices.total)}
            </p>
          </CardContent>
        </CardHeader>
      </Card>
      <Card className="grid-cols-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            <UsersIcon className="w-4 text-muted-foreground" />
            <p>Total Customers</p>
          </CardTitle>
          <CardContent>
            <p className="text-xl mt-4 text-center">
              {formatNumber(statistics.customers.total)}
            </p>
          </CardContent>
        </CardHeader>
      </Card>
    </section>
  );
}

export { default as StatisticsFallback } from "./skeleton";
