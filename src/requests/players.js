import { ref, get, child, set } from "firebase/database";
import { database as db } from "../firebase";
import { toArray } from "../utils/objects";

export const getPlayers = () => {
  const dbRef = ref(db);
  return get(child(dbRef, "players"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return { status: 200, data: toArray(snapshot.val()), rawData: snapshot.val() };
      } else {
        return { status: 400, errorMessage: "Nessuna calciatore trovato" };
      }
    })
    .catch((error) => {
      return {
        status: 400,
        errorMessage: "Si è verificato un errore.",
        error: error,
      };
    });
};

export const updatePlayer = (newData, playerId) => {
  return set(ref(db, "players/" + playerId), newData)
    .then((t) => {
      return { status: 200, data: newData };
    })
    .catch((error) => {
      return { status: 400, error: error };
    });
};

export const updatePlayers = (newData) => {
  return set(ref(db, "players"), {...newData})
    .then((t) => {
      return { status: 200, data: newData };
    })
    .catch((error) => {
      return { status: 400, error: error };
    });
};
