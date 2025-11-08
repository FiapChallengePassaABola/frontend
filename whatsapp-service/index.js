import { ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";
import pino from "pino";
import qrcode from "qrcode-terminal";
import path from "path";
import { existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

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

    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
    const { version } = await fetchLatestBaileysVersion();
    
    console.log(`✅ Versão do Baileys: ${version.join(".")}`);
    console.log(`🔐 Estado de autenticação: ${state.creds?.registered ? "Registrado" : "Não registrado"}`);

    socket = makeWASocket({
      version,
      logger,
      printQRInTerminal: true,
      auth: state,
      browser: ["PassaBola", "Chrome", "1.0.0"],
      getMessage: async (key) => {
        return {
          conversation: "Mensagem não encontrada",
        };
      },
    });

    socket.ev.on("creds.update", saveCreds);

    socket.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect, qr, isNewLogin } = update;

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
              } catch (e) {
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

