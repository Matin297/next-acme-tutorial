import type { Route } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LinkButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  href: Route;
}) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: "link" }), className)}
    >
      {children}
    </Link>
  );
}
