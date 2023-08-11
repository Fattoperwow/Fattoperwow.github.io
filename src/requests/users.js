import { ref, set, get, child } from "firebase/database";
import { database as db } from "../firebase";
import uuid from "react-uuid";
import { toArray } from "../utils/objects";

import {
  hairs,
  accessories,
  hairColors,
  facialHair,
  facialHairColor,
  clothes,
  clothesColor,
  eyes,
  eyebrow,
  mouth,
  skinColor,
} from "../settings/avatars/settings";


export const getUsers = () => {
  const dbRef = ref(db);
  return get(child(dbRef, "users"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Find user by username and password
        const users = toArray(snapshot.val());
        return { status: 200, data: users, rawdData: snapshot.val() };
      } else {
        return { status: 400, errorMessage: "Nessun utente registrato." };
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

export const createUser = (username, password, teamName, isRegistered = true) => {
  const userId = uuid();
  const userData = {
    username: username,
    password: password,
    team_name: teamName,
    id: userId,
    league_id: 1,
    is_registered: isRegistered,
    role: "user",
    avatar: {
      hair: hairs[Math.floor(Math.random() * hairs.length)],
      accessory: accessories[Math.floor(Math.random() * accessories.length)],
      hair_color: hairColors[Math.floor(Math.random() * hairColors.length)],
      facial_hair: facialHair[Math.floor(Math.random() * facialHair.length)],
      facial_hair_color:
        facialHairColor[Math.floor(Math.random() * facialHairColor.length)],
      clothes: clothes[Math.floor(Math.random() * clothes.length)],
      clothes_color:
        clothesColor[Math.floor(Math.random() * clothesColor.length)],
      eyes: eyes[Math.floor(Math.random() * eyes.length)],
      eyebrow: eyebrow[Math.floor(Math.random() * eyebrow.length)],
      mouth: mouth[Math.floor(Math.random() * mouth.length)],
      skin_color: skinColor[Math.floor(Math.random() * skinColor.length)],
    },
  }
  return set(ref(db, "users/" + userId), userData)
    .then(() => {
      return { status: 200, data: userData };
    })
    .catch((error) => {
      return { status: 400, error: error };
    });
};

export const login = (username, password) => {
  const dbRef = ref(db);
  return get(child(dbRef, "users"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Find user by username and password
        const users = toArray(snapshot.val());
        const loggedUser = users.find(
          (user) => user.username === username && user.password === password
        );
        if (loggedUser) {
          return { status: 200, data: loggedUser };
        } else {
          return { status: 400, errorMessage: "Credenziali errate." };
        }
      } else {
        return { status: 400, errorMessage: "Nessun utente registrato." };
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

export const loginWithCode = (code) => {
  const dbRef = ref(db);
  return get(child(dbRef, "users"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Find user by code
        const users = toArray(snapshot.val());
        const loggedUser = users.find((user) => user.id === code);
        if (loggedUser) {
          return { status: 200, data: loggedUser };
        } else {
          return { status: 400, errorMessage: "Codice errato." };
        }
      } else {
        return { status: 400, errorMessage: "Nessun utente registrato." };
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

export const updateUser = (newData, userId) => {
  return set(ref(db, "users/" + userId), newData)
    .then((t) => {
      return { status: 200 };
    })
    .catch((error) => {
      return { status: 400, error: error };
    });
};

export const updateUsers = (newData) => {
  return set(ref(db, "users"), newData)
    .then((t) => {
      return { status: 200 };
    })
    .catch((error) => {
      return { status: 400, error: error };
    });
};
