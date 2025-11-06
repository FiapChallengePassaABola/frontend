import { Box, Typography, IconButton, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { realtimeDb } from "../../../../../../../config/firebase";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import SearchBar from "./SearchBar";
import { Reject, Approved } from "../store/store";

function Players() {
  const [jogadorasList, setJogadorasList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [page, setPage] = useState("pendente");
  const [refresh, setRefresh] = useState(0);

  const handleChange = (evento, novaPagina) => {
    setPage(novaPagina);
  };

  useEffect(() => {
    const fetchJogadoras = async () => {
      try {
        const dbRef = ref(realtimeDb, "jogadoras");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = Object.entries(snapshot.val()).map(([key, value]) => ({
            ...value,
            id: key,
          }));
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
  }, [refresh]);

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

  const handleApprove = async (id) => {
    await Approved(id);
    setRefresh((r) => r + 1);
  };
  const handleReject = async (id) => {
    await Reject(id);
    setRefresh((r) => r + 1);
  };

  const pendentes = filteredList.filter(
    (j) => !j.status || j.status === "pendente"
  );
  const aprovadas = filteredList.filter((j) => j.status === "aprovada");
  const rejeitadas = filteredList.filter((j) => j.status === "rejeitada");
  const onClube = filteredList.filter((j) => j.status === "on-clube");

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
        <TabContext value={page}>
          <TabList
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="primary"
            sx={{
              mb: 2,
              "& .MuiTabs-indicator": {
                backgroundColor: "#B388FF",
              },
            }}
          >
            <Tab label="Pendentes" value="pendente" sx={{ color: "yellow" }} />
            <Tab
              sx={{ color: "lightgreen" }}
              label="Aprovadas"
              value="aprovada"
            />
            <Tab sx={{ color: "red" }} label="Rejeitadas" value="rejeitada" />
            <Tab sx={{ color: "#00e5ff" }} label="No Clube" value="on-clube" />
          </TabList>

          {/* PENDENTES */}
          <TabPanel value="pendente" sx={{ p: 0 }}>
            {pendentes.map((jogadora, idx) => (
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
                      Idade: {calcularIdade(jogadora.dataNascimento)}{" "}
                      &nbsp;&nbsp; Telefone: {jogadora.telefone}
                    </Typography>
                    <Typography variant="body2">
                      Status:{" "}
                      <span style={{ color: "yellow" }}>
                        {jogadora.status?.toUpperCase() || "PENDENTE"}
                      </span>
                    </Typography>
                    <Box>
                      <IconButton
                        sx={{
                          textTransform: "none",
                          color: "white",
                          fontSize: "1.2vmax",
                        }}
                        onClick={() => handleReject(jogadora.id)}
                      >
                        Rejeitar <CloseIcon sx={{ color: "#af3636" }} />
                      </IconButton>
                      <IconButton
                        color="white"
                        sx={{
                          textTransform: "none",
                          color: "white",
                          fontSize: "1.2vmax",
                        }}
                        onClick={() => handleApprove(jogadora.id)}
                      >
                        Aprovar <DoneIcon sx={{ color: "#3af011" }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </TabPanel>

          {/* APROVADAS */}
          <TabPanel value="aprovada" sx={{ p: 0 }}>
            {aprovadas.map((jogadora, idx) => (
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
                      Idade: {calcularIdade(jogadora.dataNascimento)}{" "}
                      &nbsp;&nbsp; Telefone: {jogadora.telefone}
                    </Typography>
                    <Typography variant="body2">
                      Status:{" "}
                      <span style={{ color: "lightgreen" }}>
                        {jogadora.status?.toUpperCase() || "APROVADA"}
                      </span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </TabPanel>

          {/* REJEITADAS */}
          <TabPanel value="rejeitada" sx={{ p: 0 }}>
            {rejeitadas.map((jogadora, idx) => (
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
                      Idade: {calcularIdade(jogadora.dataNascimento)}{" "}
                      &nbsp;&nbsp; Telefone: {jogadora.telefone}
                    </Typography>
                    <Typography variant="body2">
                      Status:{" "}
                      <span style={{ color: "red" }}>
                        {jogadora.status?.toUpperCase() || "REJEITADA"}
                      </span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </TabPanel>

          {/* ON-CLUBE */}
          <TabPanel value="on-clube" sx={{ p: 0 }}>
            {onClube.length === 0 ? (
              <Typography sx={{ color: "white" }}>
                Nenhuma jogadora no clube ainda.
              </Typography>
            ) : (
              onClube.map((jogadora, idx) => (
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
                    backgroundColor: "#125d46",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: "#00e5ff",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {jogadora.nome}{" "}
                        <span style={{ fontWeight: "normal" }}>
                          {jogadora.posicao}
                        </span>
                      </Typography>
                      <Typography variant="body2">
                        Idade: {calcularIdade(jogadora.dataNascimento)}{" "}
                        &nbsp;&nbsp; Telefone: {jogadora.telefone}
                      </Typography>
                      <Typography variant="body2">
                        Status:{" "}
                        <span style={{ color: "#00e5ff" }}>
                          {jogadora.status?.toUpperCase() || "ON-CLUBE"}
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default Players;
