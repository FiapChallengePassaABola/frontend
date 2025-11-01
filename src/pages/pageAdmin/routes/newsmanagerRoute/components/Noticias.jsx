import { Box, Typography } from "@mui/material";
import GaugeMUI from "./GaugeMUI";
import Botao from "../components/Botao";
import src2 from "../assets/Foto2.jpg";

export default function NoticiasComponent({
  text,
  description,
  imageSrc,
  OnClickParams,
  valueParam,
  maxParam,
}) {
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
                src={imageSrc}
                style={{
                  borderRadius: ".6rem",
                }}
                alt="img_de_passa_bola"
              />
            </Box>
            <Box flex={1}>
              <GaugeMUI
              value={valueParam}
              max={maxParam}
              ></GaugeMUI>
            </Box>
          </Box>
          <Typography
            sx={{
              fontSize: "2vmax",
              color: "white",
            }}
          >
            {text}
          </Typography>
          <Typography
            sx={{
              fontSize: "1vmax",
              color: "white",
              fontWeight: "100",
              fontFamily: "cursive",
            }}
          >
            {description}
          </Typography>
        </Box>
        <Botao
          children={"Editar"}
          className="w-full p-1 h-4/5 text-[1.5vmax]"
          onClick={OnClickParams}
        ></Botao>
      </Box>
    </>
  );
}
