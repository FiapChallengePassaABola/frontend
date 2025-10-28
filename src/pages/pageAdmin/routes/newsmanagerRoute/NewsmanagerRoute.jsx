import {Container, Box, Paper, styled, Typography } from "@mui/material";
import NoticiasComponent from "./components/Noticias";  // Importando corretamente

function NewsManagerRoute() {
  const Card = styled(Paper)({
    backgroundColor: "#157259",
    color: "#fff",
    borderRadius: 12,
    padding: 16,
    boxShadow: "none",
  });

  return (
    <>
    <Container
    sx={{
      display:"flex",
      flexDirection:"column",
    }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",  // Para garantir que os componentes se ajustem lado a lado
          gap: 3,  // Adicionando um espaço entre as colunas
        }}
      >
        <NoticiasComponent />  
        <NoticiasComponent />  
      </Box>
      <Box
      sx={{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
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
            color:"white"
          }}
        >
          Novo Post
        </Typography>
        <Box
          sx={{
            width: "40%",
            height: "0.2px",
            backgroundColor: "gray",
          }}
        ></Box>
        </Box>
      </Container>
    </>
  );
}

export default NewsManagerRoute;
