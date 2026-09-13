import { ArrowPathIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LatestInvoices from "./_components/latest-invoices";
import RevenueBarChart from "./_components/revenue-bar-chart";
import { fetchLatestInvoices, fetchRevenue } from "./data";

export default async function DashboardPage() {
  const [revenue, latestInvoices] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(5),
  ]);

  return (
    <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Recent Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueBarChart revenue={revenue} />
        </CardContent>
        <CardFooter className="text-muted-foreground gap-1">
          <CalendarIcon className="w-4" />
          <p className="text-xs">Last 12 Months</p>
        </CardFooter>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Latest Invoices</CardTitle>
        </CardHeader>
        <CardContent className="grow">
          <LatestInvoices invoices={latestInvoices.data} />
        </CardContent>
        <CardFooter className="text-muted-foreground gap-1">
          <ArrowPathIcon className="w-4" />
          <p className="text-xs">
            {formatDistanceToNow(latestInvoices.lastUpdated, {
              addSuffix: true,
            })}
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
