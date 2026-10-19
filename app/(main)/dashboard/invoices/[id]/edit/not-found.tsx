import { ChevronLeftIcon, FaceFrownIcon } from "@heroicons/react/24/outline";
import LinkButton from "@/components/link-button";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <LinkButton href="/dashboard/invoices">
        <ChevronLeftIcon /> Go Back
      </LinkButton>
    </main>
  );
}
