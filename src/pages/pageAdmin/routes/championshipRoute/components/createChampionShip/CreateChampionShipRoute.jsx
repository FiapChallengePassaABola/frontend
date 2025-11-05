import edit from "../../assets/edit.png";
import Times from "./components/Times";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Divider,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import useFormCT from "./state";
import CreateTeamRoute from "./components/modalCreateTeam/CreateTeamRoute";
import useButton from "../../store/state";
import { getTeams } from "./store";
import AddIcon from "@mui/icons-material/Add";
import { criarCampeonato } from "./store";
import { v4 as uuidv4 } from "uuid"; // Importa a função para gerar UUID
import { ref, get } from "firebase/database";
import { realtimeDb } from "../../../../../../config/firebase";

function CreateChampionShip() {
  const [championShipTeams, setChampionShipTeams] = useState([]);
  const { componentChange } = useButton();
  const { componentCT, setComponentCT } = useFormCT();
  const [valor, setValor] = useState("4Times");
  const [jogadorasList, setJogadorasList] = useState([]);
  const [formState, setFormState] = useState({
    id: uuidv4(),
    nome: "",
    tipo: "4Times",
    clubes: Array(4).fill(null),
  });

  useEffect(() => {
    const fetchJogadoras = async () => {
      try {
        const snapshot = await get(ref(realtimeDb, "jogadoras"));
        if (!snapshot.exists()) {
          setSeries([{ data: [{ label: "Sem dados", value: 1 }] }]);
          return;
        }

        const jogadorasList = Object.values(snapshot.val());
        setJogadorasList(jogadorasList);
        console.log(jogadorasList);
      } catch (error) {
        console.error("Erro ao buscar jogadoras:", error);
      }
    };

    // ✅ chamada fora da função
    fetchJogadoras();
  }, []);

  const handleChange = (event) => {
    const tipo = event.target.value;
    setValor(tipo);
    setFormState({
      ...formState,
      tipo,
      clubes:
        tipo === "4Times"
          ? formState.clubes.slice(0, 4)
          : tipo === "8Times"
          ? [
              ...formState.clubes.slice(0, 8),
              ...Array(8 - formState.clubes.slice(0, 8).length).fill(null),
            ]
          : tipo === "16Times"
          ? [
              ...formState.clubes.slice(0, 16),
              ...Array(16 - formState.clubes.slice(0, 16).length).fill(null),
            ]
          : formState.clubes,
    });
  };

  const handleCreateChampionShip = () => {
    // Verifica se há nome do campeonato
    if (!formState.nome.trim()) {
      alert("Por favor, insira um nome para o campeonato.");
      return;
    }

    // Verifica se todos os times necessários estão preenchidos
    const requiredTeams =
      formState.tipo === "4Times"
        ? 4
        : formState.tipo === "8Times"
        ? 8
        : formState.tipo === "16Times"
        ? 16
        : 0;

    const filledTeams = formState.clubes.filter(
      (clube) => clube !== null
    ).length;

    if (filledTeams < requiredTeams) {
      alert(
        `Por favor, adicione todos os ${requiredTeams} times necessários para este tipo de campeonato.`
      );
      return;
    }

    criarCampeonato(formState);
  };

  const handleAddClub = (clubeName) => {
    // preenche o primeiro slot vazio
    const emptyIndex = formState.clubes.findIndex((c) => !c);
    if (emptyIndex !== -1) {
      const newClubes = [...formState.clubes];
      newClubes[emptyIndex] = {
        nome: clubeName,
        points: 0,
        gamesPlayed: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
      };
      setFormState({ ...formState, clubes: newClubes });

      // remove o clube da lista de clubes disponíveis
      setChampionShipTeams((prev) =>
        prev.filter((clube) => clube.nome !== clubeName)
      );
    }
  };

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const dbRef = await getTeams();
        if (dbRef) {
          const clubesArr = Object.entries(dbRef).map(([key, value]) => ({
            ...value,
            id: key,
          }));
          setChampionShipTeams(clubesArr);
        }
      } catch (error) {
        console.error("Erro ao buscar clubes:", error);
      }
    };
    fetchTeams();
  }, [refresh]);

  // Se o estado de criação estiver ativado, renderiza a rota/composto CreateTeamRoute
  if (componentCT) {
    return <CreateTeamRoute />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}
    >
      <Button
        onClick={() => componentChange(false)}
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          maxWidth: "15%",
          color: "white",
          fontWeight: "bold",
          fontSize: "1rem",
          textTransform: "none",
        }}
      >
        Voltar
      </Button>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={4}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent={"space-between"}
          sx={{ width: "88%" }}
          gap={8}
        >
          <TextField
            value={formState.nome}
            onChange={(e) =>
              setFormState({ ...formState, nome: e.target.value })
            }
            placeholder="Nome do Campeonato"
            variant="standard" // você pode usar "outlined" ou "filled" se preferir
            InputProps={{
              style: {
                color: "#D9D9D9",
                fontWeight: "bold",
                fontSize: "2rem", // equivalente a um h3
              },
            }}
            sx={{
              width: "100%",
              "& .MuiInput-underline:before": {
                borderBottom: "1px solid #828282",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "2px solid #288F73",
              },
            }}
          />
          <Box display="flex" justifyContent="flex-end">
            <Select
              value={valor}
              sx={{
                background: "#288F73",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: "12px",
                "& .MuiSvgIcon-root": { color: "white" },
              }}
              onChange={handleChange}
            >
              <MenuItem value="4Times">4 Times</MenuItem>
              <MenuItem value="8Times">8 Times</MenuItem>
              <MenuItem value="16Times">16 Times</MenuItem>
              <MenuItem value="pontosCorridos">Pontos corridos</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {/* Lista de Times */}
        <Box sx={{ flex: 1, minWidth: 280, mr: 2 }}>
          <Box
            sx={{
              background: "#157259",
              borderRadius: 2.6,
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxHeight: "50vh",
              overflowY: "scroll",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "1.5rem",
                mb: 2,
              }}
            >
              Times
            </Typography>
            <Divider
              sx={{
                width: "70%",
                backgroundColor: "white",
                height: "1px",
                mb: 2,
              }}
            />
            {championShipTeams.length === 0 && (
              <Typography sx={{ color: "white", mt: 2 }}>
                Nenhum clube encontrado.
              </Typography>
            )}
            {championShipTeams.map((clube) => {
              if (clube.status === "aprovado" || clube.status === "aprovada") {
                return (
                  <Box
                    key={clube.id}
                    sx={{
                      background: "#1e8c6b",
                      borderRadius: 2,
                      p: 2,
                      mb: 1,
                      width: "100%",
                      color: "white",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box display={"flex"} flexDirection={"column"}>
                      <Typography
                        sx={{
                          textTransform: "none",
                          fontSize: "1.1rem",
                          fontWeight: 0,
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>Nome: </span>
                        {clube.nome}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: "1rem" }}>
                      {clube.estado}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem" }}>
                      {clube.telefone}
                    </Typography>
                    <IconButton onClick={() => handleAddClub(clube.nome)}>
                      <AddIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Box>
                );
              }
              return null;
            })}
          </Box>
        </Box>

        {/* Jogadoras Livres */}
        <Box
          sx={{
            flex: 1,
            minWidth: 280,
            ml: 2,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              background: "#157259",
              borderRadius: 2.6,
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "1.5rem",
                mb: 2,
              }}
            >
              Jogadoras Livres
            </Typography>
            <Divider
              sx={{
                width: "70%",
                backgroundColor: "white",
                height: "1px",
                mb: 2,
              }}
            />
            {jogadorasList
              .filter((j) => j.status === "aprovado" || j.status === "aprovada")
              .map((j) => (
                <Box
                  key={j.id}
                  sx={{
                    background: "#1e8c6b",
                    borderRadius: 2,
                    p: 1,
                    mb: 1,
                    width: "100%",
                    color: "white",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    {j.nome}
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    {j.posicao}
                  </Typography>
                </Box>
              ))}
          </Box>
          <Button
            sx={{
              color: "white",
              fontWeight: "bold",
              border: "1px solid white",
            }}
            onClick={() => setComponentCT(true)}
          >
            Criar Time
          </Button>
        </Box>
      </Box>

      {/* Chaveamento */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          flexWrap="wrap"
          gap={2}
          sx={{
            width: "100%",
            "& > *": {
              // Aplica estilos a todos os filhos diretos
              minWidth: "200px", // Largura mínima fixa
              minHeight: "60px", // Altura mínima fixa
              flex: "0 0 auto", // Impede o crescimento ou encolhimento
            },
          }}
        >
          {formState.clubes.map((clube, index) => (
            <Times
              key={clube ? clube.id || `empty-${index}` : `empty-${index}`}
              name={clube?.nome}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          sx={{
            mt: 2,
            background: "#288F73",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={() => handleCreateChampionShip()}
        >
          Adicionar Campeonato
        </Button>
      </Box>
    </Box>
  );
}

export default CreateChampionShip;
