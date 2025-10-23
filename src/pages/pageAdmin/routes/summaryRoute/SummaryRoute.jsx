import React from "react";
import { Box, Paper, Typography, Button, styled } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";

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
  return (
    <Box
      sx={{
        width: "100%",
        color: "#fff",
        height: "100%",
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
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
              width: "100%",
              height: "100%",
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
                  fontSize: 20,
                  fontWeight: 600,
                  transform: "translate(0px, 40px)",
                },
                "& text": {
                  fill: "#ffffff !important",
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
              width: "100%",
              height: "100%",
            }}
          >
            <Typography>Cores:</Typography>
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
      <Card
        sx={{
          flex: "1",
          width: "80%",
          height: "30%",
        }}
      >
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              area: true,
              color: "rgba(177, 108, 229, 0.63)",
            },
          ]}
          height={320}
          width={1150}
          margin={0}
        />
      </Card>
    </Box>
  );
}
