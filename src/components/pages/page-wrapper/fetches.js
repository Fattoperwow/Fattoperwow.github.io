import { players as mockPlayers } from "../../../mocks/players";
import { settings as mockSettings } from "../../../mocks/settings";
import { mockUsers } from "../../../mocks/users";
import { getPlayers } from "../../../requests/players";
import { getSettings } from "../../../requests/settings";
import { getUsers } from "../../../requests/users";
import { toArray } from "../../../utils/objects";

export const fetchVitals = async (store) => {
  store.setIsLoading(true);

  const useMockData = process.env.REACT_APP_MOCK_DATA === "true";

  // Fetch users
  const users = useMockData ? mockUsers : await getUsers();
  console.log("Fetch")

  // Fetch Settings
  const settings = useMockData ? mockSettings : await getSettings();

  // Fetch Players
  const players = useMockData ? mockPlayers : await getPlayers();

  if (users.error || settings.error || players.errors) {
    store.setIsLoading(false);
    return { error: true };
  }

  store.setSettings(settings.data ? settings.data : settings);
  store.setUsers(users.data ? users.data : toArray(users));
  store.setPlayers(players.data ? players.data : players);

  store.setIsLoading(false);

  return { success: true };
};
