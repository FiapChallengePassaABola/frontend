import { Box, Container, Typography } from "@mui/material";
import Players from "./components/Players";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { realtimeDb } from "../../../../../../config/firebase";
import useButton from "../../store/state";

import Botao from "./components/Botao";
import * as React from "react";
import SearchBar from "./components/SearchBar";

function SignInRoute() {
  const { componentChange } = useButton();

  const [series, setSeries] = useState([
    {
      data: [{ label: "Carregando", value: 1 }],
    },
  ]);

  const colors = [
    "#8B5DE4",
    "#F46737",
    "#37B6F4",
    "#F4D03F",
    "#2ECC71",
    "#E74C3C",
  ];

  useEffect(() => {
    const fetchJogadoras = async () => {
      try {
        const snapshot = await get(ref(realtimeDb, "jogadoras"));
        if (!snapshot.exists()) {
          setSeries([{ data: [{ label: "Sem dados", value: 1 }] }]);
          return;
        }

        const jogadorasList = Object.values(snapshot.val());
        const contagemPosicoes = jogadorasList.reduce((acc, jogadora) => {
          const pos = jogadora.posicao || "Desconhecida";
          acc[pos] = (acc[pos] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.entries(contagemPosicoes).map(
          ([label, value]) => ({
            label,
            value,
          })
        );

        setSeries([
          {
            data: chartData.length
              ? chartData
              : [{ label: "Sem dados", value: 1 }],
          },
        ]);
      } catch (error) {
        console.error("Erro ao buscar jogadoras:", error);
        setSeries([{ data: [{ label: "Erro", value: 1 }] }]);
      }
    };

    fetchJogadoras();
  }, []);

  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 4,
        maxHeight: "90vh",
      }}
    >
      {/* Lado esquerdo */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1.5,
        }}
      >
        <Players />
      </Box>

      {/* Lado direito */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
          borderRadius: 5,
          backgroundColor: "#157259",
          p: 3,
          maxHeight: "70%",
          overflowY: "scroll",
        }}
      >
        <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
          Distribuição por Posição
        </Typography>

        {/* PieChart sem labels nativas */}
        <PieChart
          series={[
            {
              data: series[0].data.map((datum) => ({
                value: datum.value, // somente o valor
              })),
            },
          ]}
          width={250}
          height={250}
          colors={colors}
          sx={{
            "& path": { transition: "all 0.3s ease" },
            "&:hover": { transform: "scale(1.05)" },
          }}
        />

        {/* Legenda customizada */}
        <Box
          sx={{
            mt: 2,
            margin: "0px auto",
            width: "85%",
          }}
        >
          {series[0].data.map((datum, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: colors[idx % colors.length],
                  mr: 1.5,
                  border: "2px solid #fff2",
                }}
              />
              <Typography sx={{ color: "white", fontWeight: 500 }}>
                {datum.label}: {datum.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default SignInRoute;
