import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { realtimeDb } from "../../../../../../../config/firebase";
import SearchBar from "./SearchBar";

function Players() {
  const [jogadorasList, setJogadorasList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const fetchJogadoras = async () => {
      try {
        const dbRef = ref(realtimeDb, "jogadoras");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());
          setJogadorasList(data);
          setFilteredList(data);
        } else {
          setJogadorasList([]);
          setFilteredList([]);
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

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredList(jogadorasList);
      return;
    }
    const filtered = jogadorasList.filter((j) =>
      j.nome.toLowerCase().includes(query)
    );
    setFilteredList(filtered);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}
    >
      <SearchBar onSearch={handleSearch} />

      <Box
        sx={{
          p: 3,
          backgroundColor: "#157259",
          borderRadius: 2,
          height: "100%",
          overflowY: "auto",
        }}
      >
        {filteredList.map((jogadora, idx) => (
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
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#81C784",
                }}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {jogadora.nome}{" "}
                  <span style={{ fontWeight: "normal" }}>
                    {jogadora.posicao}
                  </span>
                </Typography>
                <Typography variant="body2">
                  Idade: {calcularIdade(jogadora.dataNascimento)} &nbsp;&nbsp;
                  Telefone: {jogadora.telefone}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Players;
