import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import useFormCT from "../../state";
import { ref, get } from "firebase/database";
import { realtimeDb } from "../../../../../../../../config/firebase";

export default function CreateTeamRoute() {
  const { setComponentCT } = useFormCT();

  const [jogadorasList, setJogadorasList] = useState([]);
  const [query, setQuery] = useState("");
  const [teamSize, setTeamSize] = useState(5);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchJogadoras = async () => {
      try {
        const snapshot = await get(ref(realtimeDb, "jogadoras"));
        if (!snapshot.exists()) {
          setJogadorasList([]);
          return;
        }

        const list = Object.entries(snapshot.val()).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setJogadorasList(list);
      } catch (error) {
        console.error("Erro ao buscar jogadoras:", error);
      }
    };

    fetchJogadoras();
  }, []);

  // fallback mock se não houver dados
  const players = useMemo(() => {
    if (jogadorasList && jogadorasList.length) return jogadorasList;
    return [
      { id: "p1", nome: "Ana Jaula", posicao: "ZAG/VOL", idade: 19 },
      { id: "p2", nome: "Lima Mei", posicao: "ATA/PD", idade: 19 },
      { id: "p3", nome: "Dilma Russef", posicao: "GOL", idade: 19 },
      { id: "p4", nome: "Yasmin Ahn", posicao: "MC/ATA", idade: 19 },
      { id: "p5", nome: "Douglas", posicao: "ATA", idade: 19 },
    ];
  }, [jogadorasList]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return players;
    return players.filter(
      (p) =>
        (p.nome && p.nome.toLowerCase().includes(q)) ||
        (p.posicao && p.posicao.toLowerCase().includes(q))
    );
  }, [players, query]);

  const addPlayer = (p) => {
    if (selected.find((s) => s.id === p.id)) return;
    if (selected.length >= teamSize) return;
    setSelected((s) => [...s, p]);
  };

  const removePlayer = (id) => setSelected((s) => s.filter((x) => x.id !== id));

  const generateTeam = () => {
    const pool = players.filter((p) => !selected.find((s) => s.id === p.id));
    const toAdd = pool.slice(0, Math.max(0, teamSize - selected.length));
    setSelected((s) => [...s, ...toAdd]);
  };

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: "920px",
          display: "flex",
          gap: 3,
          alignItems: "flex-start",
        }}
      >
        {/* Left column */}
        <Box
          sx={{
            flex: 1,
            background: "#157259",
            borderRadius: 2,
            p: 2,
            color: "white",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              placeholder="Buscar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size="small"
              sx={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 4,
              }}
            />
            <TextField
              placeholder="tamanho do time ex: 5"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value) || 0)}
              size="small"
              sx={{
                width: 160,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 4,
              }}
            />
            <Button
              variant="contained"
              onClick={generateTeam}
              sx={{ bgcolor: "#0f8f68" }}
            >
              gerar time
            </Button>
          </Box>

          <Divider sx={{ bgcolor: "rgba(255,255,255,0.12)", mb: 1 }} />

          <List sx={{ maxHeight: 460, overflow: "auto" }}>
            {filtered.map((p) => (
              <ListItem
                key={p.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => addPlayer(p)}>
                    <AddIcon sx={{ color: "white" }} />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />
                </ListItemAvatar>
                <ListItemText
                  primary={p.nome}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        sx={{ color: "#d9f1df", mr: 1 }}
                      >
                        {p.posicao}
                      </Typography>
                      <Typography component="span">Idade: {p.idade}</Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right column */}
        <Box
          sx={{
            width: 340,
            background: "#157259",
            borderRadius: 2,
            p: 2,
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Novo time</Typography>
              <IconButton
                onClick={() => setComponentCT(false)}
                sx={{ color: "white" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider sx={{ bgcolor: "rgba(255,255,255,0.12)", mb: 1 }} />

            <List>
              {selected.map((p) => (
                <ListItem
                  key={p.id}
                  secondaryAction={
                    <IconButton onClick={() => removePlayer(p.id)}>
                      <CloseIcon sx={{ color: "white" }} />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={p.nome}
                    secondary={
                      <Typography component="span">
                        {p.posicao} — Idade: {p.idade}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 2 }}
          >
            <Button
              variant="outlined"
              onClick={() => setComponentCT(false)}
              sx={{ borderColor: "white", color: "white" }}
            >
              cancelar
            </Button>
            <Button
              variant="contained"
              onClick={() => alert("concluir — implementar persistência")}
              sx={{ bgcolor: "#0f8f68" }}
            >
              concluir
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
