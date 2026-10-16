import type { VariantProps } from "class-variance-authority";
import type { Route } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkButtonProps<T extends string>
  extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  href: Route<T>;
}

export default function LinkButton<T extends string>({
  children,
  href,
  className,
  variant = "link",
  ...sizeProps
}: LinkButtonProps<T>) {
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
