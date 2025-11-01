import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase();

const Reject = (jogadora) => {
  const playersRef = ref(db, "jogadoras");
  onValue(playersRef, (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key;
      const jogadora = childSnapshot.val();
      if (key == "status") {
      }
    });

    console.log(data); // array com todos os registros
  });

  jogadora.status = "rejeitada";
};

const Approved = (jogadora) => {
  jogadora.status = "approved";
};
