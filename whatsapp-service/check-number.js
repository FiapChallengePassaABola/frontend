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

const AUTH_DIR = path.join(__dirname, ".wwebjs_auth");
if (!existsSync(AUTH_DIR)) {
  mkdirSync(AUTH_DIR, { recursive: true });
}

const logger = pino({ level: "silent" });
let socket = null;

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
    return socket;
  }

  return new Promise((resolve, reject) => {
    useMultiFileAuthState(AUTH_DIR)
      .then(({ state, saveCreds }) => {
        return fetchLatestBaileysVersion().then(({ version }) => {
          socket = makeWASocket({
            version,
            logger,
            auth: state,
            browser: ["PassaBola", "Chrome", "1.0.0"],
          });

          socket.ev.on("creds.update", saveCreds);
          socket.ev.on("connection.update", (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
              console.log("\n📱 QR CODE:");
              qrcode.generate(qr, { small: false });
            }

            if (connection === "close") {
              reject(new Error("Conexão fechada"));
            } else if (connection === "open") {
              resolve(socket);
            }
          });
        });
      })
      .catch(reject);
  });
};

const checkNumber = async (phoneNumber) => {
  try {
    await connectWhatsApp();
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const formattedNumber = formatPhoneToWhatsApp(phoneNumber);
    console.log(`\n📱 Verificando: ${phoneNumber}`);
    console.log(`📱 Formatado: ${formattedNumber}\n`);

    const results = await socket.onWhatsApp([formattedNumber]);
    const result = results[0];

    if (result?.exists) {node
      console.log("✅ NÚMERO ENCONTRADO NO WHATSAPP!");
      console.log(`📱 JID: ${result.jid}`);
      console.log(`👤 Nome: ${result.name || "Não disponível"}`);
      
      try {
        const profile = await socket.profilePictureUrl(result.jid, "image");
        console.log(`🖼️ Foto de perfil: Disponível`);
      } catch (e) {
        console.log(`🖼️ Foto de perfil: Não disponível ou privada`);
      }
      
      return true;
    } else {
      console.log("❌ NÚMERO NÃO ENCONTRADO NO WHATSAPP");
      console.log("💡 Possíveis motivos:");
      console.log("   - Número não tem WhatsApp");
      console.log("   - Número está incorreto");
      console.log("   - Número foi desativado");
      return false;
    }
  } catch (error) {
    console.error("❌ Erro:", error.message);
    return false;
  }
};

const phoneNumber = process.argv[2] || "5511955556138";
console.log("🔍 VERIFICADOR DE NÚMERO WHATSAPP\n");
checkNumber(phoneNumber).then(() => {
  setTimeout(() => process.exit(0), 2000);
});


