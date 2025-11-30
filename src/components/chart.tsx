import { useEffect, useState } from "react";
import { Constants } from "@/constants";
import {
  getChartWithStep,
  type ChartResponse,
} from "@/services/chartService.service";
import { StepsEnum } from "@/enums/steps.enum";
import "./chart.css";
import cardGraficos from "@/assets/card_graficos.png";

// Imports custom UI components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Imports bar chart components from Recharts
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// Imports chart configuration and components
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

// Chart color and label configuration
const chartConfig = {
  price: {
    label: "Price (€)",
    color: "#85d781",
  },
  kw: {
    label: "Consumption (kWh)",
    color: "#85d781ac",
  },
} satisfies ChartConfig;

// Calculates the ISO week number from a date
function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((+d - +yearStart) / 86400000 + 1) / 7);
}

// Formats X-axis labels based on interval type (hourly, daily, weekly, monthly)
function formatLabel(timestamp: string, step: StepsEnum): string {
  const date = new Date(timestamp);

  switch (step) {
    case StepsEnum.Hourly:
      return date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      });

    case StepsEnum.Daily:
      return date.toLocaleDateString("es-ES", {
        weekday: "short",
      });

    case StepsEnum.Weekly:
      return getWeekRangeLabel(date);

    case StepsEnum.Monthly:
      return date.toLocaleDateString("es-ES", {
        month: "short",
      });

    default:
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
      });
  }
}

// Generates a label with the date range of a week (e.g., 25-31)
function getWeekRangeLabel(date: Date): string {
  const jsDay = date.getDay() || 7;

  const start = new Date(date);
  start.setDate(date.getDate() - (jsDay - 1));

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const startStr = start.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
  });

  const endStr = end.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
  });

  return `${startStr}-${endStr}`;
}

export function Chart() {
  // State variables to manage chart data, display mode, and loading state
  const [chart, setChart] = useState<ChartResponse | null>(null);
  const [showPrice, setShowPrice] = useState(true);
  const [step, setStep] = useState<StepsEnum>(StepsEnum.Daily);
  const [loading, setLoading] = useState(true);

  // Gets the user ID from constants
  const userId = Constants.userId;

  // Fetches chart data when the selected interval step changes
  useEffect(() => {
    setLoading(true);

    getChartWithStep(userId, step)
      .then((data) => setChart(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [userId, step]);

  // Shows a skeleton loader while chart data is loading
  if (loading) {
    return (
      <div className="m-[15px]">
        <Card
          className="w-full mt-4 rounded-3xl bg-cover bg-center"
          style={{ backgroundImage: `url(${cardGraficos})` }}
        >
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-white skeleton-text">
                Loading...
              </CardTitle>
              <div className="flex items-center gap-1 bg-muted rounded-full px-1 py-0.5">
                <div className="px-2 py-1 text-xs rounded-full skeleton-text w-8 h-6"></div>
                <div className="px-2 py-1 text-xs rounded-full skeleton-text w-8 h-6"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 py-1.5 text-xs rounded-full border skeleton-text h-7"></div>
              <div className="flex-1 py-1.5 text-xs rounded-full border skeleton-text h-7"></div>
              <div className="flex-1 py-1.5 text-xs rounded-full border skeleton-text h-7"></div>
              <div className="flex-1 py-1.5 text-xs rounded-full border skeleton-text h-7"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="min-h-[220px] w-full flex items-end justify-around gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="skeleton-bar"
                  style={{
                    height: `${Math.random() * 60 + 20}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Validates if data loaded correctly
  if (!chart) return <p>Error loading chart</p>;

  // Transforms API data to Recharts expected format
  const data = chart.chart.map((point) => ({
    label: formatLabel(point.timestamp, step),
    price: point.price,
    kw: point.kw,
  }));

  // Determines which data is currently displayed (price or consumption)
  const activeKey = showPrice ? "price" : "kw";

  return (
    <div className="m-[15px]">
      <Card
        className="w-full mt-4 rounded-3xl bg-cover bg-center"
        style={{ backgroundImage: `url(${cardGraficos})` }}
      >
        <CardHeader className="space-y-4">
          {/* Header with dynamic title based on active display */}
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-white">
              {showPrice ? "Price" : "Consumption"}
            </CardTitle>

            {/* Buttons to switch between price and consumption display */}
            <div className="flex items-center gap-1 bg-[#85D781] rounded-full px-1 py-0.5">
              <button
                onClick={() => setShowPrice(false)}
                className={`
      px-3 py-1 text-xs font-semibold rounded-full transition
      ${!showPrice
                    ? "bg-black text-white"       // active (kWh)
                    : "bg-transparent text-white"}             // inactive
    `}
              >
                kWh
              </button>

              <button
                onClick={() => setShowPrice(true)}
                className={`
      px-3 py-1 text-xs font-semibold rounded-full transition
      ${showPrice
                    ?   "bg-black text-white"         // active (€)
                    : "bg-transparent text-white"}             // inactive
    `}
              >
                €
              </button>
            </div>
          </div>
          {/* Buttons to change display interval (hour, day, week, month) */}
          <div className="flex gap-2">
            <button
              onClick={() => setStep(StepsEnum.Hourly)}
              className={`flex-1 py-1.5 text-xs rounded-full border ${
                step === StepsEnum.Hourly
                  ? "bg-[#85d781] text-white border-[#85d781]"
                  : "bg-[#e5ffe4] text-[#85d781] border-[#85d781]/40"
              }`}
            >
              Hour
            </button>
            <button
              onClick={() => setStep(StepsEnum.Daily)}
              className={`flex-1 py-1.5 text-xs rounded-full border ${
                step === StepsEnum.Daily
                  ? "bg-[#85d781] text-white border-[#85d781]"
                  : "bg-[#e5ffe4] text-[#85d781] border-[#85d781]/40"
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setStep(StepsEnum.Weekly)}
              className={`flex-1 py-1.5 text-xs rounded-full border ${
                step === StepsEnum.Weekly
                  ? "bg-[#85d781] text-white border-[#85d781]"
                  : "bg-[#e5ffe4] text-[#85d781] border-[#85d781]/40"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setStep(StepsEnum.Monthly)}
              className={`flex-1 py-1.5 text-xs rounded-full border ${
                step === StepsEnum.Monthly
                  ? "bg-[#85d781] text-white border-[#85d781]"
                  : "bg-[#e5ffe4] text-[#85d781] border-[#85d781]/40"
              }`}
            >
              Month
            </button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Interactive bar chart using Recharts */}
          <ChartContainer config={chartConfig} className="min-h-[220px] w-full">
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend
                className="text-white"
                content={<ChartLegendContent />}
              />
              <Bar
                dataKey={activeKey}
                radius={4}
                fill={`var(--color-${activeKey})`}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
