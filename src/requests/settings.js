import { ref, get, child, set } from "firebase/database";
import { database as db } from "../firebase";

export const getSettings = () => {
  const dbRef = ref(db);
  return get(child(dbRef, "settings"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return { status: 200, data: snapshot.val() };
      } else {
        return { status: 400, errorMessage: "Nessuna impostazione trovata." };
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

export const updateSettings = (newData) => {
  return set(ref(db, "settings"), newData)
    .then((t) => {
      return { status: 200 };
    })
    .catch((error) => {
      return { status: 400, error: error };
    });
};
