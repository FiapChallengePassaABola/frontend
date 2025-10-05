import { useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { ChartTooltip, ChartTooltipContent } from "./chart";

const chartData = [
  { date: "2025-07-15", velocidade: 450, forca: 300 },
  { date: "2025-07-16", velocidade: 380, forca: 420 },
  { date: "2025-07-17", velocidade: 520, forca: 120 },
  { date: "2025-07-18", velocidade: 140, forca: 550 },
  { date: "2025-07-19", velocidade: 600, forca: 350 },
  { date: "2025-07-20", velocidade: 480, forca: 400 },
];

const chartConfig = {
  velocidade: {
    label: "Velocidade",
    color: "#059669",
  },
  forca: {
    label: "Força",
    color: "#047857",
  },
};

export function ChartTooltipDefault() {
  const [active, setActive] = useState("resumo");

  const renderChart = () => {
    if (active === "velocidade") {
      const pieData = chartData.map((d) => ({
        name: new Date(d.date).toLocaleDateString("pt-BR"),
        value: d.velocidade,
      }));
      const colors = [chartConfig.velocidade.color, chartConfig.forca.color];
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill={chartConfig.velocidade.color}
              label
              isAnimationActive={true}
            />
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
            <ReTooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (active === "forca") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("pt-BR", {
                  weekday: "short",
                })
              }
            />
            <YAxis />
            <Line
              type="monotone"
              dataKey="forca"
              stroke={chartConfig.forca.color}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <ReTooltip />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    // default resumo (stacked bars)
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => {
              return new Date(value).toLocaleDateString("pt-BR", {
                weekday: "short",
              });
            }}
          />
          <Bar
            dataKey="velocidade"
            stackId={"a"}
            fill={chartConfig.velocidade.color}
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="forca"
            stackId={"a"}
            fill={chartConfig.forca.color}
            radius={[4, 4, 0, 0]}
          />
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-800">Desempenho da Jogadora</CardTitle>
        <CardDescription className="text-gray-600">
          Acompanhe sua evolução nos treinos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex gap-2">
          <button
            onClick={() => setActive("resumo")}
            className={`px-3 py-1 rounded-md font-medium ${
              active === "resumo"
                ? "bg-green-900 text-white"
                : "bg-white/10 text-gray-800"
            }`}
          >
            Resumo
          </button>
          <button
            onClick={() => setActive("velocidade")}
            className={`px-3 py-1 rounded-md font-medium ${
              active === "velocidade"
                ? "bg-green-900 text-white"
                : "bg-white/10 text-gray-800"
            }`}
          >
            Velocidade
          </button>
          <button
            onClick={() => setActive("forca")}
            className={`px-3 py-1 rounded-md font-medium ${
              active === "forca"
                ? "bg-green-900 text-white"
                : "bg-white/10 text-gray-800"
            }`}
          >
            Força
          </button>
        </div>

        <div className="w-full h-[300px]">{renderChart()}</div>
      </CardContent>
    </Card>
  );
}
