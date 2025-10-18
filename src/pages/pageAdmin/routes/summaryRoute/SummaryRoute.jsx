import React from "react";
import { Box, Paper, Typography, Button, styled } from "@mui/material";
import {
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  signUpsMocked,
  matchesMocked,
  activeUsers,
} from "./store/dashboardData";

const Card = styled(Paper)({
  background: "#0f4f3f",
  color: "#fff",
  borderRadius: 12,
  padding: 16,
  boxShadow: "none",
});

export default function SummaryPage() {
  const sign = signUpsMocked[0] || { signUps: 0, goal: 100 };
  const match = matchesMocked[0] || { completed: 0, onHold: 0 };

  const gaugePercent = Math.round((sign.signUps / sign.goal) * 100);
  const gaugeData = [{ name: "progress", value: gaugePercent }];

  const donutData = [
    { name: "Completed", value: match.completed },
    { name: "On-Hold", value: match.onHold },
  ];
  const donutColors = ["#8D34F9", "#34D399"]; // purple, green

  return (
    <Box sx={{ width: "100%", color: "#fff", padding: 4 }}>
      <Box sx={{ display: "flex", gap: 3, alignItems: "stretch", mb: 3 }}>
        <Card
          sx={{
            flex: 1,
            minHeight: 160,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ color: "#d6f8e9", mb: 1 }}>
            Sign Ups per: Month
          </Typography>
          <Box sx={{ width: "100%", height: 110 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="100%"
                barSize={16}
                data={gaugeData}
                startAngle={180}
                endAngle={-180}
              >
                <RadialBar
                  minAngle={15}
                  background
                  clockWise
                  dataKey="value"
                  cornerRadius={10}
                  fill="#8D34F9"
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>
              Goal: {sign.goal}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#fff" }}>
              {sign.signUps}
            </Typography>
          </Box>
        </Card>

        <Card
          sx={{
            flex: 1,
            minHeight: 160,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ color: "#d6f8e9", mb: 1 }}>
            Partidas
          </Typography>
          <Box sx={{ width: "100%", height: 110 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                  isAnimationActive={true}
                >
                  {donutData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={donutColors[index % donutColors.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" sx={{ color: "#e6fff0" }}>
              Completed: {match.completed} &nbsp; • &nbsp; On-Hold:{" "}
              {match.onHold}
            </Typography>
          </Box>
        </Card>
      </Box>

      <Typography
        variant="h4"
        sx={{ textAlign: "center", fontWeight: 800, mb: 2, color: "#fff" }}
      >
        DashBoard
      </Typography>

      <Card sx={{ width: "100%", mb: 3 }}>
        <Box sx={{ height: 320, padding: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={activeUsers}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8D34F9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8D34F9" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="period"
                tick={{ fill: "#dffae6" }}
                axisLine={false}
              />
              <YAxis tick={{ fill: "#dffae6" }} axisLine={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#8D34F9"
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" sx={{ color: "#fff", borderColor: "#fff" }}>
          Export Data
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#8D34F9", color: "#fff" }}
        >
          IA Summary
        </Button>
      </Box>
    </Box>
  );
}
