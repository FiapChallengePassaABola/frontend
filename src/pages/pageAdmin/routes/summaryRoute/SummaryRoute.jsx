import React from "react";
import { Box, Paper, Typography, Button, styled } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { PieChart, pieClasses } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { chartsGridClasses } from "@mui/x-charts/ChartsGrid";
import { useEffect } from "react";
import Botao from "./components/Botao";

const Card = styled(Paper)({
  backgroundColor: "#157259",
  color: "#fff",
  borderRadius: 12,
  padding: 16,
  boxShadow: "none",
});

const settings = {
  value: 60,
  valueMax: 150,
  startAngle: -90,
  endAngle: 90,
};

export default function SummaryPage() {
  const value = settings["value"];
  const valueMax = settings["valueMax"];
  useEffect(() => {
    const chartElement = document.querySelector(".MuiCharts-root");
    if (chartElement) {
      chartElement.style.setProperty("--MuiCharts-axis-line", "#fff");
      chartElement.style.setProperty("--MuiCharts-axis-tickLabel", "#fff");
      chartElement.style.setProperty("--MuiCharts-grid-line", "#fff");
    }
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
              width: "90%",
              height: "80%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Gauge
              {...settings}
              cornerRadius="50%"
              sx={{
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: "#8B5DE4",
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: "#FEFFFE",
                },
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: { xs: "24px", sm: "32px", md: "40px" },
                  fill: "#ffffff",
                  transform: "translateY(-60px)",
                },
                [`& .${gaugeClasses.text}`]: {
                  fill: "#ffffff",
                  fontWeight: 600,
                  fontSize: { xs: "16px", sm: "20px", md: "24px" },
                  transform: "translateY(40px)",
                },
                "& text": {
                  fill: "#ffffff !important",
                },
                width: { xs: "100%", sm: "90%", md: "85%" },
                height: { xs: "200px", sm: "250px", md: "300px" },
                margin: "auto",
              }}
              text={`Meta: ${valueMax}`}
              textDecoration={"white"}
            />
            <Typography
              sx={{
                position: "relative",
                top: "-50%",
                fontSize: { xs: "1.8rem", sm: "2rem", md: "2.2rem" },
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              {value}
            </Typography>
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
                      value: 10,
                      color: "#FFFF",
                      label: "Ainda não feitos",
                    },
                    { id: 1, value: 15, color: "#A17AED", label: "Concluidos" },
                    {
                      id: 2,
                      value: 20,
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
        sx={{
          width: { xs: "95%", sm: "90%", md: "80%" },
          height: { xs: "500px", sm: "550px", md: "600px" },
          backgroundColor: "#157259",
          borderRadius: 2,
          p: { xs: 1, sm: 2, md: 3 },
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& > *": {
            minWidth: "100%",
            minHeight: "100%",
          },
        }}
      >
        <LineChart
          sx={{
            [`& .${chartsGridClasses.line}`]: {
              stroke: "#fff !important", // grid branco
            },
            "& .MuiChartsAxis-line": {
              stroke: "#fff !important", // eixo branco
            },
            "& .MuiChartsAxis-tickLabel": {
              fill: "#fff !important", // texto branco
            },
            "& .MuiChartsAxis-tick": {
              stroke: "#fff !important",
            },
          }}
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          grid={{ vertical: true, horizontal: true }}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              area: true,
              color: "rgba(177, 108, 229, 0.63)",
            },
          ]}
          height={450}
          width={1000}
          margin={{ left: 50, right: 50, top: 30, bottom: 50 }}
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
