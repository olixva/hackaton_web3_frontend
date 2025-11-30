import { Constants } from "@/constants";
import { StepsEnum } from "@/enums/steps.enum";

// Base API URL for chart calls
const API_URL = Constants.API_URL

// Interface defining a data point on the chart
export interface ChartPoint {
  timestamp: string;
  price: number;
  kw: number;
}

// Interface defining the API response for chart data
export interface ChartResponse {
  chart: ChartPoint[];
}

// Fetches chart data for a user with default weekly interval
export async function getChart(userId: string): Promise<ChartResponse> {
  const res = await fetch(`${API_URL}/meter/chart?user_id=${userId}&step=weekly`);
  if (!res.ok) throw new Error("Error fetching chart");
  return res.json();
}

// Fetches chart data with custom time interval
export async function getChartWithStep(
  userId: string,
  step?: StepsEnum
): Promise<ChartResponse> {
  const params = new URLSearchParams({ user_id: userId });
  if (step) params.append("step", step);

  const res = await fetch(`${API_URL}/meter/chart?${params.toString()}`);
  if (!res.ok) throw new Error("Error fetching chart");
  return res.json();
}
