import { Constants } from "@/constants";
import { StepsEnum } from "@/enums/steps.enum";

const API_URL = Constants.API_URL

export interface ChartPoint {
  timestamp: string;
  price: number;
  kw: number;
}

export interface ChartResponse {
  chart: ChartPoint[];
}

export async function getChart(userId: string): Promise<ChartResponse> {
  const res = await fetch(`${API_URL}/meter/chart?user_id=${userId}&step=weekly`);
  if (!res.ok) throw new Error("Error obteniendo el chart");
  return res.json();
}

export async function getChartWithStep(
  userId: string,
  step?: StepsEnum
): Promise<ChartResponse> {
  const params = new URLSearchParams({ user_id: userId });
  if (step) params.append("step", step);

  const res = await fetch(`${API_URL}/meter/chart?${params.toString()}`);
  if (!res.ok) throw new Error("Error obteniendo el chart");
  return res.json();
}
