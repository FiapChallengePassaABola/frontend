import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import { signUpsMocked, matchesMocked, activeUsers } from "./dashboardData";
import useAiASummary from "./state";

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

  // Se quiser uma coluna de resumo por período (não usado aqui), seria adicionada.
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

  // 5️⃣ Adicionar as linhas de dados (a partir da linha 2 ou 2/3 dependendo se houver resumo depois)
  combined.forEach((row) => worksheet.addRow(row));

  // 6️⃣ Inserir resumo da IA na ÚLTIMA linha possível (após os dados)
  if (aiSummary) {
    // posição da nova linha de resumo: uma linha após a última já existente
    const summaryRowIndex = worksheet.rowCount + 1;

    // adiciona a linha com o label na primeira célula e o texto na segunda (temporário)
    // Preenche com valores vazios até o número de colunas para garantir o comprimento
    const nCols = Math.max(worksheet.columns.length, 1);
    const rowPlaceholders = new Array(nCols).fill("");
    rowPlaceholders[0] = "Resumo IA:"; // primeira coluna
    rowPlaceholders[1] = aiSummary; // a célula que será a top-left da área mesclada
    worksheet.addRow(rowPlaceholders);

    // Se só existe 1 coluna, não faz merge — escreve o resumo na coluna 1 ao lado do label (concatena)
    if (nCols === 1) {
      const cell = worksheet.getCell(summaryRowIndex, 1);
      cell.value = `Resumo IA: ${aiSummary}`;
      cell.alignment = { wrapText: true, vertical: "top", horizontal: "left" };
      cell.font = { italic: true };
    } else {
      // Mescla da coluna 2 até a última coluna na linha de resumo
      const startCol = 2;
      const endCol = nCols;
      // mergeCells aceita (startRow, startCol, endRow, endCol)
      worksheet.mergeCells(summaryRowIndex, startCol, summaryRowIndex, endCol);

      // estilo da célula label (coluna 1)
      const labelCell = worksheet.getCell(summaryRowIndex, 1);
      labelCell.font = { bold: true };
      labelCell.alignment = { vertical: "top", horizontal: "left" };
      // opcional: preencher fundo para destacar
      labelCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFEFEFEF" },
      };

      // a célula mesclada (top-left é coluna 2)
      const mergedCell = worksheet.getCell(summaryRowIndex, startCol);
      mergedCell.value = aiSummary;
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

      // Ajuste: aumentar altura da linha para caber o texto (opcional)
      const approxLines = Math.max(3, Math.ceil(aiSummary.length / 80));
      worksheet.getRow(summaryRowIndex).height = approxLines * 15;
    }
  }

  // 7️⃣ Finalizar: escrever e salvar
  const buf = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buf]), filename);
};

export { exportToExcel };
