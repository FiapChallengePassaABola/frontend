import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { Box } from "@mui/material";

export default function AdminPage() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(180deg,#07110a,#05221a)",
      }}
    >
      <Nav />
      <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
        <Outlet />
      </Box>
    </Box>
  );
}
