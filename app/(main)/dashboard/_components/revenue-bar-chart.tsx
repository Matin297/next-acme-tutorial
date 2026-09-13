"use client";

import { Bar, BarChart, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const CHART_CONFIG = {
  revenue: {
    label: "Revenue",
    color: "var(---acme-bar-chart)",
  },
} satisfies ChartConfig;

export default function RevenueBarChart({
  revenue,
}: {
  revenue: { month: string; revenue: number }[];
}) {
  return (
    <ChartContainer config={CHART_CONFIG} className="min-h-50 w-full">
      <BarChart accessibilityLayer data={revenue}>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" />
      </BarChart>
    </ChartContainer>
  );
}
