// proxy.js (corrigido)
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const HF_TOKEN = process.env.HF_TOKEN;
const MODEL = "bigscience/bloom"; // cuidado: alguns modelos são pesados / não suportados pela inference router
const PORT = process.env.PROXY_PORT || 3001;

if (HF_TOKEN) {
  console.log(`[proxy] Using HF_TOKEN: ${HF_TOKEN.slice(0, 6)}...`);
} else {
  console.error("[proxy] ERRO: HF_TOKEN não encontrado em .env!");
}

const app = express();
app.use(express.json({ limit: "1mb" }));

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.post("/api/ai-summary", async (req, res) => {
  console.log("[proxy] Recebendo requisição de resumo");

  // validação rápida
  const payload = req.body;
  const data = payload?.data;
  if (!data || !Array.isArray(data)) {
    console.error("[proxy] Dados inválidos — espere { data: [...] } no body");
    return res
      .status(400)
      .json({ error: "Envie { data: [...] } no body (array de períodos)" });
  }

  // ===== constrói promptInstruction fora do try para que as retries possam acessá-lo =====
  // monta contexto e linhas por período (limitado a 10)
  const totalUsers = data.reduce((sum, d) => sum + (Number(d.users) || 0), 0);
  const totalMatches = data.reduce(
    (sum, d) => sum + (Number(d.matches) || 0),
    0
  );
  const totalSignUps = data.reduce(
    (sum, d) => sum + (Number(d.signUps) || 0),
    0
  );

  const bySignUpDiff = data
    .map((d) => ({ period: d.period, diff: Number(d.signUpDifference) || 0 }))
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))
    .slice(0, 3);

  const contextLines = [
    `Total de períodos: ${data.length}`,
    `Total usuários ativos (soma): ${totalUsers}`,
    `Total de partidas (soma): ${totalMatches}`,
    `Total de inscrições (soma): ${totalSignUps}`,
    `Top períodos com maior variação de inscrições: ${
      bySignUpDiff
        .map((p) => `${p.period} (${p.diff >= 0 ? "+" : ""}${p.diff})`)
        .join(", ") || "nenhum"
    }`,
    "",
    "Dados por período (período: usuários | partidas | inscrições | meta | completadas | em espera | totalMatches | diffInscrições):",
  ];

  const perPeriodLines = data.slice(0, 10).map((d) => {
    return `${d.period}: ${d.users} | ${d.matches} | ${d.signUps} | ${
      d.goal ?? ""
    } | ${d.completed ?? ""} | ${d.onHold ?? ""} | ${d.totalMatches ?? ""} | ${
      d.signUpDifference ?? ""
    }`;
  });

  const promptInstruction = [
    "Resumo executivo dos dados esportivos a seguir:",
    "",
    "Métricas principais:",
    ...contextLines,
    "",
    "Detalhamento por período:",
    ...perPeriodLines,
    "",
    "Instruções: Faça uma análise em português em 3 parágrafos curtos:",
    "1) Avalie as tendências de usuários e partidas",
    "2) Aponte os períodos com mudanças importantes",
    "3) Recomende ações baseadas nas metas vs resultados",
    "",
    "Análise:",
  ].join("\n");

  // helper que faz a chamada HF usando o promptInstruction
  const makeRequest = async (prompt) => {
    return fetch(`https://router.huggingface.co/hf-inference/models/${MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 180,
          temperature: 0.2,
        },
      }),
    });
  };

  // ===== tentativa principal + retries =====
  try {
    console.log("[proxy] Chamando HF (tentativa 1)...");
    const r = await makeRequest(promptInstruction);

    if (!r.ok) {
      const txt = await r.text();
      console.error(`[proxy] HF returned status ${r.status}: ${txt}`);
      // lançamos pra cair no catch e executar retries
      throw new Error(`HF status ${r.status}: ${txt}`);
    }

    const apiResponse = await r.json();
    console.log("[proxy] Resposta da API:", apiResponse);

    let outputText = "";
    if (Array.isArray(apiResponse)) {
      outputText =
        apiResponse[0]?.generated_text || apiResponse[0]?.summary_text || "";
    } else if (typeof apiResponse === "object") {
      outputText = apiResponse.generated_text || apiResponse.summary_text || "";
    } else if (typeof apiResponse === "string") {
      outputText = apiResponse;
    }

    if (!outputText) {
      console.warn(
        "[proxy] Resposta sem texto gerado — fallback local será usado"
      );
      throw new Error("IA não retornou texto");
    }

    console.log("[proxy] Resumo gerado com sucesso");
    return res.json({ summary: outputText, source: "llm" });
  } catch (err) {
    console.error("[proxy] Erro na primeira tentativa:", err);

    // retries simples (2 tentativas extras)
    for (let i = 0; i < 2; i++) {
      try {
        console.log(`[proxy] Retry ${i + 2} de 3...`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const r = await makeRequest(promptInstruction);

        if (r.ok) {
          const response = await r.json();
          const text = Array.isArray(response)
            ? response[0]?.generated_text || response[0]?.summary_text
            : response.generated_text || response.summary_text;
          if (text) {
            console.log("[proxy] Retry teve sucesso");
            return res.json({ summary: text, source: `llm_retry_${i + 2}` });
          }
        } else {
          const txt = await r.text();
          console.error(
            `[proxy] Retry ${i + 2} falhou com status ${r.status}: ${txt}`
          );
        }
      } catch (retryErr) {
        console.error(`[proxy] Falha na retry ${i + 2}:`, retryErr);
      }
    }

    // todas as tentativas falharam -> fallback local
    console.log("[proxy] Todas as tentativas falharam — usando fallback local");
    const fallbackSummary = generateLocalFallbackSummary(data);
    return res.json({ summary: fallbackSummary, source: "fallback" });
  }
});

// Função de fallback local (mesma lógica que você já tinha)
function generateLocalFallbackSummary(data) {
  if (!data || data.length === 0) {
    return "Nenhum dado disponível para gerar resumo.";
  }

  const totalUsers = data.reduce((sum, d) => sum + (Number(d.users) || 0), 0);
  const totalMatches = data.reduce(
    (sum, d) => sum + (Number(d.matches) || 0),
    0
  );
  const totalSignUps = data.reduce(
    (sum, d) => sum + (Number(d.signUps) || 0),
    0
  );

  const first = data[0];
  const last = data[data.length - 1];
  const signUpTrend =
    typeof first.signUps !== "undefined" && typeof last.signUps !== "undefined"
      ? last.signUps - first.signUps
      : null;

  const trendText =
    signUpTrend === null
      ? ""
      : signUpTrend > 0
      ? `As inscrições cresceram ${signUpTrend} desde o primeiro período.`
      : signUpTrend < 0
      ? `As inscrições caíram ${Math.abs(
          signUpTrend
        )} desde o primeiro período.`
      : `As inscrições se mantiveram estáveis em comparação ao primeiro período.`;

  return `Resumo rápido (gerado localmente): ${data.length} períodos analisados — total de ${totalUsers} usuários ativos, ${totalMatches} partidas e ${totalSignUps} inscrições no período. ${trendText}`;
}

app.listen(PORT, () =>
  console.log(`[proxy] Rodando em http://localhost:${PORT}`)
);
