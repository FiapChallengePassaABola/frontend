import React from "react";
import { Box, Typography } from "@mui/material";
import GaugeMUI from "./GaugeMUI";
import Botao from "../components/Botao";

export default function NoticiasComponent({
  text,
  description,
  imageSrc,
  OnClickParams,
  valueParam,
  maxParam,
  // Altura padrão mais generosa
  cardHeight = 420,
  nome,
}) {
  return (
    <Box
      sx={{
        width: "100%", // ocupa 100% do espaço do pai
        maxWidth: 660, // limite pra não ficar gigante em telas muito largas
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#1b1b1a",
          borderRadius: 4,
          padding: 2,
          height: cardHeight,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflow: "hidden",
        }}
      >
        {/* topo: imagem + gauge — ocupa altura fixa do topo */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "stretch",
            flexShrink: 0,
            height: { xs: 170, sm: 190 }, // topo maior para imagem legível
          }}
        >
          <Box
            sx={{
              flex: "1 1 60%",
              borderRadius: "0.6rem",
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            <img
              src={imageSrc}
              alt="img_de_passa_bola"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>

          <Box
            sx={{
              flex: "0 0 36%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 120,
            }}
          >
            <GaugeMUI value={valueParam} max={maxParam} />
          </Box>
        </Box>

        {/* conteúdo textual central — ocupa o espaço restante */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            flexGrow: 1,
            minHeight: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.35rem" },
              color: "white",
              fontWeight: 700,
              lineHeight: 1.1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {text}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.95rem", sm: "1rem" },
              color: "white",
              fontWeight: 300,
              lineHeight: 1.25,
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflowY: "scroll",
              mt: 3,
            }}
          >
            {description}
          </Typography>

          {/* espaço flexível para empurrar o botão para o final */}
          <Box sx={{ flexGrow: 1 }} />

          {/* botão na base */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Botao
              children={nome}
              onClick={OnClickParams}
              // se seu Botao aceita sx, use; se não, mantém
              style={{ width: "100%" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
