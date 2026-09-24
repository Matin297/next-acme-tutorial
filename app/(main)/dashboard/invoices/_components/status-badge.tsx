import { Badge } from "@/components/ui/badge";
import type { InvoiceStatus } from "@/lib/prisma/utility-types";
import { cn } from "@/lib/utils";

export default function StatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <Badge
      variant="secondary"
      className={cn({
        "bg-green-100 text-green-700": status === "paid",
        "bg-yellow-100 text-yellow-700": status === "pending",
      })}
    >
      {status}
    </Badge>
  );
}
