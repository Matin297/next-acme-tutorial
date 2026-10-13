import type { VariantProps } from "class-variance-authority";
import type { Route } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LinkButton({
  children,
  href,
  className,
  variant = "link",
  ...sizeProps
}: {
  children: React.ReactNode;
  className?: string;
  href: Route;
} & VariantProps<typeof buttonVariants>) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant, ...sizeProps }),
        "text-sm",
        className,
      )}
    >
      {children}
    </Link>
  );
}
