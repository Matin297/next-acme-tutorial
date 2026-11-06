"use client";

import {
  CheckIcon,
  ShieldExclamationIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Spinner } from "@/components/ui/spinner";
import { type AccountAvailabilityStatus, emailSchema } from "../types";

type TStatus =
  | "idle"
  | "loading"
  | Exclude<AccountAvailabilityStatus, "invalid">;

const STATUS_TEXT: Record<TStatus, string> = {
  idle: "",
  loading: "",
  available: "Email is available.",
  unavailable: "",
  rate_limited: "Too many checks. Please wait a moment.",
  error: "Couldn't check availability. You can still submit.",
};

const STATUS_ICON: Record<TStatus, ReactNode> = {
  idle: null,
  loading: <Spinner />,
  available: <CheckIcon className="text-green-600" />,
  unavailable: <XMarkIcon className="text-red-600" />,
  rate_limited: <ShieldExclamationIcon className="text-amber-600" />,
  error: <ShieldExclamationIcon className="text-amber-600" />,
};

interface Options {
  delay?: number;
  handleAvailable?: VoidFunction;
  handleUnavailable?: (message: string) => void;
}

export async function checkAccountAvailability(
  email: string,
  signal: AbortSignal,
): Promise<{ status: AccountAvailabilityStatus; message: string }> {
  const res = await fetch("/api/auth/account-availability", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    signal,
  });

  return res.json();
}

export function useAccountAvailability({
  delay = 500,
  handleAvailable,
  handleUnavailable,
}: Options = {}) {
  const abortController = useRef<AbortController | null>(null);
  const [status, setStatus] = useState<TStatus>("idle");

  useEffect(() => {
    return () => {
      abortController.current?.abort();
    };
  }, []);

  function resetAbortController() {
    abortController.current?.abort();
    abortController.current = null;
  }

  const debouncedAvailabilityCheck = useDebouncedCallback(
    async (email: string) => {
      const parsedEmail = emailSchema.safeParse(email);

      if (!parsedEmail.success) {
        return;
      }

      resetAbortController();

      const controller = new AbortController();
      abortController.current = controller;

      setStatus("loading");

      try {
        const availability = await checkAccountAvailability(
          parsedEmail.data,
          abortController.current.signal,
        );

        switch (availability.status) {
          case "available":
            setStatus("available");
            handleAvailable?.();
            break;
          case "unavailable":
            setStatus("unavailable");
            handleUnavailable?.(availability.message);
            break;
          case "rate_limited":
            setStatus("rate_limited");
            break;
          default:
            setStatus("error");
        }
      } catch {
        if (controller.signal.aborted) {
          return;
        }
        setStatus("error");
      }
    },
    delay,
  );

  function handleChange(email: string) {
    setStatus("idle");
    resetAbortController();
    debouncedAvailabilityCheck(email);
  }

  function reset() {
    setStatus("idle");
    resetAbortController();
    debouncedAvailabilityCheck.cancel();
  }

  return {
    status,
    reset,
    handleChange,
    isPending: status === "loading",
    statusText: STATUS_TEXT[status],
    statusIcon: STATUS_ICON[status],
    flush: debouncedAvailabilityCheck.flush,
  };
}
