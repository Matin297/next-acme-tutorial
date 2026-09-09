"use client";

import {
  DocumentCurrencyDollarIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import LinkButton from "@/components/link-button";
import { cn } from "@/lib/utils";

const LINKS: { href: Route; title: string; icon: React.ReactNode }[] = [
  {
    href: "/dashboard",
    title: "Home",
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    href: "/dashboard/invoices",
    title: "Invoices",
    icon: <DocumentCurrencyDollarIcon className="w-5 h-5" />,
  },
  {
    href: "/dashboard/customers",
    title: "Customers",
    icon: <UsersIcon className="w-5 h-5" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col">
      {LINKS.map(({ href, title, icon }) => (
        <li key={href}>
          <LinkButton
            className={cn({
              "font-bold text-amber-500": pathname === href,
            })}
            href={href}
          >
            {icon}
            {title}
          </LinkButton>
        </li>
      ))}
    </ul>
  );
}
