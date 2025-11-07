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
    } catch (err) {
      console.warn("Erro ao gerar resumo via IA:", err);
      finalSummary = generateLocalFallbackSummary(combined);
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

  // 4️⃣ Cabeçalho
  const headerValues = worksheet.columns.map((c) => c.header || "");
  worksheet.addRow(headerValues);

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

  // 5️⃣ Dados
  combined.forEach((row) => worksheet.addRow(row));

  // 6️⃣ Resumo IA
  if (finalSummary) {
    const summaryRowIndex = worksheet.rowCount + 1;
    const nCols = Math.max(worksheet.columns.length, 1);
    const rowPlaceholders = new Array(nCols).fill("");
    rowPlaceholders[0] = "Resumo IA:";
    rowPlaceholders[1] = finalSummary;
    worksheet.addRow(rowPlaceholders);

    if (nCols === 1) {
      const cell = worksheet.getCell(summaryRowIndex, 1);
      cell.value = `Resumo IA: ${finalSummary}`;
      cell.alignment = { wrapText: true, vertical: "top", horizontal: "left" };
      cell.font = { italic: true };
    } else {
      const startCol = 2;
      const endCol = nCols;
      worksheet.mergeCells(summaryRowIndex, startCol, summaryRowIndex, endCol);

      const labelCell = worksheet.getCell(summaryRowIndex, 1);
      labelCell.font = { bold: true };
      labelCell.alignment = { vertical: "top", horizontal: "left" };
      labelCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFEFEFEF" },
      };

      const mergedCell = worksheet.getCell(summaryRowIndex, startCol);
      mergedCell.value = finalSummary;
      mergedCell.alignment = {
        wrapText: true,
        vertical: "top",
        horizontal: "left",
      };
      mergedCell.font = { italic: true };
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

  // 7️⃣ Salvar
  const buf = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buf]), filename);
};

/**
 * Gera o prompt e chama a API
 */
const generateAiSummaryText = async (data) => {
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
  ];

  try {
    const res = await fetch("http://localhost:3001/api/ai-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Proxy API error ${res.status}: ${txt}`);
    }

    const response = await res.json();
    console.log("Resposta do proxy:", response);

    let outputText = String(response.summary || "").trim();

    // 🔹 Remove "(local fallback)" ou qualquer variação
    outputText = outputText
      .replace(/\(?\s*local\s*fallback\s*\)?/gi, "")
      .trim();
    outputText = outputText
      .replace(/\s{2,}/g, " ")
      .replace(/:\s*$/, ":")
      .trim();

    if (!outputText) {
      outputText = generateLocalFallbackSummary(data);
    }

    useAiASummary.setState({ aiSummary: outputText });
    return outputText;
  } catch (err) {
    console.warn("generateAiSummaryText error:", err);
    const fallbackText = generateLocalFallbackSummary(data);
    useAiASummary.setState({ aiSummary: fallbackText });
    return fallbackText;
  }
};

/**
 * Fallback local (sem nunca mostrar "(local fallback)")
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
    .join(" ")
    .replace(/\(?\s*local\s*fallback\s*\)?/gi, "") // 🚫 remove qualquer “local fallback”
    .trim();

  return summary;
};

export { exportToExcel, generateAiSummaryText, generateLocalFallbackSummary };
