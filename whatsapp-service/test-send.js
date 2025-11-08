import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import { existsSync, mkdirSync } from "fs";
import path, { dirname } from "path";
import pino from "pino";
import qrcode from "qrcode-terminal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const AUTH_DIR = path.join(__dirname, ".wwebjs_auth");

if (!existsSync(AUTH_DIR)) {
  mkdirSync(AUTH_DIR, { recursive: true });
}

const logger = pino({ level: "silent" });
let socket = null;
let isConnecting = false;

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

  return new Promise((resolve, reject) => {
    isConnecting = true;
    console.log("📱 Iniciando conexão com WhatsApp...");

    useMultiFileAuthState(AUTH_DIR)
      .then(({ state, saveCreds }) => {
        return fetchLatestBaileysVersion().then(({ version }) => {
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
              
              if (statusCode === DisconnectReason.loggedOut) {
                console.log("⚠️ Você foi desconectado. Removendo credenciais...");
                import("fs").then(({ rmSync }) => {
                  try {
                    rmSync(AUTH_DIR, { recursive: true, force: true });
                    console.log("✅ Credenciais removidas. Execute novamente para gerar novo QR Code.");
                  } catch (e) {
                    console.log("⚠️ Não foi possível remover credenciais automaticamente.");
                  }
                });
              }
              
              isConnecting = false;
              socket = null;
              reject(new Error("Conexão fechada"));
            } else if (connection === "open") {
              console.log("\n" + "=".repeat(50));
              console.log("✅ WHATSAPP CONECTADO COM SUCESSO!");
              console.log("=".repeat(50));
              console.log(`📱 Conectado como: ${socket.user?.id || "Usuário"}\n`);
              isConnecting = false;
              resolve(socket);
            }
          });
        });
      })
      .catch((error) => {
        console.error("❌ Erro ao conectar WhatsApp:", error);
        isConnecting = false;
        socket = null;
        reject(error);
      });
  });
};

const checkNumber = async (formattedNumber) => {
  try {
    if (!socket || !socket.onWhatsApp) {
      return null;
    }
    const results = await socket.onWhatsApp([formattedNumber]);
    if (results && results.length > 0) {
      return results[0]?.exists || false;
    }
    return false;
  } catch (error) {
    console.error("Erro ao verificar número:", error.message);
    return null;
  }
};

const sendTestMessage = async (phoneNumber) => {
  try {
    console.log("🔗 Conectando ao WhatsApp...");
    await connectWhatsApp();

    console.log("⏳ Aguardando conexão estabelecer...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (!socket || !socket.user) {
      console.error("❌ WhatsApp não está conectado");
      console.error("💡 Certifique-se de escanear o QR Code se apareceu");
      return false;
    }

    console.log("✅ WhatsApp conectado!");
    console.log(`👤 Conectado como: ${socket.user.id || "Usuário"}\n`);

    const formattedNumber = formatPhoneToWhatsApp(phoneNumber);
    if (!formattedNumber) {
      console.error("❌ Número de telefone inválido:", phoneNumber);
      return false;
    }

    console.log(`📱 Número original: ${phoneNumber}`);
    console.log(`📱 Número formatado: ${formattedNumber}`);
    
    console.log("\n🔍 Verificando se o número existe no WhatsApp...");
    const numberExists = await checkNumber(formattedNumber);
    if (numberExists === null) {
      console.log("⚠️ Não foi possível verificar o número");
      console.log("💡 Vamos tentar enviar mesmo assim...\n");
    } else if (numberExists) {
      console.log("✅ Número encontrado no WhatsApp!\n");
    } else {
      console.log("⚠️ ATENÇÃO: Este número pode não estar registrado no WhatsApp");
      console.log("💡 Isso pode ser um problema. Verifique se:");
      console.log("   - O número está correto (com DDD e código do país)");
      console.log("   - O número tem WhatsApp ativo");
      console.log("   - Você salvou o contato no WhatsApp\n");
    }

    const testMessage = `⚠️ *ATENÇÃO: Você foi ultrapassado!* ⚠️

📊 *Campeonato Teste*

Seu time *Time Teste* foi ultrapassado por:
• 1111
• SSSSSS

Sua posição: 2º → 4º

Não desista! Ainda dá tempo de recuperar! 💪⚽

---
*Esta é uma mensagem do BotPassaBola*`;

    console.log("📤 Enviando mensagem...");
    console.log("=".repeat(50));
    
    const result = await socket.sendMessage(formattedNumber, { text: testMessage });
    
    console.log("=".repeat(50));
    console.log("✅ MENSAGEM ENVIADA!");
    console.log("=".repeat(50));
    console.log(`📱 Para: ${phoneNumber} (${formattedNumber})`);
    console.log(`📝 Tipo: Notificação de ultrapassagem`);
    console.log(`🆔 ID da mensagem: ${result?.key?.id || "N/A"}`);
    console.log("\n💡 IMPORTANTE:");
    console.log("   - Se não recebeu a mensagem, verifique se:");
    console.log("     1. O número está correto");
    console.log("     2. O número tem WhatsApp ativo");
    console.log("     3. Você não bloqueou este número");
    console.log("     4. O WhatsApp está conectado corretamente\n");
    
    return true;
  } catch (error) {
    console.error("\n❌ ERRO AO ENVIAR MENSAGEM:");
    console.error("=".repeat(50));
    console.error("Tipo:", error.constructor.name);
    console.error("Mensagem:", error.message);
    
    if (error.message?.includes("not-authorized")) {
      console.error("\n💡 Erro: Não autorizado");
      console.error("   - Verifique se o WhatsApp está conectado");
      console.error("   - Tente escanear o QR Code novamente");
    } else if (error.message?.includes("not-authorized")) {
      console.error("\n💡 Erro: Número não encontrado");
      console.error("   - Verifique se o número está correto");
      console.error("   - Verifique se o número tem WhatsApp");
    } else if (error.message?.includes("rate limit")) {
      console.error("\n💡 Erro: Muitas mensagens enviadas");
      console.error("   - Aguarde alguns minutos antes de tentar novamente");
    }
    
    console.error("\nStack:", error.stack);
    return false;
  }
};

const phoneNumber = process.argv[2] || "5511955556138";

console.log("🧪 TESTE DE ENVIO DE MENSAGEM VIA WHATSAPP");
console.log("=".repeat(50));
console.log(`📱 Número de destino: ${phoneNumber}`);
console.log(`💡 Para testar outro número, use: npm run whatsapp:test -- 5511999999999`);
console.log("=".repeat(50) + "\n");

sendTestMessage(phoneNumber)
  .then((success) => {
    if (success) {
      console.log("\n✅ Teste concluído com sucesso!");
      console.log("💡 Verifique o WhatsApp do número informado.\n");
    } else {
      console.log("\n❌ Teste falhou. Verifique os erros acima.\n");
    }
    setTimeout(() => {
      process.exit(success ? 0 : 1);
    }, 3000);
  })
  .catch((error) => {
    console.error("\n❌ Erro fatal:", error);
    process.exit(1);
  });

