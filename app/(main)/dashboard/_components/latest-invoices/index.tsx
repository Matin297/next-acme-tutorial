import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent, CardFooter } from "@/components/ui/card";
import { formatNumber, getNameInitials } from "@/lib/utils";
import { fetchLatestInvoices } from "../../data";

export default async function LatestInvoices() {
  const { data: invoices, lastUpdated } = await fetchLatestInvoices(5);

  return (
    <>
      <CardContent className="grow">
        <ul className="divide-y">
          {invoices.map(({ id, amount, customer }) => (
            <li key={id} className="flex gap-2 p-2 items-center">
              <Avatar>
                <AvatarImage
                  src={customer.imageUrl ?? ""}
                  alt={customer.name}
                  className="grayscale"
                />
                <AvatarFallback>
                  {getNameInitials(customer.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-extrabold">{customer.name}</p>
                <p className="text-xs text-muted-foreground">
                  {customer.email}
                </p>
              </div>
              <p className="ml-auto font-bold">${formatNumber(amount)}</p>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="text-muted-foreground gap-1">
        <ArrowPathIcon className="w-4" />
        <p className="text-xs">
          {formatDistanceToNow(lastUpdated, {
            addSuffix: true,
          })}
        </p>
      </CardFooter>
    </>
  );
}

export { default as LatestInvoicesFallback } from "./skeleton";
