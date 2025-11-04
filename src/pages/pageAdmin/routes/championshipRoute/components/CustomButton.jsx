import React from "react";
import { Box, IconButton, Typography, styled } from "@mui/material";

export default function CustomButton({
  icon,
  text,
  buttonText,
  sxBox = {},
  sxIconButton = {},
  onClickParams,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...sxBox,
      }}
    >
      <IconButton
        sx={{
          padding: "1rem 2.6rem",
          border: "1px solid white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          transition: "300ms",
          textTransform: "none",

          "&:hover": {
            backgroundColor: "rgba(141, 97, 228, 0.76)", // A cor de fundo ao passar o mouse
          },
          ...sxIconButton,
        }}
        onClick={onClickParams}
      >
        {icon}
        {buttonText}
      </IconButton>
      <Typography sx={{ marginTop: 1, color: "white" }}>{text}</Typography>
    </Box>
  );
}
