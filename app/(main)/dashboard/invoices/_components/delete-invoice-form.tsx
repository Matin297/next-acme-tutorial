"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { type SubmitEvent, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { deleteInvoice } from "../actions";

export default function DeleteInvoiceForm({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    startTransition(async () => {
      const result = await deleteInvoice(id);
      if (result.success) {
        toast.success("Invoice deleted successfully");
        return;
      }

      toast.error(result.error, { dismissible: true });
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        variant="destructive"
        size="icon"
        disabled={isPending}
        className="rounded-full"
      >
        {isPending ? <Spinner /> : <TrashIcon />}
      </Button>
    </form>
  );
}
