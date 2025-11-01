import React from "react";
import { Box, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Gauge } from "@mui/x-charts/Gauge";

// Exemplo de uso: <GaugeMUI value={140} max={200} />
export default function GaugeMUI({ value = 80, max = 200 }) {
  return (
    <Box
      sx={{
        width: 220,
        height: 140,
        background: "transparent",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: 0,
      }}
    >
      <Gauge
        value={value}
        startAngle={-90}
        endAngle={90}
        min={0}
        valueMax={max}
        cornerRadius="50%"
        sx={{
          width: 200,
          height: 120,
          position: "absolute",
          color: "white",
          top: 0,
          ".MuiGauge-valueText": {
            display: "none",
          },
          ".MuiGauge-valueArc": {
            fill: "#A259FF",
          },
          ".MuiGauge-referenceArc": {
            fill: "#FEFEFE",
          },
        }}
        showValue={false}
      />
      <Box
        sx={{
          position: "absolute",
          top: 55,
          left: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RemoveRedEyeIcon sx={{ fontSize: 38, color: "#ccc" }} />
        <Typography sx={{ color: "white", fontWeight: 600, fontSize: 28 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}
