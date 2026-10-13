"use client";

import { formatDistanceToNow } from "date-fns";

export default function DateInfo({ date }: { date: Date }) {
  return (
    <p className="text-xs">
      {formatDistanceToNow(date, {
        addSuffix: true,
      })}
    </p>
  );
}
