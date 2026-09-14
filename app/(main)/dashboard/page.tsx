import { CalendarIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LatestInvoices, {
  LatestInvoicesFallback,
} from "./_components/latest-invoices";
import RevenueBarChart from "./_components/revenue-bar-chart";
import Statistics, { StatisticsFallback } from "./_components/statistics";
import { fetchRevenue } from "./data";

export default async function DashboardPage() {
  const [revenue] = await Promise.all([fetchRevenue()]);

  return (
    <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <Suspense fallback={<StatisticsFallback className="col-span-2" />}>
        <Statistics className="col-span-2" />
      </Suspense>
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
        <Suspense fallback={<LatestInvoicesFallback />}>
          <LatestInvoices />
        </Suspense>
      </Card>
    </section>
  );
}
