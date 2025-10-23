import React from "react";
import { Box, Paper, Typography, Button, styled } from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";

const Card = styled(Paper)({
  backgroundColor: "#157259",
  color: "#fff",
  borderRadius: 12,
  padding: 16,
  boxShadow: "none",
});

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
            Sign Ups: Per Month
          </Typography>
          <Card
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <Gauge
              width={100}
              height={100}
              value={60}
              startAngle={-90}
              endAngle={90}
            ></Gauge>
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
              width: "100%",
              height: "100%",
            }}
          ></Card>
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
      ></Card>
    </Box>
  );
}
