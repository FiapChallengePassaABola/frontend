// proxy.js (use google/flan-t5-small — instruction tuned)
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

// NOTE: kept inline token as in your file
const TOKEN = "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";
const MODEL = "sshleifer/distilbart-cnn-12-6";

const PORT = 3001;

if (TOKEN) {
  console.log(`[proxy] Using TOKEN: ${String(TOKEN).slice(0, 6)}... (hidden)`);
} else {
  console.error(
    "[proxy] ERROR: TOKEN not found in .env! Define TOKEN=your_token"
  );
}

const app = express();
app.use(express.json({ limit: "1mb" }));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.post("/api/ai-summary", async (req, res) => {
  console.log("[proxy] Received summary request");

  const payload = req.body;
  const data = payload?.data;
  if (!data || !Array.isArray(data)) {
    console.error("[proxy] Invalid data — expected { data: [...] } in body");
    return res
      .status(400)
      .json({ error: "Send { data: [...] } in body (array of periods)" });
  }

  // build aggregated context
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

  // concise context sentences
  const contextSentences = [
    `Total Periodos: ${data.length}.`,
    `Total Contas Ativas (sum): ${totalUsers}.`,
    `Total partidas (sum): ${totalMatches}.`,
    `Total contas Criadas (sum): ${totalSignUps}.`,
    `Top periods with largest sign-up variation: ${
      bySignUpDiff
        .map((p) => `${p.period} (${p.diff >= 0 ? "+" : ""}${p.diff})`)
        .join(", ") || "none"
    }.`,
  ];

  // make each period a single sentence (avoid lists / instructions)
  const perPeriodSentences = data.slice(0, 10).map((d) => {
    const parts = [];
    if (d.period) parts.push(`${d.period}:`);
    parts.push(`${d.users ?? 0} users`);
    parts.push(`${d.matches ?? 0} matches`);
    parts.push(`${d.signUps ?? 0} sign-ups`);
    if (d.signUpDifference != null) parts.push(`change ${d.signUpDifference}`);
    if (d.goal) parts.push(`goal ${d.goal}`);
    if (d.completed) parts.push(`completed ${d.completed}`);
    if (d.onHold) parts.push(`on-hold ${d.onHold}`);
    return parts.join(", ") + ".";
  });

  // build article as paragraphs (no long instruction inside the article)
  const article = [
    "Executive summary of the following sports data:",
    "",
    contextSentences.join(" "),
    "",
    "Details by period:",
    perPeriodSentences.join(" "),
  ].join("\n");

  // instruction prefix short and explicit (flan models follow instructions)
  // send only the article (no instruction) — distilbart-type models expect an article
  const prompt =
    article +
    "\n\nSummarize the above article in 3 short paragraphs (English) Give a little curiosity about food at the end";

  // helper: call HF router; include light retry/backoff for transient 502/503
  const callRouter = async (inputPrompt) => {
    const url = `https://router.huggingface.co/hf-inference/models/${MODEL}`;
    console.log("[proxy] Calling HF URL ->", url);

    const maxAttempts = 3;
    let maxNewTokens = 180;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(
          `[proxy] HF request attempt ${attempt}, max_new_tokens=${maxNewTokens}`
        );
        const r = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: inputPrompt,
            parameters: {
              max_new_tokens: maxNewTokens,
              temperature: 0.2,
            },
          }),
        });

        // transient server errors -> retry
        if ([502, 503, 504].includes(r.status)) {
          const txt = await r.text().catch(() => "<no-body>");
          console.warn(
            `[proxy] HF transient ${r.status}: ${String(txt).slice(0, 200)}...`
          );
          if (attempt < maxAttempts) {
            const wait = 500 * attempt;
            await new Promise((r) => setTimeout(r, wait));
            maxNewTokens = Math.max(60, Math.floor(maxNewTokens * 0.6));
            continue;
          } else {
            return r;
          }
        }

        return r;
      } catch (err) {
        console.error(`[proxy] network error attempt ${attempt}:`, err.message);
        if (attempt < maxAttempts) {
          await new Promise((r) => setTimeout(r, 400 * attempt));
          maxNewTokens = Math.max(60, Math.floor(maxNewTokens * 0.6));
          continue;
        }
        throw err;
      }
    }
  };

  // main try / retries (keeps your original outer retry behaviour)
  try {
    console.log("[proxy] Calling HF (attempt 1)...");
    const r = await callRouter(prompt);

    if (!r.ok) {
      const txt = await r.text();
      console.error(`[proxy] HF returned status ${r.status}: ${txt}`);
      throw new Error(`HF status ${r.status}: ${txt}`);
    }

    const apiResponse = await r.json();
    console.log("[proxy] API response:", apiResponse);

    // extract generated text
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
      console.warn("[proxy] No text returned — using fallback");
      throw new Error("No text returned from model");
    }

    console.log("[proxy] Summary generated successfully");
    return res.json({ summary: outputText, source: "llm" });
  } catch (err) {
    console.error("[proxy] Error in first attempt:", err);

    for (let i = 0; i < 2; i++) {
      try {
        console.log(`[proxy] Retry ${i + 2} of 3...`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const r = await callRouter(prompt);

        if (r.ok) {
          const response = await r.json();
          const text = Array.isArray(response)
            ? response[0]?.generated_text || response[0]?.summary_text
            : response.generated_text || response.summary_text;
          if (text) {
            console.log("[proxy] Retry succeeded");
            return res.json({ summary: text, source: `llm_retry_${i + 2}` });
          }
        } else {
          const txt = await r.text();
          console.error(
            `[proxy] Retry ${i + 2} failed with status ${r.status}: ${txt}`
          );
        }
      } catch (retryErr) {
        console.error(`[proxy] Retry ${i + 2} failed:`, retryErr);
      }
    }

    console.log("[proxy] All attempts failed — using local fallback");
    const fallbackSummary = generateLocalFallbackSummary(data);
    return res.json({ summary: fallbackSummary, source: "fallback" });
  }
});

function generateLocalFallbackSummary(data) {
  if (!data || data.length === 0) {
    return "No data available to generate a summary.";
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
      ? `Sign-ups increased by ${signUpTrend} since the first period.`
      : signUpTrend < 0
      ? `Sign-ups decreased by ${Math.abs(signUpTrend)} since the first period.`
      : `Sign-ups remained stable compared to the first period.`;

  return `Resumo rápido: ${data.length} períodos analisados — total de ${totalUsers} usuários ativos, ${totalMatches} partidas e ${totalSignUps} novos cadastros. ${trendText}`;
}

app.listen(PORT, () =>
  console.log(`[proxy] Running at http://localhost:${PORT}`)
);
