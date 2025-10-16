import { Box, Typography, Button, styled, Avatar } from "@mui/material";

const ButtonNavBar = styled(Button)(({ theme }) => ({
  color: "#fff",
  justifyContent: "flex-start",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 400,
  marginBottom: "10px",
  transition: "0.3s",
  "&:hover": {
    color: "#b388ff",
  },
}));

export default function NavBar() {
  return (
    <Box
      sx={{
        backgroundColor: "#101110",
        width: { xs: "60vw", sm: "30vw", md: "20vw" },
        height: "100vh",
        position: "fixed",
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
          width: { xs: 80, sm: 120, md: 140 },
          height: { xs: 80, sm: 120, md: 140 },
          fontSize: { xs: 28, sm: 36, md: 42 },
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
        <ButtonNavBar
          sx={{
            marginTop: "25%",
            borderBottom: "2px solid #b388ff",
            width: "80%",
            color: "#b388ff",
            fontWeight: "bold",
          }}
        >
          Relatório do Site
        </ButtonNavBar>
        <ButtonNavBar sx={{ width: "80%" }}>Gerenciar Notícias</ButtonNavBar>
        <ButtonNavBar sx={{ width: "80%" }}>Copa Passa a Bola</ButtonNavBar>
      </Box>
    </Box>
  );
}
