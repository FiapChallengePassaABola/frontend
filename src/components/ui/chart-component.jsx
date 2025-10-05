import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./card"
import {
    ChartTooltip,
    ChartTooltipContent
} from "./chart"

const chartData = [
  { date: "2024-07-15", velocidade: 450, forca: 300 },
  { date: "2024-07-16", velocidade: 380, forca: 420 },
  { date: "2024-07-17", velocidade: 520, forca: 120 },
  { date: "2024-07-18", velocidade: 140, forca: 550 },
  { date: "2024-07-19", velocidade: 600, forca: 350 },
  { date: "2024-07-20", velocidade: 480, forca: 400 },
]

const chartConfig = {
  velocidade: {
    label: "Velocidade",
    color: "#059669",
  },
  forca: {
    label: "Força",
    color: "#047857",
  },
}

export function ChartTooltipDefault() {
  return (
            <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-800">Desempenho da Jogadora</CardTitle>
        <CardDescription className="text-gray-600">
          Acompanhe sua evolução nos treinos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
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
                  })
                }}
              />
              <Bar
                dataKey="velocidade"
                stackId="a"
                fill="#059669"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="forca"
                stackId="a"
                fill="#047857"
                radius={[4, 4, 0, 0]}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
