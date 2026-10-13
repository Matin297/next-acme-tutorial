import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";

export default function CreateInvoiceSkeleton() {
  return (
    <FieldSet aria-label="Loading invoice form" aria-busy="true">
      <FieldGroup>
        <FieldLegend>
          <Skeleton className="h-6 w-32" />
        </FieldLegend>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-9 w-full" />
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-9 w-full" />
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-9 w-full" />
        </div>

        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-14" />

          <div className="flex flex-col gap-3">
            {[1, 2].map((status) => (
              <Skeleton key={status} className="h-9 w-full" />
            ))}
          </div>
        </div>
      </FieldGroup>

      <section className="mt-4 flex items-center justify-end gap-4">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-24" />
      </section>
    </FieldSet>
  );
}
