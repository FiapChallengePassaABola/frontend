import {
  Container,
  Box,
  Paper,
  styled,
  Typography,
  IconButton,
} from "@mui/material";
import CustomButton from "./components/CustomButton";
import NoticiasComponent from "./components/Noticias";
import InstagramIcon from "@mui/icons-material/Instagram";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import YouTubeIcon from "@mui/icons-material/YouTube";

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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between", // Para garantir que os componentes se ajustem lado a lado
            gap: 3, // Adicionando um espaço entre as colunas
          }}
        >
          <NoticiasComponent />
          <NoticiasComponent />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
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
              color: "white",
              marginBottom: 2,
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
        <Box
          sx={{
            width: "80%",
            borderRadius: 2,
            backgroundColor: "#19745c",
            display: "flex",
            flexDirection: "row",
            padding: 2,
            gap: 3,
            justifyContent: "space-around",
          }}
        >
          <CustomButton
            icon={
              <InstagramIcon
                sx={{
                  color: "white",
                  fontSize: "5vmax",
                }}
              />
            }
            text={"Post do Instagram"}
          ></CustomButton>
          <CustomButton
            icon={
              <AddCircleOutlineIcon
                sx={{
                  color: "white",
                  fontSize: "5vmax",
                }}
              />
            }
            text={"Nova Noticia"}
          ></CustomButton>
          <CustomButton
            icon={
              <YouTubeIcon
                sx={{
                  color: "white",
                  fontSize: "5vmax",
                }}
              />
            }
            text={"Video do Youtube"}
          ></CustomButton>
        </Box>
      </Container>
    </>
  );
}

export default NewsManagerRoute;
