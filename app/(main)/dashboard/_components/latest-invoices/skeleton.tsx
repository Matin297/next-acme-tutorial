import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON = [1, 2, 3, 4, 5];

export default function LatestInvoicesFallback() {
  return (
    <CardContent>
      <ul className="divide-y">
        {SKELETON.map((item) => (
          <li key={item} className="flex gap-2 p-2 items-center">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-36" />
              <Skeleton className="h-2 w-25" />
            </div>
            <Skeleton className="h-3 w-10 ml-auto" />
          </li>
        ))}
      </ul>
    </CardContent>
  );
}
