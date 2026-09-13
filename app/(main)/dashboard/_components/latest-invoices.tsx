import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatNumber, getNameInitials } from "@/lib/utils";
import type { TLatestInvoices } from "../data";

export default function LatestInvoices({
  invoices,
}: {
  invoices: TLatestInvoices;
}) {
  return (
    <ul className="divide-y">
      {invoices.map(({ id, amount, customer }) => (
        <li key={id} className="flex gap-2 p-2 items-center">
          <Avatar>
            <AvatarImage
              src={customer.imageUrl ?? ""}
              alt={customer.name}
              className="grayscale"
            />
            <AvatarFallback>{getNameInitials(customer.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-extrabold">{customer.name}</p>
            <p className="text-xs text-muted-foreground">{customer.email}</p>
          </div>
          <p className="ml-auto font-bold">${formatNumber(amount)}</p>
        </li>
      ))}
    </ul>
  );
}
