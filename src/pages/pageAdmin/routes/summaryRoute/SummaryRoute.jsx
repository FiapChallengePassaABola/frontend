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
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>
        <Card>
          <Gauge
            width={100}
            height={100}
            value={60}
            startAngle={-90}
            endAngle={90}
            color="green"
          ></Gauge>
        </Card>
        <Card></Card>
      </Box>
      <Card></Card>
    </Box>
  );
}
