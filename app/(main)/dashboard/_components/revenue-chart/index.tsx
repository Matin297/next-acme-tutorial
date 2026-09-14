import { fetchRevenue } from "../../data";
import RevenueBarChart from "./chart";

export default async function RevenueChart() {
  const revenue = await fetchRevenue();
  return <RevenueBarChart revenue={revenue} />;
}

export { default as RevenueChartFallback } from "./skeleton";
