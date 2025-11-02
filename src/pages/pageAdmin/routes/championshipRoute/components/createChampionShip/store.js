import {
  getDatabase,
  ref,
  onValue,
  update,
  get,
  child,
  set,
} from "firebase/database";

import { realtimeDb } from "../../../../../../config/firebase";

const db = getDatabase();

export const getTeams = async () => {
  try {
    const dbRef = ref(realtimeDb);
    const snapshot = await get(child(dbRef, "clubes"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const AddIt = async (clubeId, csId) => {
  try {
    const path = `clube/${clubeId}`;
    const clubeRef = ref(db, path);
    console.log(
      "[Approved] Atualizando status para 'aprovada' no caminho:",
      path
    );
    await update(clubeRef, { status: "oncs", csId: { csId } });
    console.log("Clube em campeonato!");
  } catch (error) {
    console.error("Erro ao aprovar clube:", error);
  }
};

export function criarCampeonato(novoCampeonato) {
  // novoCampeonato é um objeto com dados do campeonato
  const campeonatoRef = ref(realtimeDb, "campeonatos/" + novoCampeonato.id);

  set(campeonatoRef, novoCampeonato)
    .then(() => {
      console.log("Campeonato criado com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao criar campeonato:", error);
    });
}
