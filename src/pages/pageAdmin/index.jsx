import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { Box, Container } from "@mui/material";

export default function AdminPage() {
  return (
    <Box
      sx={{
        display: "flex",
        background: "linear-gradient(180deg,#07110a,#05221a)",
        maxHeight: "100vh",
      }}
    >
      <Nav />
      <Container
        disableGutters
        maxWidth={false}
        component="main"
        sx={{ flex: 1, p: { xs: 1, md: 2, overflowY: "scroll" } }}
      >
        <Outlet />
      </Container>
    </Box>
  );
}
