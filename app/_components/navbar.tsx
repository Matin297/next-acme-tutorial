"use client";

import { usePathname } from "next/navigation";
import LinkButton from "@/components/link-button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="container mx-auto">
      <ul className="flex items-center">
        <li>
          <LinkButton className={cn({ underline: pathname === "/" })} href="/">
            Home
          </LinkButton>
        </li>
      </ul>
    </nav>
  );
}
