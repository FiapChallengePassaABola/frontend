import {
  Container,
  Box,
  Paper,
  styled,
  Typography,
  IconButton,
} from "@mui/material";
import src1 from "./assets/Foto1.jpg";
import src2 from "./assets/Foto2.jpg";

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
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 2, sm: 3 },
          p: { xs: 1, sm: 2 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 2, sm: 3 },
          }}
        >
          <NoticiasComponent
            text="Verdão Detona"
            description='"A Seleção Brasileira de futebol feminino demonstrou força e
            eficiência ao golear a Coreia do Sul por 5 a 0 em amistoso
            preparatório. Sob a batuta da nova técnica, o time mostrou um ataque
            poderoso e um desempenho coletivo elevado..."'
            imageSrc={src1}
            valueParam={50}
            maxParam={80}
            OnClickParams={() => {}}
          />
          <NoticiasComponent
            text="Verdão Detona"
            description='"A Seleção Brasileira de futebol feminino demonstrou força e
            eficiência ao golear a Coreia do Sul por 5 a 0 em amistoso
            preparatório. Sob a batuta da nova técnica, o time mostrou um ataque
            poderoso e um desempenho coletivo elevado..."'
            imageSrc={src2}
            valueParam={20}
            maxParam={40}
            OnClickParams={() => {}}
          />
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
              fontSize: { xs: "1.5rem", sm: "2rem" },
              fontWeight: "700",
              color: "white",
              marginBottom: { xs: 1, sm: 2 },
              textAlign: "center",
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
            width: { xs: "95%", sm: "90%", md: "80%" },
            borderRadius: 2,
            backgroundColor: "#19745c",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            padding: { xs: 1.5, sm: 2 },
            gap: { xs: 2, sm: 3 },
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <CustomButton
            icon={
              <InstagramIcon
                sx={{
                  color: "white",
                  fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
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
                  fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
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
                  fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
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
