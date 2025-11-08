import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState as initAuthState,
} from "@whiskeysockets/baileys";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { existsSync, mkdirSync } from "fs";
import path, { dirname } from "path";
import pino from "pino";
import qrcode from "qrcode-terminal";
import { fileURLToPath } from "url";

/* global process */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const firebaseConfig = {
  apiKey: "AIzaSyAjYgQipDJ5Sn1efoDV1b2iTdBDRn2Jwi4",
  authDomain: "passabola-9654f.firebaseapp.com",
  databaseURL: "https://passabola-9654f-default-rtdb.firebaseio.com",
  projectId: "passabola-9654f",
  storageBucket: "passabola-9654f.firebasestorage.app",
  messagingSenderId: "544206042913",
  appId: "1:544206042913:web:d0fb00b57ba638dc12b060",
};

const app = initializeApp(firebaseConfig);
const realtimeDb = getDatabase(app);

const AUTH_DIR = path.join(__dirname, ".wwebjs_auth");
const ADMIN_COMMANDERS = new Set([
  "5511955556138@s.whatsapp.net",
  "5511951080850@s.whatsapp.net",
  "5511996723423@s.whatsapp.net",
]);
const pendingFinalizationSelection = new Map();

if (!existsSync(AUTH_DIR)) {
  mkdirSync(AUTH_DIR, { recursive: true });
}

let socket = null;
let isConnecting = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

const logger = pino({ level: "silent" });

const formatPhoneToWhatsApp = (phoneNumber) => {
  if (!phoneNumber) return null;
  let cleaned = phoneNumber.replace(/\D/g, "");
  if (!cleaned.startsWith("55")) {
    cleaned = "55" + cleaned;
  }
  return cleaned + "@s.whatsapp.net";
};

const connectWhatsApp = async () => {
  if (socket && socket.user) {
    console.log("✅ WhatsApp já está conectado");
    return socket;
  }

  if (isConnecting) {
    console.log("⏳ Conexão já em andamento...");
    return null;
  }

  try {
    isConnecting = true;
    console.log("📱 Iniciando conexão com WhatsApp...");
    console.log(`📁 Diretório de autenticação: ${AUTH_DIR}`);

    const { state, saveCreds } = await initAuthState(AUTH_DIR);
    const { version } = await fetchLatestBaileysVersion();
    
    console.log(`✅ Versão do Baileys: ${version.join(".")}`);
    console.log(`🔐 Estado de autenticação: ${state.creds?.registered ? "Registrado" : "Não registrado"}`);

    socket = makeWASocket({
      version,
      logger,
      printQRInTerminal: true,
      auth: state,
      browser: ["PassaBola", "Chrome", "1.0.0"],
      getMessage: async () => {
        return {
          conversation: "Mensagem não encontrada",
        };
      },
    });

    socket.ev.on("creds.update", saveCreds);

    socket.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        console.log("\n" + "=".repeat(50));
        console.log("📱 QR CODE GERADO - ESCANEIE COM O WHATSAPP");
        console.log("=".repeat(50));
        console.log("\n1. Abra o WhatsApp no seu celular");
        console.log("2. Vá em: Configurações > Aparelhos conectados > Conectar um aparelho");
        console.log("3. Escaneie o QR Code abaixo:\n");
        
        try {
          qrcode.generate(qr, { small: false });
          console.log("\n" + "=".repeat(50));
          console.log("⏳ Aguardando escaneamento do QR Code...");
          console.log("=".repeat(50) + "\n");
        } catch (error) {
          console.error("❌ Erro ao gerar QR Code:", error);
          console.log("\nQR Code string (copie e cole em um gerador online):");
          console.log(qr);
        }
      }

      if (connection === "connecting") {
        console.log("🔄 Conectando ao WhatsApp...");
      }

      if (connection === "close") {
        const statusCode = (lastDisconnect?.error)?.output?.statusCode;
        const error = lastDisconnect?.error;
        
        console.log("\n❌ Conexão fechada");
        if (error) {
          console.log("Erro:", error.message || error);
        }
        
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

        if (shouldReconnect && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttempts++;
          console.log(
            `🔄 Tentando reconectar... (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`
          );
          setTimeout(() => {
            socket = null;
            isConnecting = false;
            connectWhatsApp();
          }, 5000);
        } else {
          if (statusCode === DisconnectReason.loggedOut) {
            console.log("⚠️ Você foi desconectado. Removendo credenciais...");
            import("fs").then(({ rmSync }) => {
              try {
                rmSync(AUTH_DIR, { recursive: true, force: true });
                console.log("✅ Credenciais removidas. Execute novamente para gerar novo QR Code.");
              } catch {
                console.log("⚠️ Não foi possível remover credenciais automaticamente.");
              }
            }).catch(() => {
              console.log("⚠️ Não foi possível remover credenciais automaticamente.");
            });
          }
          console.log("❌ Não foi possível reconectar. Execute o serviço novamente.");
          socket = null;
          isConnecting = false;
        }
      } else if (connection === "open") {
        console.log("\n" + "=".repeat(50));
        console.log("✅ WHATSAPP CONECTADO COM SUCESSO!");
        console.log("=".repeat(50));
        console.log(`📱 Conectado como: ${socket.user?.id || "Usuário"}`);
        reconnectAttempts = 0;
        isConnecting = false;
      }
    });

    socket.ev.on("messages.upsert", async (msg) => {
      try {
        if (msg?.type !== "notify" || !msg.messages?.length) {
          return;
        }
        await handleIncomingMessages(msg.messages);
      } catch (error) {
        console.error("❌ Erro ao processar mensagens recebidas:", error);
      }
    });

    return socket;
  } catch (error) {
    console.error("\n❌ ERRO AO CONECTAR WHATSAPP:");
    console.error("Mensagem:", error.message);
    console.error("Stack:", error.stack);
    isConnecting = false;
    socket = null;
    
    if (error.message?.includes("auth") || error.message?.includes("credentials")) {
      console.log("\n⚠️ Erro de autenticação detectado.");
      console.log("💡 Tente remover a pasta .wwebjs_auth e executar novamente.");
    }
    
    throw error;
  }
};

const sendWhatsAppMessage = async (phoneNumber, message) => {
  try {
    if (!socket || !socket.user) {
      console.log("⚠️ WhatsApp não está conectado. Tentando conectar...");
      await connectWhatsApp();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      if (!socket || !socket.user) {
        console.error("❌ Não foi possível conectar ao WhatsApp");
        return false;
      }
    }

    const formattedNumber = formatPhoneToWhatsApp(phoneNumber);
    if (!formattedNumber) {
      console.error("❌ Número de telefone inválido:", phoneNumber);
      return false;
    }

    await socket.sendMessage(formattedNumber, { text: message });
    console.log(`✅ Mensagem enviada para ${phoneNumber}`);
    return true;
  } catch (error) {
    console.error("❌ Erro ao enviar mensagem WhatsApp:", error);
    return false;
  }
};

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

const getClubeTelefoneFromDB = async (nomeClube) => {
  try {
    const { get, ref: dbRef } = await import("firebase/database");
    const clubesRef = dbRef(realtimeDb, "clubes");
    const snapshot = await get(clubesRef);

    if (snapshot.exists()) {
      const clubes = [];
      snapshot.forEach((childSnapshot) => {
        clubes.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });

      const clube = clubes.find((c) => c.nome === nomeClube);
      return clube?.telefone || null;
    }

    return null;
  } catch (error) {
    console.error("❌ Erro ao buscar WhatsApp do clube:", error);
    return null;
  }
};

const resolveTelefone = async (nomeClube, fallbackInfo = null) => {
  const telefone =
    fallbackInfo?.telefone ??
    fallbackInfo?.responsavelTelefone ??
    null;

  if (telefone) {
    return telefone;
  }

  return await getClubeTelefoneFromDB(nomeClube);
};

const createPodiumSummaryMessage = (campeonatoNome, top3) => {
  const medals = ["🥇", "🥈", "🥉"];
  const lines = top3.map((clube, index) => {
    const medal = medals[index] || `${index + 1}º`;
    return `${medal} ${clube.nome} — ${clube.points} pts`;
  });

  return (
    `🏁 *Campeonato finalizado!*\n\n` +
    `📛 *${campeonatoNome}*\n\n` +
    `${lines.join("\n")}\n\n` +
    `Parabéns aos vencedores e obrigado a todos que participaram!`
  );
};

const createWinnerPodiumMessage = (position, clube, campeonatoNome) => {
  const medals = ["🥇", "🥈", "🥉"];
  const positionLabel =
    position === 1
      ? "Primeiro Lugar"
      : position === 2
      ? "Segundo Lugar"
      : position === 3
      ? "Terceiro Lugar"
      : `${position}º Lugar`;
  const medal = medals[position - 1] || "🏆";

  return (
    `${medal} *${positionLabel}*\n` +
    `*${campeonatoNome}*\n\n` +
    `🏟️ Time: ${clube.nome}\n` +
    `📊 Pontos: ${clube.points}\n` +
    (clube.wins !== undefined ? `✅ Vitórias: ${clube.wins}\n` : "") +
    (clube.goalDifference !== undefined
      ? `⚖️ Saldo de gols: ${clube.goalDifference}\n`
      : "") +
    `\nParabéns pela campanha! 🏆⚽`
  );
};

const jidToPhone = (jid) => {
  if (!jid) return null;
  return jid.split("@")[0] || null;
};

const compareRankings = (oldRanking, newRanking) => {
  const changes = {
    newLeader: null,
    passedTeams: [],
    leaderChanged: false,
  };

  if (!oldRanking || oldRanking.length === 0) {
    return changes;
  }

  const oldLeader = oldRanking[0]?.nome;
  const newLeader = newRanking[0]?.nome;

  if (oldLeader && newLeader && oldLeader !== newLeader) {
    changes.leaderChanged = true;
    changes.newLeader = newLeader;
  }

  oldRanking.forEach((oldTeam, oldIndex) => {
    const newIndex = newRanking.findIndex((t) => t.nome === oldTeam.nome);

    if (newIndex !== -1 && newIndex < oldIndex) {
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

const sendMessageToJid = async (jid, message) => {
  if (!jid || !message) return;
  if (!socket || !socket.user) {
    await connectWhatsApp();
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  try {
    await socket.sendMessage(jid, { text: message });
  } catch (error) {
    console.error(`❌ Erro ao enviar mensagem para ${jid}:`, error);
  }
};

const fetchAllCampeonatos = async () => {
  const { get, ref: dbRef } = await import("firebase/database");

  const campeonatosRef = dbRef(realtimeDb, "campeonatos");
  const snapshot = await get(campeonatosRef);
  if (!snapshot.exists()) {
    return [];
  }

  const entries = Object.entries(snapshot.val());
  if (!entries.length) {
    return [];
  }

  return entries.map(([id, dados]) => ({
    id,
    dados,
  }));
};

const handleFinalizeCommand = async (senderJid, rawArgument = null) => {
  const senderNumber = jidToPhone(senderJid);
  const trimmedArgument = rawArgument ? rawArgument.trim() : "";

  console.log(
    `📬 Comando 'finalizado' recebido de ${senderNumber} (argumento: ${
      trimmedArgument || "listar"
    })`
  );

  const pendingList = pendingFinalizationSelection.get(senderJid);
  const hasPending = Array.isArray(pendingList) && pendingList.length > 0;

  if (!trimmedArgument) {
    const campeonatos = await fetchAllCampeonatos();

    if (!campeonatos.length) {
      await sendMessageToJid(
        senderJid,
        "⚠️ Não encontrei campeonatos ativos no momento."
      );
      return;
    }

    pendingFinalizationSelection.set(senderJid, campeonatos);

    const listMessage =
      "📋 *Campeonatos disponíveis:*\n\n" +
      campeonatos
        .map((item, index) => {
          const name = item.dados?.nome || `Campeonato ${item.id}`;
          return `${index + 1}. ${name}\n   ID: ${item.id}`;
        })
        .join("\n\n") +
      "\n\nEnvie *finalizado <número>* para escolher da lista acima ou *finalizado <nome>* para localizar por nome/ID.";

    await sendMessageToJid(senderJid, listMessage);
    return;
  }

  let target = null;

  if (/^\d+$/.test(trimmedArgument) && hasPending) {
    const index = Number(trimmedArgument) - 1;
    if (pendingList[index]) {
      target = pendingList[index];
    }
  }

  if (!target) {
    const searchPool = hasPending ? pendingList : await fetchAllCampeonatos();
    const lowered = trimmedArgument.toLowerCase();
    target =
      searchPool.find((item) => item.id === trimmedArgument) ||
      searchPool.find(
        (item) =>
          (item.dados?.nome || "").toLowerCase() === lowered ||
          (item.dados?.nome || "").toLowerCase().includes(lowered)
      ) ||
      null;

    if (!target) {
      await sendMessageToJid(
        senderJid,
        "❌ Não encontrei o campeonato informado. Envie apenas `finalizado` para listar todos novamente."
      );
      return;
    }
  }

  pendingFinalizationSelection.delete(senderJid);

  await sendMessageToJid(
    senderJid,
    "⏳ Recebi o comando *finalizado*. Vou gerar o pódio..."
  );

  if (!target) {
    await sendMessageToJid(
      senderJid,
      "❌ Não encontrei nenhum campeonato para finalizar."
    );
    return;
  }

  const campeonatoNome = target.dados.nome || target.id;
  const clubes = extractClubesFromCampeonato(target.dados).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.goalDifference !== a.goalDifference)
      return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  if (!clubes.length) {
    await sendMessageToJid(
      senderJid,
      `⚠️ O campeonato *${campeonatoNome}* não possui clubes para gerar o pódio.`
    );
    return;
  }

  const top3 = clubes.slice(0, 3);
  const summaryMessage = createPodiumSummaryMessage(campeonatoNome, top3);

  await sendMessageToJid(senderJid, summaryMessage);

  const missingPhones = [];

  for (let index = 0; index < top3.length; index++) {
    const clube = top3[index];
    const telefone = await resolveTelefone(clube.nome, clube);

    if (!telefone) {
      missingPhones.push(clube.nome);
      console.log(
        `⚠️ Telefone indisponível para ${clube.nome}. Não foi enviada mensagem de pódio.`
      );
      continue;
    }

    const winnerMessage = createWinnerPodiumMessage(
      index + 1,
      clube,
      campeonatoNome
    );
    await sendWhatsAppMessage(telefone, winnerMessage);
  }

  if (missingPhones.length) {
    await sendMessageToJid(
      senderJid,
      `⚠️ Não encontrei telefone para: ${missingPhones.join(
        ", "
      )}. Mensagem individual não enviada para esses clubes.`
    );
  }

  await sendMessageToJid(
    senderJid,
    `✅ Processo concluído! Pódio comunicado para o campeonato *${campeonatoNome}*.`
  );
};

const extractIncomingText = (message) => {
  if (!message) return "";
  const msg = message.message || {};

  if (msg.conversation) return msg.conversation;
  if (msg.extendedTextMessage?.text) return msg.extendedTextMessage.text;
  if (msg.imageMessage?.caption) return msg.imageMessage.caption;
  if (msg.videoMessage?.caption) return msg.videoMessage.caption;
  if (msg.ephemeralMessage?.message) {
    return extractIncomingText({ message: msg.ephemeralMessage.message });
  }
  return "";
};

const handleIncomingMessages = async (messages) => {
  for (const msg of messages) {
    if (!msg || msg.key?.fromMe) {
      continue;
    }

    const senderJid = msg.key.remoteJid;
    if (!ADMIN_COMMANDERS.has(senderJid)) {
      continue;
    }

    const text = extractIncomingText(msg)?.trim();
    if (!text) {
      continue;
    }

    const lower = text.toLowerCase();
    if (lower.startsWith("finalizado")) {
      const parts = text.split(/\s+/);
      const maybeId = parts.length > 1 ? parts[1] : null;
      await handleFinalizeCommand(senderJid, maybeId);
    }
  }
};

const createLeaderMessage = (campeonatoNome, leader) => {
  return `🏆 *PARABÉNS! Você está na LIDERANÇA!* 🏆

📊 *${campeonatoNome}*

Seu time *${leader.nome}* está em *1º lugar* com:
• ${leader.points} pontos
• ${leader.wins} vitórias
• Saldo de gols: ${leader.goalDifference > 0 ? "+" : ""}${leader.goalDifference}

Continue assim! 💪⚽`;
};

const createPassedMessage = (campeonatoNome, change) => {
  return `⚠️ *ATENÇÃO: Você foi ultrapassado!* ⚠️

📊 *${campeonatoNome}*

Seu time *${change.team}* foi ultrapassado por:
${change.passed.map((t) => `• ${t}`).join("\n")}

Sua posição: ${change.oldPosition}º → ${change.newPosition}º

Não desista! Ainda dá tempo de recuperar! 💪⚽`;
};

const monitorCampeonatos = () => {
  console.log("🔍 Iniciando monitoramento de campeonatos...");

  const campeonatosRef = ref(realtimeDb, "campeonatos");

  onValue(campeonatosRef, async (snapshot) => {
    if (!snapshot.exists()) {
      return;
    }

    const campeonatos = snapshot.val();
    const previousRankings = {};

    Object.keys(campeonatos).forEach((campeonatoId) => {
      const campeonatoRef = ref(
        realtimeDb,
        `campeonatos/${campeonatoId}`
      );

      onValue(campeonatoRef, async (campeonatoSnapshot) => {
        if (!campeonatoSnapshot.exists()) {
          return;
        }

        const campeonato = campeonatoSnapshot.val();
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

        const key = campeonatoId;
        const oldRanking = previousRankings[key];

        if (oldRanking) {
          const allChanges = compareRankings(oldRanking, currentRanking);
          const changes = filterTopThreeChanges(allChanges);

          if (changes.leaderChanged || changes.passedTeams.length > 0) {
            console.log(
              `📢 Mudanças detectadas no campeonato: ${campeonato.nome}`
            );

            if (changes.leaderChanged) {
              const leader = currentRanking[0];
              const leaderWhatsApp = await resolveTelefone(
                leader.nome,
                leader
              );

              if (leaderWhatsApp) {
                const message = createLeaderMessage(campeonato.nome, leader);
                await sendWhatsAppMessage(leaderWhatsApp, message);
              } else {
                console.log(
                  `⚠️ Telefone não encontrado para líder: ${leader.nome}`
                );
              }
            }

            for (const change of changes.passedTeams) {
              const rankingInfo = currentRanking.find(
                (item) => item.nome === change.team
              );
              const teamWhatsApp = await resolveTelefone(
                change.team,
                rankingInfo
              );

              if (teamWhatsApp) {
                const message = createPassedMessage(campeonato.nome, change);
                await sendWhatsAppMessage(teamWhatsApp, message);
              } else {
                console.log(
                  `⚠️ Telefone não encontrado para time: ${change.team}`
                );
              }
            }
          }
        }

        previousRankings[key] = currentRanking;
      });
    });
  });
};

(async () => {
  console.log("🚀 Iniciando serviço de notificações WhatsApp...\n");
  
  try {
    await connectWhatsApp();
    const checkConnection = setInterval(() => {
      if (socket && socket.user) {
        console.log("\n✅ WhatsApp conectado! Iniciando monitoramento...\n");
        clearInterval(checkConnection);
        monitorCampeonatos();
      }
    }, 1000);
    setTimeout(() => {
      clearInterval(checkConnection);
      if (!socket || !socket.user) {
        console.log("\n⚠️ Ainda aguardando conexão do WhatsApp...");
        console.log("💡 Certifique-se de escanear o QR Code se ele apareceu.");
      }
    }, 60000);
    
  } catch (error) {
    console.error("\n❌ Falha ao iniciar serviço:", error);
    process.exit(1);
  }
})();

