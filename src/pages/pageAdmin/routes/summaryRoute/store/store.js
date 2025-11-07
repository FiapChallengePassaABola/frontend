import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import { signUpsMocked, matchesMocked, activeUsers } from "./dashboardData";
import useAiASummary from "./state";

/**
 * exportToExcel + generateAiSummaryText (tudo no mesmo arquivo)
 *
 * AVISO: Esta versão usa a Hugging Face Inference API direto do cliente (MVP).
 * NÃO coloque este token em produção: qualquer pessoa que abrir o app pode ver e usar o token.
 */

const exportToExcel = async (filename = "relatorio.xlsx") => {
  // 1️⃣ Consolidar dados por período
  const combined = [];
  const { aiSummary } = useAiASummary.getState();

  const periods = [
    ...new Set([
      ...activeUsers.map((d) => d.period),
      ...matchesMocked.map((d) => d.period),
      ...signUpsMocked.map((d) => d.period),
    ]),
  ];

  periods.forEach((period) => {
    const users = activeUsers.find((d) => d.period === period)?.users || 0;
    const matches =
      matchesMocked.find((d) => d.period === period)?.matches || 0;
    const completed =
      matchesMocked.find((d) => d.period === period)?.completed || 0;
    const onHold = matchesMocked.find((d) => d.period === period)?.onHold || 0;
    const totalMatches = completed + onHold;
    const signUps =
      signUpsMocked.find((d) => d.period === period)?.signUps || 0;
    const goal = signUpsMocked.find((d) => d.period === period)?.goal || 0;
    const signUpDifference = signUps - goal;

    combined.push({
      period,
      users,
      matches,
      signUps,
      goal,
      completed,
      onHold,
      totalMatches,
      signUpDifference,
    });
  });

  // Se não houver resumo salvo, gere agora (gera e salva no Zustand)
  let finalSummary = aiSummary;
  if (!finalSummary) {
    try {
      finalSummary = await generateAiSummaryText(combined);
      // generateAiSummaryText já atualiza o Zustand; mas mantemos finalSummary localmente
    } catch (err) {
      console.warn("Erro ao gerar resumo via IA:", err);
      // fallback local simples
      finalSummary = generateLocalFallbackSummary(combined);
      // salvar fallback também na store
      useAiASummary.setState({ aiSummary: finalSummary });
    }
  }

  // 2️⃣ Workbook & worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Relatório");

  // 3️⃣ Colunas base
  const baseColumns = [
    { header: "Período", key: "period", width: 15 },
    { header: "Usuários Ativos", key: "users", width: 20 },
    { header: "Partidas", key: "matches", width: 15 },
    { header: "Inscrições", key: "signUps", width: 15 },
    { header: "Meta de Inscrições", key: "goal", width: 20 },
    { header: "Partidas Completadas", key: "completed", width: 25 },
    { header: "Partidas em Espera", key: "onHold", width: 20 },
    { header: "Partidas Totais", key: "totalMatches", width: 20 },
    { header: "Diferença de Inscrições", key: "signUpDifference", width: 25 },
  ];

  worksheet.columns = baseColumns;

  // 4️⃣ Adicionar linha de cabeçalho explicitamente (com os textos dos headers)
  const headerValues = worksheet.columns.map((c) => c.header || "");
  worksheet.addRow(headerValues);

  // estilo do cabeçalho (linha 1)
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1E8C6B" },
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
  });

  // 5️⃣ Adicionar as linhas de dados
  combined.forEach((row) => worksheet.addRow(row));

  // 6️⃣ Inserir resumo da IA na ÚLTIMA linha possível (após os dados)
  if (finalSummary) {
    // posição da nova linha de resumo: uma linha após a última já existente
    const summaryRowIndex = worksheet.rowCount + 1;

    // adiciona a linha com o label na primeira célula e o texto na segunda (temporário)
    const nCols = Math.max(worksheet.columns.length, 1);
    const rowPlaceholders = new Array(nCols).fill("");
    rowPlaceholders[0] = "Resumo IA:"; // primeira coluna
    rowPlaceholders[1] = finalSummary; // a célula que será a top-left da área mesclada
    worksheet.addRow(rowPlaceholders);

    // Se só existe 1 coluna, não faz merge — escreve o resumo na coluna 1 ao lado do label (concatena)
    if (nCols === 1) {
      const cell = worksheet.getCell(summaryRowIndex, 1);
      cell.value = `Resumo IA: ${finalSummary}`;
      cell.alignment = { wrapText: true, vertical: "top", horizontal: "left" };
      cell.font = { italic: true };
    } else {
      // Mescla da coluna 2 até a última coluna na linha de resumo
      const startCol = 2;
      const endCol = nCols;
      worksheet.mergeCells(summaryRowIndex, startCol, summaryRowIndex, endCol);

      // estilo da célula label (coluna 1)
      const labelCell = worksheet.getCell(summaryRowIndex, 1);
      labelCell.font = { bold: true };
      labelCell.alignment = { vertical: "top", horizontal: "left" };
      labelCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFEFEFEF" },
      };

      // a célula mesclada (top-left é coluna 2)
      const mergedCell = worksheet.getCell(summaryRowIndex, startCol);
      mergedCell.value = finalSummary;
      mergedCell.alignment = {
        wrapText: true,
        vertical: "top",
        horizontal: "left",
      };
      mergedCell.font = { italic: true };
      // adiciona borda leve
      mergedCell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      const approxLines = Math.max(3, Math.ceil(finalSummary.length / 80));
      worksheet.getRow(summaryRowIndex).height = approxLines * 15;
    }
  }

  // 7️⃣ Finalizar: escrever e salvar
  const buf = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buf]), filename);
};

/**
 * Gera o prompt a partir dos dados agregados e chama a HF Inference API (client-side).
 * Retorna o texto do resumo (string) e atualiza a store Zustand.
 */
const generateAiSummaryText = async (data) => {
  // monta estatísticas principais
  const totalUsers = data.reduce((sum, d) => sum + (Number(d.users) || 0), 0);
  const totalMatches = data.reduce(
    (sum, d) => sum + (Number(d.matches) || 0),
    0
  );
  const totalSignUps = data.reduce(
    (sum, d) => sum + (Number(d.signUps) || 0),
    0
  );

  // detecta top 3 períodos por diferença de inscrição (maior variação)
  const bySignUpDiff = data
    .map((d) => ({ period: d.period, diff: Number(d.signUpDifference) || 0 }))
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))
    .slice(0, 3);

  // constrói um resumo curto de contexto para enviar ao modelo
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

  // incluir linhas resumidas por período (limitado a 10 para não enviar payload gigante)
  const perPeriodLines = data.slice(0, 10).map((d) => {
    return `${d.period}: ${d.users} | ${d.matches} | ${d.signUps} | ${d.goal} | ${d.completed} | ${d.onHold} | ${d.totalMatches} | ${d.signUpDifference}`;
  });

  const promptInstruction = [
    "Você é um assistente que escreve um resumo executivo curto e claro.",
    "Gere um resumo executivo em 3 frases destacando tendências, problemas e recomendações curtas.",
    "Se não houver dados suficientes, diga isso claramente em 1 frase.",
    "",
    "Contexto:",
    ...contextLines,
    ...perPeriodLines,
    "",
    "Resumo:",
  ].join("\n");

  // Chama o servidor proxy local
  try {
    const res = await fetch("http://localhost:3001/api/ai-summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Proxy API error ${res.status}: ${txt}`);
    }

    const response = await res.json();
    console.log("Resposta do proxy:", response);

    const { summary, fallback } = response;
    console.log("Resumo recebido:", summary);

    // O proxy já retorna o texto processado, não precisa mais fazer parsing
    const outputText = String(summary).trim();
    console.log("Texto final:", outputText);

    if (!outputText) {
      throw new Error("IA retornou texto vazio");
    }

    // salva no Zustand e retorna
    useAiASummary.setState({ aiSummary: outputText });
    return outputText;
  } catch (err) {
    console.warn("generateAiSummaryText error:", err);
    // fallback local
    const fallback = generateLocalFallbackSummary(data);
    useAiASummary.setState({ aiSummary: fallback });
    return fallback;
  }
};

/**
 * Fallback local: gera um sumário simples sem chamar IA.
 */
const generateLocalFallbackSummary = (data) => {
  if (!data || data.length === 0)
    return "Nenhum dado disponível para gerar resumo.";

  const totalUsers = data.reduce((sum, d) => sum + (Number(d.users) || 0), 0);
  const totalMatches = data.reduce(
    (sum, d) => sum + (Number(d.matches) || 0),
    0
  );
  const totalSignUps = data.reduce(
    (sum, d) => sum + (Number(d.signUps) || 0),
    0
  );

  // tendência de inscrições: comparar primeiro vs last
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

  const topPeriod = data.reduce((best, cur) => {
    if (!best) return cur;
    const a = Math.abs(cur.signUpDifference || 0);
    const b = Math.abs(best.signUpDifference || 0);
    return a > b ? cur : best;
  }, null);

  const topPeriodText = topPeriod
    ? `Maior variação de inscrições em ${topPeriod.period} (${topPeriod.signUpDifference}).`
    : "";

  const summary = [
    `Resumo rápido: ${data.length} períodos analisados — total de ${totalUsers} usuários ativos, ${totalMatches} partidas e ${totalSignUps} inscrições no período.`,
    trendText,
    topPeriodText || "Sem variações importantes por período identificadas.",
  ]
    .filter(Boolean)
    .join(" ");

  return summary;
};

export { exportToExcel, generateAiSummaryText, generateLocalFallbackSummary };
