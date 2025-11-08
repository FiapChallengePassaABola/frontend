import { ref, onValue, get } from "firebase/database";
import { realtimeDb } from "../config/firebase";
import { clubeServiceRealtime } from "./clubeServiceRealtime";

/**
 * Obtém o ranking atual dos times de um campeonato
 * @param {string} campeonatoId - ID do campeonato
 * @returns {Promise<Array>} - Array de times ordenados por pontos
 */
const extractClubesFromCampeonato = (campeonato) => {
  if (!campeonato) return [];

  const rawClubes =
    campeonato.clubes ??
    campeonato.pontosCorridos?.clubes ??
    campeonato.pontosCorridos ??
    [];

  const clubesArray = Array.isArray(rawClubes)
    ? rawClubes
    : Object.values(rawClubes || {});

  return clubesArray.map((clube) => ({
    nome: clube.nome,
    points:
      clube.points ??
      clube.pontos ??
      clube.pontuacao ??
      0,
    wins: clube.wins ?? clube.vitorias ?? 0,
    goalDifference:
      clube.goalDifference ??
      clube.saldoGols ??
      clube.gd ??
      0,
    goalsFor: clube.goalsFor ?? clube.golsPro ?? 0,
    telefone: clube.telefone ?? clube.phone ?? null,
    draws: clube.draws ?? clube.empates ?? 0,
    losses: clube.losses ?? clube.derrotas ?? 0,
    gamesPlayed: clube.gamesPlayed ?? clube.jogos ?? 0,
  }));
};

const getCurrentRanking = async (campeonatoId) => {
  try {
    const campeonatoRef = ref(realtimeDb, `campeonatos/${campeonatoId}`);
    const snapshot = await get(campeonatoRef);

    if (!snapshot.exists()) {
      return [];
    }

    const campeonato = snapshot.val();
    const clubes = extractClubesFromCampeonato(campeonato);

    // Ordena por pontos (maior para menor)
    const ranking = clubes
      .map((clube) => ({
        nome: clube.nome,
        points: clube.points || 0,
        wins: clube.wins || 0,
        goalDifference: clube.goalDifference || 0,
        goalsFor: clube.goalsFor || 0,
        telefone: clube.telefone || null,
      }))
      .sort((a, b) => {
        // Ordena por: pontos -> vitórias -> saldo -> gols marcados
        if (b.points !== a.points) return b.points - a.points;
        if (b.wins !== a.wins) return b.wins - a.wins;
        if (b.goalDifference !== a.goalDifference)
          return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
      });

    return ranking;
  } catch (error) {
    console.error("Erro ao obter ranking:", error);
    return [];
  }
};

// Esta função foi movida para o serviço Node.js
// Mantida aqui apenas para referência

/**
 * Compara dois rankings e identifica mudanças
 * @param {Array} oldRanking - Ranking anterior
 * @param {Array} newRanking - Ranking atual
 * @returns {Object} - Objeto com informações sobre mudanças
 */
const compareRankings = (oldRanking, newRanking) => {
  const changes = {
    newLeader: null, // Time que assumiu a liderança
    passedTeams: [], // Times que foram ultrapassados
    leaderChanged: false,
  };

  if (!oldRanking || oldRanking.length === 0) {
    // Primeira vez, não há comparação
    return changes;
  }

  const oldLeader = oldRanking[0]?.nome;
  const newLeader = newRanking[0]?.nome;

  // Verifica se o líder mudou
  if (oldLeader && newLeader && oldLeader !== newLeader) {
    changes.leaderChanged = true;
    changes.newLeader = newLeader;
  }

  // Verifica times que foram ultrapassados
  oldRanking.forEach((oldTeam, oldIndex) => {
    const newIndex = newRanking.findIndex(
      (t) => t.nome === oldTeam.nome
    );

    if (newIndex !== -1 && newIndex < oldIndex) {
      // Time subiu de posição
      const passedTeams = oldRanking
        .slice(newIndex, oldIndex)
        .map((t) => t.nome)
        .filter((nome) => nome !== oldTeam.nome);

      if (passedTeams.length > 0) {
        changes.passedTeams.push({
          team: oldTeam.nome,
          oldPosition: oldIndex + 1,
          newPosition: newIndex + 1,
          passed: passedTeams,
        });
      }
    }
  });

  return changes;
};

const filterTopThreeChanges = (changes) => {
  return {
    ...changes,
    passedTeams: changes.passedTeams.filter(
      (change) => change.newPosition <= 3
    ),
  };
};

// Funções de criação de mensagens foram movidas para o serviço Node.js
// Mantidas aqui apenas para referência

/**
 * Envia notificações de ranking
 * NOTA: As notificações são enviadas automaticamente pelo serviço Node.js
 * que monitora o Firebase. Esta função apenas registra que houve mudanças.
 * 
 * @param {string} campeonatoId - ID do campeonato
 * @param {string} campeonatoNome - Nome do campeonato
 * @param {Array} oldRanking - Ranking anterior (opcional)
 * @param {Array} newRanking - Ranking atual
 */
export const sendRankingNotifications = async (
  campeonatoId,
  campeonatoNome,
  oldRanking = null,
  newRanking = null
) => {
  try {
    // O serviço Node.js (whatsapp-service/index.js) monitora automaticamente
    // as mudanças no Firebase e envia as notificações.
    // Esta função apenas registra que houve uma atualização.
    
    if (!newRanking) {
      newRanking = await getCurrentRanking(campeonatoId);
    }

    if (newRanking.length === 0) {
      console.log("Nenhum time no ranking para notificar");
      return;
    }

    const allChanges = compareRankings(oldRanking, newRanking);
    const changes = filterTopThreeChanges(allChanges);

    if (changes.leaderChanged || changes.passedTeams.length > 0) {
      console.log(
        `📊 Mudanças detectadas no ranking do campeonato: ${campeonatoNome}`
      );
      console.log(
        "💡 O serviço de WhatsApp será notificado automaticamente via Firebase"
      );
      
      if (changes.leaderChanged) {
        console.log(`🏆 Novo líder: ${changes.newLeader}`);
      }
      
      if (changes.passedTeams.length > 0) {
        console.log(
          `⚠️ Times ultrapassados: ${changes.passedTeams.map((t) => t.team).join(", ")}`
        );
      }
    }
  } catch (error) {
    console.error("Erro ao processar notificações de ranking:", error);
  }
};

/**
 * Monitora mudanças no ranking de um campeonato
 * @param {string} campeonatoId - ID do campeonato
 * @param {Function} callback - Callback chamado quando há mudanças
 * @returns {Function} - Função para parar o monitoramento
 */
export const monitorRankingChanges = (campeonatoId, callback) => {
  let previousRanking = null;

  const campeonatoRef = ref(realtimeDb, `campeonatos/${campeonatoId}`);

  const unsubscribe = onValue(campeonatoRef, async (snapshot) => {
    if (!snapshot.exists()) {
      return;
    }

    const campeonato = snapshot.val();
    const clubes = extractClubesFromCampeonato(campeonato);

    const currentRanking = clubes
      .map((clube) => ({
        nome: clube.nome,
        points: clube.points || 0,
        wins: clube.wins || 0,
        goalDifference: clube.goalDifference || 0,
        goalsFor: clube.goalsFor || 0,
        telefone: clube.telefone || null,
      }))
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.wins !== a.wins) return b.wins - a.wins;
        if (b.goalDifference !== a.goalDifference)
          return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
      });

    if (previousRanking !== null) {
      const changes = compareRankings(previousRanking, currentRanking);
      if (changes.leaderChanged || changes.passedTeams.length > 0) {
        await callback(campeonato.nome, previousRanking, currentRanking);
      }
    }

    previousRanking = currentRanking;
  });

  return unsubscribe;
};

