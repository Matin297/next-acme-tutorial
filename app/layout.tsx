import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { cn } from "@/lib/utils";
import { geistSans, jetbrainsMono } from "./fonts";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "ACME",
  description: "Nextjs playground for all to try.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        geistSans.variable,
        jetbrainsMono.variable,
        "font-mono",
        "antialiased",
      )}
    >
      <body>
        <Toaster />
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
