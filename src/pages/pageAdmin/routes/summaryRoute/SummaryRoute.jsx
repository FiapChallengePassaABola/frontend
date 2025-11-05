import React from "react";
import { Box, Paper, Typography, Button, styled } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { PieChart, pieClasses } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { chartsGridClasses } from "@mui/x-charts/ChartsGrid";
import { useEffect } from "react";
import Botao from "./components/Botao";
import {
  signUpsMocked,
  matchesMocked,
  activeUsers,
} from "./store/dashboardData";

const Card = styled(Paper)({
  backgroundColor: "#157259",
  color: "#fff",
  borderRadius: 12,
  padding: 16,
  boxShadow: "none",
});

export default function SummaryPage() {
  const [value] = React.useState(signUpsMocked[0].signUps);
  const [valueMax, setValueMax] = React.useState(signUpsMocked[0].goal);
  const [isEditingGoal, setIsEditingGoal] = React.useState(false);
  const [newGoal, setNewGoal] = React.useState("");
  const [chartDimensions, setChartDimensions] = React.useState({
    width: 1000,
    height: 350,
  });
  const chartContainerRef = React.useRef(null);

  useEffect(() => {
    const chartElement = document.querySelector(".MuiCharts-root");
    if (chartElement) {
      chartElement.style.setProperty("--MuiCharts-axis-line", "#fff");
      chartElement.style.setProperty("--MuiCharts-axis-tickLabel", "#fff");
      chartElement.style.setProperty("--MuiCharts-grid-line", "#fff");
    }
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (chartContainerRef.current) {
        const container = chartContainerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;
        setChartDimensions({
          width: Math.max(width - 40, 300), // -40 para margem
          height: Math.max(height - 40, 200), // -40 para margem
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "80vh",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 2, md: 3 },
        padding: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
          gap: { xs: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: "1",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.4vmax",
              fontWeight: "700",
            }}
          >
            Contas Criadas: Por mês
          </Typography>
          <Card
            sx={{
              width: { xs: "95%", sm: "90%" },
              height: { xs: "250px", sm: "300px", md: "350px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: "100%",
                mb: 2,
              }}
            >
              {isEditingGoal ? (
                <>
                  <input
                    type="number"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "4px",
                      padding: "8px",
                      color: "white",
                      width: "80px",
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (newGoal && !isNaN(newGoal)) {
                        setValueMax(Number(newGoal));
                        setIsEditingGoal(false);
                        setNewGoal("");
                      }
                    }}
                    sx={{
                      color: "white",
                      borderColor: "white",
                      "&:hover": {
                        borderColor: "#8B5DE4",
                        color: "#8B5DE4",
                      },
                    }}
                    variant="outlined"
                    size="small"
                  >
                    Salvar
                  </Button>
                </>
              ) : (
                <>
                  <Typography>Meta: {valueMax}</Typography>
                  <Button
                    onClick={() => {
                      setIsEditingGoal(true);
                      setNewGoal(valueMax.toString());
                    }}
                    sx={{
                      color: "white",
                      borderColor: "white",
                      minWidth: "30px",
                      padding: "2px",
                      "&:hover": {
                        borderColor: "#8B5DE4",
                        color: "#8B5DE4",
                      },
                    }}
                    variant="outlined"
                    size="small"
                  >
                    ✎
                  </Button>
                </>
              )}
            </Box>

            <Gauge
              value={value}
              valueMax={valueMax}
              startAngle={-90}
              endAngle={90}
              cornerRadius="50%"
              sx={{
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: "#8B5DE4",
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: "#FEFFFE",
                },
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: { xs: "1.2vmax", sm: "2vmax" },
                  fill: "#ffffff",
                  transform: "translateY(-60px)",
                },
                [`& .${gaugeClasses.text}`]: {
                  fill: "#ffffff",
                  fontWeight: 600,
                  fontSize: { xs: ".8vmax", sm: "1vmax" },
                  transform: "translateY(40px)",
                },
                "& text": {
                  fill: "#ffffff !important",
                },
                width: { xs: "100%", sm: "90%", md: "85%" },
                height: { xs: "200px", sm: "250px", md: "300px" },
                margin: "auto",
              }}
              text={`Contas: ${value}`}
              textDecoration={"white"}
            />
          </Card>
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: "1",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.4vmax",
              fontWeight: "700",
            }}
          >
            Partidas em Andamento
          </Typography>

          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "95%", sm: "90%" },
              height: { xs: "250px", sm: "300px", md: "350px" },
              position: "relative",
            }}
          >
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value:
                        matchesMocked[0].matches -
                        matchesMocked[0].completed -
                        matchesMocked[0].onHold,
                      color: "#FFFF",
                      label: "Ainda não feitos",
                    },
                    {
                      id: 1,
                      value: matchesMocked[0].completed,
                      color: "#A17AED",
                      label: "Concluídos",
                    },
                    {
                      id: 2,
                      value: matchesMocked[0].onHold,
                      color: "#CEA3E6",
                      label: "Em andamento",
                    },
                  ],
                  innerRadius: 50,
                  outerRadius: 100,
                },
              ]}
              width={300}
              height={300}
              sx={{
                [`& .MuiChartsLegend-label`]: {
                  stroke: "white",
                  color: "white",
                },
              }}
            />
          </Card>
        </Box>
      </Box>
      <Box
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          padding: 0,
          margin: 0,
        }}
      >
        <Box
          sx={{
            width: "40%",
            height: "0.2px",
            backgroundColor: "gray",
          }}
        ></Box>
        <Typography
          sx={{
            fontSize: "2vmax",
            fontWeight: "700",
          }}
        >
          DashBoard
        </Typography>
        <Box
          sx={{
            width: "40%",
            height: "0.2px",
            backgroundColor: "gray",
          }}
        ></Box>
      </Box>
      <Box
        ref={chartContainerRef}
        sx={{
          width: "90%",
          backgroundColor: "#157259",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <LineChart
          sx={{
            width: "100% !important",
            height: "100% !important",
            [`& .${chartsGridClasses.line}`]: {
              stroke: "#fff !important",
            },
            "& .MuiChartsAxis-line": {
              stroke: "#fff !important",
            },
            "& .MuiChartsAxis-tickLabel": {
              fill: "#fff !important",
            },
            "& .MuiChartsAxis-tick": {
              stroke: "#fff !important",
            },
          }}
          xAxis={[
            {
              data: activeUsers.map((item) => item.period),
              scaleType: "band",
            },
          ]}
          grid={{ vertical: true, horizontal: true }}
          series={[
            {
              data: activeUsers.map((item) => item.users),
              area: true,
              color: "rgba(177, 108, 229, 0.63)",
              label: "Usuários Ativos",
            },
          ]}
          width={chartDimensions.width}
          height={chartDimensions.height}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          minWidth: "80%",
          minHeight: "5%",
          gap: 4,
        }}
      >
        <Botao children={"Export Data"}></Botao>
        <Botao children={"AI Summary"}></Botao>
      </Box>
    </Box>
  );
}
