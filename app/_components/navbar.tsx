"use client";

import { usePathname } from "next/navigation";
import LinkButton from "@/components/link-button";
import { cn } from "@/lib/utils";
import Logo from "./logo";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="container mx-auto flex items-center justify-between gap-5">
      <Logo />
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
