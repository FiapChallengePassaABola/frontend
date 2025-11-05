// BracketPrototype.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Divider,
} from "@mui/material";
import { ref, onValue, get, set } from "firebase/database";
import { realtimeDb } from "../../../../../../config/firebase"; // ajuste conforme seu projeto
import useButton from "../../store/state";
import TabelaPontos from "../../../../../../components/campeonato/TabelaPontos";

/* ---------- Helpers ---------- */

const nextPowerOfTwo = (n) => {
  if (n <= 1) return 1;
  let p = 1;
  while (p < n) p <<= 1;
  return p;
};

const roundNameForSize = (targetSize, roundIndexFromEnd) => {
  const map = ["Final", "Semifinais", "Quartas", "Oitavas", "16avos", "32avos"];
  return map[roundIndexFromEnd] || `Fase ${roundIndexFromEnd}`;
};

// deep sanitize: convert undefined to null everywhere
const sanitizeUndefinedToNull = (value) => {
  if (value === undefined) return null;
  if (value === null) return null;
  if (Array.isArray(value)) return value.map((v) => sanitizeUndefinedToNull(v));
  if (typeof value === "object") {
    const out = {};
    for (const k of Object.keys(value)) {
      out[k] = sanitizeUndefinedToNull(value[k]);
    }
    return out;
  }
  return value;
};

const generateInitialBracket = (campeonato) => {
  const clubes = (campeonato?.clubes || []).map((c) => c.nome);
  const target = nextPowerOfTwo(clubes.length);
  const padded = [...clubes];
  while (padded.length < target) padded.push(null); // BYE -> null

  const matchesFirstRound = [];
  for (let i = 0; i < padded.length; i += 2) {
    matchesFirstRound.push(
      sanitizeUndefinedToNull({
        id: `r0-m${i / 2 + 1}`,
        timeA: padded[i] ?? null,
        timeB: padded[i + 1] ?? null,
        golsA: null,
        golsB: null,
        vencedor: null,
      })
    );
  }

  const fases = [];
  let roundMatches = matchesFirstRound;
  let roundIndex = 0;
  const totalRounds = Math.log2(target);

  while (true) {
    const roundIndexFromEnd = totalRounds - 1 - roundIndex; // 0 = final
    const nome = roundNameForSize(target, roundIndexFromEnd);
    fases.push({
      nome,
      partidas: roundMatches,
    });

    if (roundMatches.length === 1) break;

    const nextMatches = Array.from(
      { length: Math.floor(roundMatches.length / 2) },
      (_, i) =>
        sanitizeUndefinedToNull({
          id: `r${roundIndex + 1}-m${i + 1}`,
          timeA: null,
          timeB: null,
          golsA: null,
          golsB: null,
          vencedor: null,
        })
    );

    roundMatches = nextMatches;
    roundIndex++;
  }

  return sanitizeUndefinedToNull({ fases });
};

const computeWinnersAndAdvance = (chaveamento) => {
  const fases = JSON.parse(JSON.stringify(chaveamento.fases || []));

  for (let pi = 0; pi < fases.length; pi++) {
    const phase = fases[pi];
    const winners = [];
    for (let m of phase.partidas) {
      let winner = null;
      const a = m.timeA ?? null;
      const b = m.timeB ?? null;

      if (!a && !b) {
        winner = null;
      } else if (a && !b) {
        winner = a;
      } else if (!a && b) {
        winner = b;
      } else if (Number.isFinite(m.golsA) && Number.isFinite(m.golsB)) {
        if (m.golsA > m.golsB) winner = a;
        else if (m.golsB > m.golsA) winner = b;
        else winner = null; // draw -> unresolved
      } else {
        winner = null; // scores not set
      }

      m.vencedor = winner;
      winners.push(winner);
    }

    // advance winners to next phase (if exists)
    if (pi + 1 < fases.length) {
      const nextPhase = fases[pi + 1];
      // fill nextPhase.partidas order: winners[0] -> match0.timeA, winners[1] -> match0.timeB, winners[2] -> match1.timeA...
      let wIndex = 0;
      for (let nm of nextPhase.partidas) {
        nm.timeA = winners[wIndex++] ?? null;
        nm.timeB = winners[wIndex++] ?? null;
      }
    }
  }

  return sanitizeUndefinedToNull({ fases });
};

const recomputeClubStats = (campeonatoOrig, chaveamento) => {
  const clubesMap = {};
  (campeonatoOrig.clubes || []).forEach((c) => {
    clubesMap[c.nome] = {
      ...c,
      gamesPlayed: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalDifference: 0,
      points: 0,
    };
  });

  const fases = chaveamento.fases || [];
  for (let phase of fases) {
    for (let m of phase.partidas) {
      const a = m.timeA;
      const b = m.timeB;
      if (!a && !b) continue;
      if (!Number.isFinite(m.golsA) || !Number.isFinite(m.golsB)) continue;
      if (!clubesMap[a]) {
        clubesMap[a] = {
          nome: a,
          gamesPlayed: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalDifference: 0,
          points: 0,
        };
      }
      if (!clubesMap[b]) {
        clubesMap[b] = {
          nome: b,
          gamesPlayed: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalDifference: 0,
          points: 0,
        };
      }

      clubesMap[a].gamesPlayed++;
      clubesMap[b].gamesPlayed++;

      clubesMap[a].goalsFor += Number(m.golsA);
      clubesMap[a].goalsAgainst += Number(m.golsB);

      clubesMap[b].goalsFor += Number(m.golsB);
      clubesMap[b].goalsAgainst += Number(m.golsA);

      if (m.golsA > m.golsB) {
        clubesMap[a].wins++;
        clubesMap[b].losses++;
        clubesMap[a].points += 3;
      } else if (m.golsB > m.golsA) {
        clubesMap[b].wins++;
        clubesMap[a].losses++;
        clubesMap[b].points += 3;
      } else {
        clubesMap[a].draws++;
        clubesMap[b].draws++;
        clubesMap[a].points += 1;
        clubesMap[b].points += 1;
      }
    }
  }

  const newClubes = (campeonatoOrig.clubes || []).map((orig) => {
    const name = orig.nome;
    const computed = clubesMap[name] || {
      ...orig,
      gamesPlayed: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalDifference: 0,
      points: 0,
    };
    computed.goalDifference = computed.goalsFor - computed.goalsAgainst;
    return {
      ...orig,
      gamesPlayed: computed.gamesPlayed,
      goalsFor: computed.goalsFor,
      goalsAgainst: computed.goalsAgainst,
      wins: computed.wins,
      draws: computed.draws,
      losses: computed.losses,
      goalDifference: computed.goalDifference,
      points: computed.points,
    };
  });

  return newClubes.map((c) => sanitizeUndefinedToNull(c));
};

/* ---------- Component ---------- */

export default function BracketPrototype() {
  const roundLabel = (id) => {
    const [round, match] = id.split("-"); // ['r0', 'm1']

    // Extrai os números depois das letras
    const roundNumber = round.replace("r", "");
    const matchNumber = match.replace("m", "");
    return `Round ${parseInt(roundNumber) + 1} - Match ${parseInt(
      matchNumber
    )}`;
  };

  const [campeonatos, setCampeonatos] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [campeonato, setCampeonato] = useState(null);
  const [chaveamento, setChaveamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const { componentChange } = useButton();
  const [title, setTitle] = useState("Chaveamento");
  const fasesContainerRef = useRef(null);
  const [maxColHeight, setMaxColHeight] = useState(0);
  const handleChange = (toEdit) => {
    componentChange(toEdit);
  };

  useEffect(() => {
    const refCam = ref(realtimeDb, "campeonatos");
    const unsub = onValue(refCam, (snap) => {
      const val = snap.val() || {};
      const list = Object.entries(val).map(([id, v]) => ({ id, ...v }));
      setCampeonatos(list);
      if (!selectedId && list.length > 0) setSelectedId(list[0].id);
      setLoading(false);
    });
    return () => unsub();
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId) {
      setCampeonato(null);
      setChaveamento(null);
      return;
    }
    const load = async () => {
      setLoading(true);
      const snap = await get(ref(realtimeDb, `campeonatos/${selectedId}`));
      const data = snap.exists() ? snap.val() : null;
      if (!data) {
        setCampeonato(null);
        setChaveamento(null);
        setLoading(false);
        return;
      }
      setCampeonato({ id: selectedId, ...data });
      setTitle(data.nome);
      if (data.chaveamento) {
        // sanitize loaded chaveamento (convert any undefined to null)
        setChaveamento(sanitizeUndefinedToNull(data.chaveamento));
      } else {
        const generated = generateInitialBracket({
          clubes: data.clubes || [],
          id: selectedId,
          nome: data.nome,
        });
        await set(
          ref(realtimeDb, `campeonatos/${selectedId}/chaveamento`),
          sanitizeUndefinedToNull(generated)
        );
        setChaveamento(generated);
      }
      setLoading(false);
    };
    load();
  }, [selectedId]);

  // compute maximum column height whenever chaveamento changes or window resizes
  useEffect(() => {
    const updateMax = () => {
      const container = fasesContainerRef.current;
      if (!container) return setMaxColHeight(0);
      // only consider direct children (the phase columns)
      const children = Array.from(container.children).filter(
        (n) => n.nodeType === 1
      );
      if (!children.length) return setMaxColHeight(0);
      const heights = children.map((c) => c.offsetHeight || 0);
      const max = Math.max(...heights);
      setMaxColHeight(max);
    };

    // run after next paint to ensure layout computed
    const id = setTimeout(updateMax, 50);
    window.addEventListener("resize", updateMax);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", updateMax);
    };
  }, [chaveamento]);

  const handleSaveChaveamento = async (newChaveamento) => {
    if (!selectedId || !campeonato) return;
    const advanced = computeWinnersAndAdvance(newChaveamento);
    const sanitizedAdvanced = sanitizeUndefinedToNull(advanced);
    const newClubesArray = recomputeClubStats(campeonato, sanitizedAdvanced);

    // write both to DB
    await set(
      ref(realtimeDb, `campeonatos/${selectedId}/chaveamento`),
      sanitizedAdvanced
    );
    await set(
      ref(realtimeDb, `campeonatos/${selectedId}/clubes`),
      newClubesArray
    );

    setChaveamento(sanitizedAdvanced);
    setCampeonato((prev) => ({ ...prev, clubes: newClubesArray }));
  };

  const handleGenerateAgain = async () => {
    if (!campeonato || !selectedId) return;
    const generated = generateInitialBracket(campeonato);
    await set(
      ref(realtimeDb, `campeonatos/${selectedId}/chaveamento`),
      sanitizeUndefinedToNull(generated)
    );
    setChaveamento(generated);
  };

  // side is 'A' or 'B', value is string from input ("" means null)
  const handleUpdateMatchScore = (phaseIndex, matchIndex, side, value) => {
    if (!chaveamento) return;
    const copy = JSON.parse(JSON.stringify(chaveamento));
    const match = copy.fases[phaseIndex].partidas[matchIndex];

    const parsed = value === "" ? null : Number(value);
    // guard against NaN
    match[`gols${side}`] = Number.isFinite(parsed) ? parsed : null;
    // when editing a score, clear winner to recompute
    match.vencedor = null;

    setChaveamento(sanitizeUndefinedToNull(copy));
  };

  const handleSaveAll = async () => {
    if (!chaveamento) return;
    await handleSaveChaveamento(chaveamento);
  };

  if (loading) {
    return (
      <Box p={4}>
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 1,
        }}
      >
        <Button
          onClick={() => handleChange(false)}
          sx={{
            color: "white",
            borderColor: "white",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          Voltar
        </Button>

        <Typography variant="h5" gutterBottom color="white">
          Pagina de Chaveamento
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: "2.4vmax",
          }}
        >
          {title}
        </Typography>
        <Divider
          color="gray"
          sx={{ mb: 2, width: "80%", height: ".0625rem" }}
        ></Divider>
      </Box>
      <Box
        display="flex"
        gap={2}
        alignItems="center"
        mb={2}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-around",
          marginBottom: "5%",
        }}
      >
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel
            sx={{
              color: "white",
              "&.Mui-focused": {
                color: "white",
              },
            }}
          >
            Campeonato
          </InputLabel>
          <Select
            value={selectedId}
            label="Campeonato"
            onChange={(e) => {
              setSelectedId(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
                borderWidth: 2,
              },
              "& .MuiSelect-select": {
                color: "white",
                padding: ".625rem .875rem",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            }}
          >
            {campeonatos.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.nome || c.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleGenerateAgain}
          sx={{
            background: "#5b2c68",
            borderColor: "white",
            border: ".125rem solid",
            padding: ".5rem 1rem",
          }}
        >
          (Re)Gerar Chaveamento
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSaveAll}
          sx={{
            background: "#5b2c68",
            borderColor: "white",
            border: ".125rem solid",
            padding: ".5rem 1rem",
          }}
        >
          Salvar Placar e Atualizar Campeonato
        </Button>
      </Box>
      {!chaveamento ? (
        <Paper sx={{ p: 2 }}>Sem chaveamento</Paper>
      ) : (
        // container ref used to measure children heights
        <Box
          ref={fasesContainerRef}
          display="flex"
          gap={4}
          overflow="auto"
          alignItems="stretch"
          justifyContent={"center"}
        >
          {chaveamento.fases.map((fase, pi) => (
            <Box
              key={pi}
              minWidth={260}
              sx={{
                // ensure each column is at least as tall as the tallest column
                minHeight: maxColHeight ? `${maxColHeight}px` : undefined,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "center",
                padding: 2,
                borderRadius: 2,
                gap: 2,
              }}
            >
              {fase.partidas.map((m, mi) => (
                <Paper
                  key={m.id}
                  sx={{
                    mb: 2,
                    padding: "16px 38.4px",
                    background: m.timeA ? "#157259" : "transparent",
                    border: ".0625rem solid white",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 1,
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      borderBottom: ".0625rem solid white",
                      paddingBottom: 0.5,
                      marginBottom: "10%",
                    }}
                  >
                    {roundLabel(m.id)}
                  </Typography>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={"space-between"}
                    gap={1}
                    mb={1}
                  >
                    <Typography sx={{ width: 120 }}>
                      {m.timeA ? `Clube: ${m.timeA}` : "——"}
                    </Typography>
                    <TextField
                      size="small"
                      type="number"
                      inputProps={{ min: 0 }}
                      value={
                        m.golsA === null || m.golsA === undefined ? "" : m.golsA
                      }
                      onChange={(e) =>
                        handleUpdateMatchScore(pi, mi, "A", e.target.value)
                      }
                      sx={{
                        width: 80,
                        borderRadius: 1,
                        border: ".0625rem solid white",
                        input: { color: "white" },
                      }}
                    />
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={"space-between"}
                    mb={1}
                  >
                    <Typography sx={{ width: 120 }}>
                      {m.timeB ? `Clube: ${m.timeB}` : "——"}
                    </Typography>
                    <TextField
                      size="small"
                      type="number"
                      inputProps={{ min: 0 }}
                      value={
                        m.golsB === null || m.golsB === undefined ? "" : m.golsB
                      }
                      onChange={(e) =>
                        handleUpdateMatchScore(pi, mi, "B", e.target.value)
                      }
                      sx={{
                        width: 80,
                        border: ".0625rem solid white",
                        input: { color: "white" },
                      }}
                    />
                  </Box>

                  <Box
                    display="flex"
                    gap={4}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography>
                      {m.vencedor ? (
                        <>
                          Vencedor:{" "}
                          <span style={{ color: "#98ff8e" }}>{m.vencedor}</span>
                        </>
                      ) : (
                        "Vencedor: ——"
                      )}
                    </Typography>

                    <Box>
                      <Button
                        size="small"
                        onClick={async () => {
                          // save this single match -> recompute everything
                          const copy = JSON.parse(JSON.stringify(chaveamento));
                          await handleSaveChaveamento(copy);
                        }}
                        sx={{
                          textTransform: "none",
                          fontSize: "16px",
                          padding: ".25rem .5rem",
                          color: "white",
                          backgroundColor: "#5b2c68",
                          border: ".0625rem solid white",
                        }}
                      >
                        Salvar partida
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          ))}
        </Box>
      )}

      <Box margin={"5%"}>
        <TabelaPontos selectedChampId={selectedId} />
      </Box>
    </Box>
  );
}
