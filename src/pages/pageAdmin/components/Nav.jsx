import { Box, Typography, Button, styled, Avatar } from "@mui/material";

const ButtonNavBar = styled(Button)(({ theme }) => ({
  color: "#fff",
  justifyContent: "flex-start",
  textTransform: "none",
  fontSize: "2rem",
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
          width: { xs: 80, sm: 150, md: 240 },
          height: { xs: 80, sm: 150, md: 240 },
          fontSize: { xs: 28, sm: 26, md: 62 },
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
            borderBottom: ".6rem solid #b388ff",
            width: "80%",
            color: "#8D34F9",
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
