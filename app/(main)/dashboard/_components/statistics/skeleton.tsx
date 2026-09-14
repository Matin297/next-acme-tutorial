import {
  BanknotesIcon,
  ClockIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function StatisticsFallback({
  className,
}: {
  className: string;
}) {
  return (
    <section
      className={cn(
        className,
        " grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      )}
    >
      <Card className="grid-cols-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            <BanknotesIcon className="w-4 text-muted-foreground" />
            <p>Collected</p>
          </CardTitle>
          <CardContent>
            <Skeleton className="h-7 w-full mt-4" />
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
            <Skeleton className="h-7 w-full mt-4" />
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
            <Skeleton className="h-7 w-full mt-4" />
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
            <Skeleton className="h-7 w-full mt-4" />
          </CardContent>
        </CardHeader>
      </Card>
    </section>
  );
}
