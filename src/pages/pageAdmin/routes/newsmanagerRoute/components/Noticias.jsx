import { Box, Typography } from "@mui/material";
import GaugeMUI from "./GaugeMUI";
import Botao from "../components/Botao";
import src1 from "../assets/Foto1.jpg";
import src2 from "../assets/Foto2.jpg";

export default function NoticiasComponent() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          gap: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "2vmax",
            color: "white",
          }}
        >
          Ultimas Noticias
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#1b1b1a",
            gap: 2,
            padding: 2,
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box flex={1}>
              <img
                src={src1}
                style={{
                  borderRadius: ".6rem",
                }}
                alt="img_de_passa_bola"
              />
            </Box>
            <Box flex={1}>
              <GaugeMUI></GaugeMUI>
            </Box>
          </Box>
          <Typography
            sx={{
              fontSize: "2vmax",
              color: "white",
            }}
          >
            Verdão Detona
          </Typography>
          <Typography
            sx={{
              fontSize: "1vmax",
              color: "white",
              fontWeight: "100",
              fontFamily: "cursive",
            }}
          >
            "A Seleção Brasileira de futebol feminino demonstrou força e
            eficiência ao golear a Coreia do Sul por 5 a 0 em amistoso
            preparatório. Sob a batuta da nova técnica, o time mostrou um ataque
            poderoso e um desempenho coletivo elevado..."
          </Typography>
        </Box>
        <Botao
          children={"Editar"}
          className="w-full p-1 h-4/5 text-[1.5vmax]"
        ></Botao>
      </Box>
    </>
  );
}
