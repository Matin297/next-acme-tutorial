import { Spinner } from "@/components/ui/spinner";

export default function RevenueChartSkeleton() {
  return (
    <div className="flex items-center h-full">
      <Spinner className="size-6 mx-auto" />
    </div>
  );
}
