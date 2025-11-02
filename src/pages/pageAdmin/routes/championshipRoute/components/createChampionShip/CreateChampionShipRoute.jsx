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
import useButton from "../../store/state";
import { getTeams } from "./store";
import AddIcon from "@mui/icons-material/Add";

function CreateChampionShip() {
  const [championShipTeams, setChampionShipTeams] = useState([]);
  const { componentChange } = useButton();
  const [valor, setValor] = useState("4Times");
  const [formState, setFormState] = useState({
    nome: "",
    tipo: "4Times",
    clubes: Array(4).fill(null),
  });

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

  const handleAddClub = (clubeName) => {
    // preenche o primeiro slot vazio
    const emptyIndex = formState.clubes.findIndex((c) => !c);
    if (emptyIndex !== -1) {
      const newClubes = [...formState.clubes];
      newClubes[emptyIndex] = clubeName;
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
        <Box sx={{ flex: 1, minWidth: 280, ml: 2 }}>
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
            {(() => {
              const jogadorasAprovadas = championShipTeams
                .flatMap((clube) =>
                  clube.jogadoras
                    ? Object.entries(clube.jogadoras).map(([id, jogadora]) => ({
                        ...jogadora,
                        id,
                      }))
                    : []
                )
                .filter(
                  (j) => j.status === "aprovada" || j.status === "aprovado"
                );
              if (jogadorasAprovadas.length === 0) {
                return (
                  <Typography sx={{ color: "white", mt: 2 }}>
                    Nenhuma jogadora aprovada encontrada.
                  </Typography>
                );
              }
              return jogadorasAprovadas.map((j) => (
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
              ));
            })()}
          </Box>
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
          sx={{ width: "100%" }}
        >
          {formState.clubes.map((clube, index) => (
            <Times key={index} name={clube} cor={"transparent"} />
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
          onClick={() => alert("Adicionar time ao chaveamento!")}
        >
          Adicionar Campeonato
        </Button>
      </Box>
    </Box>
  );
}

export default CreateChampionShip;
