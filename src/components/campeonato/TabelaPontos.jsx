import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../../config/firebase";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
} from "@mui/material";

function TabelaPontos(props) {
  const { selectedChampId } = props || {};
  const [championships, setChampionships] = useState([]);
  const [selectedChamp, setSelectedChamp] = useState(selectedChampId || "");
  const [teams, setTeams] = useState([]);

  const emojis = [
    "⚽",
    "🔥",
    "🐍",
    "🦁",
    "🐅",
    "🦅",
    "🐺",
    "🐉",
    "👑",
    "🎯",
    "💀",
    "🚀",
    "🐂",
    "🐬",
    "🦈",
    "🦊",
    "🐻",
    "🦂",
    "🐗",
    "💫",
  ];
  const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

  // 🔹 Busca campeonatos no Firebase
  useEffect(() => {
    const campeonatosRef = ref(realtimeDb, "campeonatos");

    const unsubscribe = onValue(campeonatosRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const lista = Object.entries(data).map(([id, value]) => ({
          id,
          nome: value.nome || `Campeonato ${id}`,
          clubes: value.clubes || [],
        }));

        setChampionships(lista);

        // Define o primeiro campeonato como padrão
        if (lista.length > 0 && !selectedChamp && !selectedChampId) {
          setSelectedChamp(lista[0].id);
        }
      }
    });

    return () => unsubscribe();
  }, [selectedChamp]);

  // 🔹 Atualiza os times conforme o campeonato selecionado
  useEffect(() => {
    // if parent passed selectedChampId, use it
    const effectiveSelected = selectedChampId || selectedChamp;
    if (!effectiveSelected) return;
    const campeonato = championships.find((c) => c.id === effectiveSelected);
    if (campeonato) {
      const clubes = campeonato.clubes.map((clube, index) => ({
        id: index,
        name: clube.nome,
        logo: randomEmoji(),
        played: clube.gamesPlayed,
        wins: clube.wins,
        draws: clube.draws,
        losses: clube.losses,
        gf: clube.goalsFor,
        ga: clube.goalsAgainst,
        gd: clube.goalDifference,
        points: clube.points,
      }));

      // 🔸 Ordena por vitórias → pontos → saldo → gols marcados
      clubes.sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins;
        if (b.points !== a.points) return b.points - a.points;
        if (b.gd !== a.gd) return b.gd - a.gd;
        return b.gf - a.gf;
      });

      setTeams(clubes);
    }
  }, [selectedChamp, championships, selectedChampId]);

  return (
    <Box
      className="w-full mx-auto"
      sx={{
        ...props,
      }}
    >
      {/* SELECTOR DE CAMPEONATOS */}
      {/* show selector only when parent doesn't force a championship */}
      {!selectedChampId && (
        <Box
          display="flex"
          justifyContent="start"
          alignItems="start"
          mt={3}
          mb={2}
        >
          <FormControl sx={{ minWidth: 250 }}>
            <InputLabel sx={{ color: "white" }}>
              Selecione o Campeonato
            </InputLabel>
            <Select
              value={selectedChamp}
              label="Selecione o Campeonato"
              onChange={(e) => setSelectedChamp(e.target.value)}
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#8B5DE4",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#8B5DE4",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
                "&.Mui-focused": {
                  color: "#8B5DE4",
                },
                "&.Mui-focused .MuiSelect-select": {
                  color: "#8B5DE4",
                },
              }}
            >
              {championships.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* SE NÃO TIVER SELECIONADO NENHUM */}
      {!selectedChamp ? (
        <Typography variant="h6" align="center" sx={{ color: "white", mt: 3 }}>
          Selecione um campeonato para ver a tabela
        </Typography>
      ) : (
        <div className="rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 bg-[#140913]/80">
          <div className="px-4 sm:px-6 lg:px-8 py-4 bg-gradient-to-r from-emerald-700/70 to-lime-700/70 border-b border-white/10">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white text-center">
              {
                championships.find(
                  (c) => c.id === (selectedChampId || selectedChamp)
                )?.nome
              }
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-white/90 text-xs sm:text-sm bg-black/30">
                  <th className="px-3 py-3 text-left font-semibold">Pos</th>
                  <th className="px-3 py-3 text-left font-semibold">Clube</th>
                  <th className="px-3 py-3 text-center font-semibold">J</th>
                  <th className="px-3 py-3 text-center font-semibold">V</th>
                  <th className="px-3 py-3 text-center font-semibold">E</th>
                  <th className="px-3 py-3 text-center font-semibold">D</th>
                  <th className="px-3 py-3 text-center font-semibold">GP</th>
                  <th className="px-3 py-3 text-center font-semibold">GC</th>
                  <th className="px-3 py-3 text-center font-semibold">SG</th>
                  <th className="px-3 py-3 text-center font-semibold">Pts</th>
                </tr>
              </thead>

              <tbody>
                {teams.map((t, idx) => (
                  <tr
                    key={t.id}
                    className="text-white text-xs sm:text-sm lg:text-base"
                  >
                    <td className="px-3 py-3 text-center">
                      <div
                        className={`w-8 h-8 grid place-items-center rounded-full font-extrabold border ${
                          idx === 0
                            ? "bg-emerald-500/90 border-emerald-300"
                            : idx === 1
                            ? "bg-emerald-400/90 border-emerald-300"
                            : idx === 2
                            ? "bg-emerald-300/90 border-emerald-200"
                            : "bg-white/10 border-white/20"
                        }`}
                      >
                        {idx + 1}
                      </div>
                    </td>

                    <td className="px-3 py-3 flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full grid place-items-center bg-white/10 border border-white/30">
                        <span className="text-lg sm:text-xl">{t.logo}</span>
                      </div>
                      <span className="font-semibold">{t.name}</span>
                    </td>

                    <td className="px-3 py-3 text-center">{t.played}</td>
                    <td className="px-3 py-3 text-center font-bold text-green-400">
                      {t.wins}
                    </td>
                    <td className="px-3 py-3 text-center">{t.draws}</td>
                    <td className="px-3 py-3 text-center">{t.losses}</td>
                    <td className="px-3 py-3 text-center">{t.gf}</td>
                    <td className="px-3 py-3 text-center">{t.ga}</td>
                    <td className="px-3 py-3 text-center font-semibold">
                      {t.gd}
                    </td>
                    <td className="px-3 py-3 text-center font-bold">
                      {t.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Box>
  );
}
export default TabelaPontos;
