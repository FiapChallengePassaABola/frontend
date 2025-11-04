import { getDatabase, ref, onValue, update } from "firebase/database";

const db = getDatabase();

export const Reject = async (clubesId) => {
  try {
    const path = `clubes/${clubesId}`;
    const playerRef = ref(db, path);
    console.log(
      "[Reject] Atualizando status para 'rejeitada' no caminho:",
      path
    );
    await update(playerRef, { status: "rejeitada" });
    console.log("Clube rejeitado com sucesso!");
  } catch (error) {
    console.error("Erro ao rejeitar jogadora:", error);
  }
};

export const Approved = async (clubesId) => {
  try {
    const path = `clubes/${clubesId}`;
    const playerRef = ref(db, path);
    console.log(
      "[Approved] Atualizando status para 'aprovada' no caminho:",
      path
    );
    await update(playerRef, { status: "aprovada" });
    console.log("Clube aprovado com sucesso!");
  } catch (error) {
    console.error("Erro ao aprovar jogadora:", error);
  }
};
