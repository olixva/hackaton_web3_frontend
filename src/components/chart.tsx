// src/components/Chart.tsx
import { useEffect, useState } from "react";
import { Constants } from "@/constants";
import { Loader2 } from "lucide-react";
import {
  getChartWithStep,
  type ChartResponse,
} from "@/services/chartService.service";
import { StepsEnum } from "@/enums/steps.enum";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig = {
  price: {
    label: "Precio (€)",
    color: "#85d781",
  },
  kw: {
    label: "Consumo (kWh)",
    color: "#85d781ac",
  },
} satisfies ChartConfig;

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((+d - +yearStart) / 86400000 + 1) / 7);
}

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
  const [chart, setChart] = useState<ChartResponse | null>(null);
  const [showPrice, setShowPrice] = useState(true);
  const [step, setStep] = useState<StepsEnum>(StepsEnum.Daily);
  const [loading, setLoading] = useState(true);

  const userId = Constants.userId;

  useEffect(() => {
    setLoading(true);

    getChartWithStep(userId, step)
      .then((data) => setChart(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [userId, step]);

  if (loading) {
    return (
      <Card className="w-full mt-4 rounded-3xl">
        <CardHeader>
          <CardTitle>Cargando datos…</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[220px]">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </CardContent>
      </Card>
    );
  }

  if (!chart) return <p>Error cargando chart</p>;

  const data = chart.chart.map((point) => ({
    label: formatLabel(point.timestamp, step),
    price: point.price,
    kw: point.kw,
  }));

  const activeKey = showPrice ? "price" : "kw";

  return (
    <div className="m-[25px]">
      <Card className="w-full mt-4 rounded-3xl">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {showPrice ? "Precio" : "Consumo"}
            </CardTitle>

            <div className="flex items-center gap-1 bg-muted rounded-full px-1 py-0.5">
              <button
                className={`px-2 py-1 text-xs rounded-full ${!showPrice ? "bg-background" : "text-muted-foreground"
                  }`}
                onClick={() => setShowPrice(false)}
              >
                kWh
              </button>
              <button
                className={`px-2 py-1 text-xs rounded-full ${showPrice ? "bg-background" : "text-muted-foreground"
                  }`}
                onClick={() => setShowPrice(true)}
              >
                €
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStep(StepsEnum.Hourly)}
              className={`flex-1 py-1.5 text-xs rounded-full border ${step === StepsEnum.Hourly
                ? "bg-[#85d781] text-white border-[#85d781]"
                : "bg-transparent text-[#85d781] border-[#85d781]/40"
                }`}
            >
              Hora
            </button>
            <button
              onClick={() => setStep(StepsEnum.Daily)}
              className={`flex-1 py-1.5 text-xs rounded-full border ${step === StepsEnum.Daily
                ? "bg-[#85d781] text-white border-[#85d781]"
                : "bg-transparent text-[#85d781] border-[#85d781]/40"
                }`}
            >
              Día
            </button>
            <button
              onClick={() => setStep(StepsEnum.Weekly)}
              className={`flex-1 py-1.5 text-xs rounded-full border ${step === StepsEnum.Weekly
                ? "bg-[#85d781] text-white border-[#85d781]"
                : "bg-transparent text-[#85d781] border-[#85d781]/40"
                }`}
            >
              Semana
            </button>
            <button
              onClick={() => setStep(StepsEnum.Monthly)}
              className={`flex-1 py-1.5 text-xs rounded-full border ${step === StepsEnum.Monthly
                ? "bg-[#85d781] text-white border-[#85d781]"
                : "bg-transparent text-[#85d781] border-[#85d781]/40"
                }`}
            >
              Mes
            </button>
          </div>
        </CardHeader>

        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="min-h-[220px] w-full"
          >
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
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
