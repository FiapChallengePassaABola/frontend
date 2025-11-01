import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { realtimeDb } from "../../../../../../../config/firebase";

function Players() {
  const [jogadorasList, setJogadorasList] = useState([]);

  useEffect(() => {
    const fetchJogadoras = async () => {
      try {
        const dbRef = ref(realtimeDb, "jogadoras");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setJogadorasList(Object.values(data));
        } else {
          setJogadorasList([]);
        }
      } catch (error) {
        console.error("Erro ao buscar jogadoras:", error);
      }
    };

    fetchJogadoras();
  }, []);

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return "—";
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#157259",
        borderRadius: 2,
        height: "100%",
        overflowY: "auto",
        ":&hover": {
          scale: 1.2,
        },
      }}
    >
      {jogadorasList.map((jogadora, idx) => (
        <Box
          key={idx}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 2,
            p: 2,
            mb: 2,
            color: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            ":&hover": {
              scale: 1.02,
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Avatar */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#81C784", // cinza claro/avatar
              }}
            />
            {/* Info da jogadora */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {jogadora.nome}{" "}
                <span style={{ fontWeight: "normal" }}>{jogadora.posicao}</span>
              </Typography>
              <Typography variant="body2">
                Idade: {calcularIdade(jogadora.dataNascimento)} &nbsp;&nbsp;
                Telefone: {jogadora.telefone}
              </Typography>
            </Box>
          </Box>

          {/* Status */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          ></Box>
        </Box>
      ))}
    </Box>
  );
}

export default Players;
