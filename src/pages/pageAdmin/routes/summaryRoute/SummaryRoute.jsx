import React from "react";
import { Box, Paper, Typography, Button, styled } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { LineChart,  } from "@mui/x-charts/LineChart";
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';
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
  startAngle: -90,
  endAngle: 90,
};

export default function SummaryPage() {
  
    useEffect(() => {
    const chartElement = document.querySelector('.MuiCharts-root');
    if (chartElement) {
      chartElement.style.setProperty('--MuiCharts-axis-line', '#fff');
      chartElement.style.setProperty('--MuiCharts-axis-tickLabel', '#fff');
      chartElement.style.setProperty('--MuiCharts-grid-line', '#fff');
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
        gap: 1,
        padding: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "80%",
          height: "42%",
          gap: 3,
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
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Gauge
              {...settings}
              cornerRadius="50%"
              sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 40,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: "#8B5DE4",
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: "#FEFFFE",
                },
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 40,
                  fill: "#ffffff",
                  transform: "translate(0px, -60px)",
                },
                [`& .${gaugeClasses.text}`]: {
                  fill: "#ffffff", // cor do texto adicional ("Goal")
                  fontWeight: 600,
                  transform: "translate(0px, 40px)",
                },
                "& text": {
                  fill: "#ffffff !important",
                  fontSize: "2vmax",
                },
                color: "white",
                width: "85%",
                height: "85%",
              })}
              text={`Meta:`}
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
              flexDirection: "column",
              width: "90%",
              height: "80%",
            }}
          >
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, color: "#FFFF" },
                    { id: 1, value: 15, color: "#A17AED" },
                    { id: 2, value: 20, color: "#CEA3E6" },
                  ],
                  innerRadius: 50,
                  outerRadius: 100,
                },
              ]}
              width={200}
              height={200}
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
          flex: "1",
          width: "80%",
          display: "flex",
          flexDirection:"row",
          justifyContent: "center",
          alignItems:"center",
          backgroundColor: "#157259",
          margin: 0,
          padding: 0,
        }}
      >
       
       <LineChart
          sx={{
              [`& .${chartsGridClasses.line}`]: {
                stroke: "#fff", // cor das linhas do grid
                    },
              "& .MuiChartsAxis-line": {
                stroke: "#fff", // cor das linhas do eixo
              },
              "& .MuiChartsAxis-tickLabel": {
                fill: "#fff", // cor dos textos dos ticks
              },
              "& .MuiChartsAxis-tick": {
                stroke: "#fff",
              },
          }}
          xAxis={[{
             data: [1, 2, 3, 5, 8, 10],
           }]}
          grid={{ vertical: true, horizontal: true }}

          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              area: true,
              label: "string",
              color: "rgba(177, 108, 229, 0.63)",
            },
          ]}
          height={240}
          width={850}
        /> 
        
      </Box>
      <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",
        minWidth:"80%",
        minHeight:"5%",
        gap: 4,
      }}
      >
        <Botao
          children={"Export Data"}
        >
        </Botao>
        <Botao
          children={"AI Summary"}

        ></Botao>
      </Box>
    </Box>
  );
}
