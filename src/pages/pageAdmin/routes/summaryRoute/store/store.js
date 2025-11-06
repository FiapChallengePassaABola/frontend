import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import { signUpsMocked, matchesMocked, activeUsers } from "./dashboardData";

const exportToExcel = async () => {
  // 1️⃣ Consolidar dados por período
  const combined = [];

  // Pega todos os períodos únicos
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

  // 2️⃣ Criar o workbook e worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Relatório");

  // 3️⃣ Definir colunas
  worksheet.columns = [
    { header: "Periodo", key: "period", width: 15 },
    { header: "Usuarios Ativos", key: "users", width: 20 },
    { header: "Partidas", key: "matches", width: 15 },
    { header: "Inscrições", key: "signUps", width: 15 },
    { header: "Meta de Inscrições", key: "goal", width: 20 },
    { header: "Partidas Completadas", key: "completed", width: 25 },
    { header: "Partidas em Espera", key: "onHold", width: 20 },
    { header: "Partidas Totais", key: "totalMatches", width: 20 },
    { header: "Diferença de Inscrições", key: "signUpDifference", width: 25 },
  ];

  // 4️⃣ Adicionar as linhas
  combined.forEach((row) => worksheet.addRow(row));

  // 5️⃣ Estilizar cabeçalho
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1E8C6B" },
    };
  });

  // 6️⃣ Baixar arquivo
  const buf = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buf]), "relatorio.xlsx");
};
export { exportToExcel };
