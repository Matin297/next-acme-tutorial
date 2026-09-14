import { Spinner } from "@/components/ui/spinner";

export default function HomeLoading() {
  return (
    <div className="flex items-center h-full">
      <Spinner className="size-8 grow" />
    </div>
  );
}
