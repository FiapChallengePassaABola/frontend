import { Box, Typography, Button, styled, Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {
  const ButtonNavBar = styled(NavLink)(() => ({
    color: "#fff",
    justifyContent: "flex-start",
    textTransform: "none",
    fontSize: "1.5vmax",
    fontWeight: 400,
    marginBottom: "10px",
    transition: "0.15s",
    "&:hover": {
      color: "#b388ff",
    },
    "&.active": {
      borderBottom: ".4rem solid #b388ff",
      width: "80%",
      color: "#8D34F9",
      fontWeight: "bold",
    },
  }));

  return (
    <Box
      sx={{
        backgroundColor: "#101110",
        width: { xs: "60vw", sm: "30vw", md: "20vw" },
        minHeight: "100vh",
        maxHeight:"100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "2rem",
        color: "white",
      }}
    >
      <Avatar
        sx={{
          bgcolor: "#3b0a45",
          width: { xs: 60, sm: 130, md: 150 },
          height: { xs: 60, sm: 130, md: 150 },
          fontSize: { xs: 22, sm: 20, md: 46 },
          fontWeight: "bold",
          mb: 4,
        }}
      >
        ADM
      </Avatar>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <ButtonNavBar sx={{ marginTop: "25%", width: "80%" }} to="summary">
          Relatório do Site
        </ButtonNavBar>
        <ButtonNavBar sx={{ width: "80%" }} to="news_manager">
          Gerenciar Notícias
        </ButtonNavBar>
        <ButtonNavBar sx={{ width: "80%" }} to="championship">
          Copa Passa a Bola
        </ButtonNavBar>
      </Box>
    </Box>
  );
}
