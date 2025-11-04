import { getDatabase, ref, onValue, update } from "firebase/database";

const db = getDatabase();

export const Reject = async (jogadoraId) => {
  try {
    const path = `jogadoras/${jogadoraId}`;
    const playerRef = ref(db, path);
    console.log(
      "[Reject] Atualizando status para 'rejeitada' no caminho:",
      path
    );
    await update(playerRef, { status: "rejeitada" });
    console.log("Jogadora rejeitada com sucesso!");
  } catch (error) {
    console.error("Erro ao rejeitar jogadora:", error);
  }
};

export const Approved = async (jogadoraId) => {
  try {
    const path = `jogadoras/${jogadoraId}`;
    const playerRef = ref(db, path);
    console.log(
      "[Approved] Atualizando status para 'aprovada' no caminho:",
      path
    );
    await update(playerRef, { status: "aprovada" });
    console.log("Jogadora aprovada com sucesso!");
  } catch (error) {
    console.error("Erro ao aprovar jogadora:", error);
  }
};
