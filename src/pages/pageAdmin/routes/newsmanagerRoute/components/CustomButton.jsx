import React from "react";
import { Box, IconButton, Typography } from "@mui/material";

export default function CustomButton({ icon, text }) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <IconButton
        sx={{
          padding: "1rem 2.6rem",
          border: "1px solid white",
          borderRadius: 4,
          transition: "300ms",
          "&:hover": {
            backgroundColor: "rgba(141, 97, 228, 0.76)", // A cor de fundo ao passar o mouse
          },
        }}
      >
        {icon}
      </IconButton>
      <Typography sx={{ marginTop: 1, color: "white" }}>{text}</Typography>
    </Box>
  );
}
