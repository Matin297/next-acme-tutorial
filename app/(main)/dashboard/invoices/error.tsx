"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="flex h-full flex-col items-center justify-center max-w-md mx-auto">
      <h2 className="text-lg font-medium text-center mb-1 text-red-600">
        😕 Ops! Something went wrong.
      </h2>
      {error.message && <p>{error.message}</p>}
      <Button type="button" onClick={reset} className="mt-5">
        <ArrowPathIcon /> Try again
      </Button>
    </section>
  );
}
