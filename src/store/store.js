import { create } from "zustand";
import { players } from "../mocks/players";
import { mockUsers } from "../mocks/users";
import { settings } from "../mocks/settings";
import { toArray } from "../utils/objects";

export const useStore = create((set) => ({
  // USERS
  user: {},
  users: {},
  setUser: (newData) =>
    set((state) => ({ user: { ...state.user, ...newData } })),
  setUsers: (newData) => set((state) => ({ users: [ ...newData ] })),

  // SETTINGS
  settings: {},
  setSettings: (newData) =>
    set((state) => ({
      settings: { ...state.settings, ...newData },
    })),

  // PLAYERS
  players: [],
  updatePlayer: (newData, playerId) =>
    set((state) => ({
      players: state.players.map((player) => {
        return player.id.toString() === playerId.toString()
          ? { ...newData }
          : { ...player };
      }),
    })),
  setPlayers: (newData) =>
    set((state) => ({
      players: [ ...newData ],
    })),

  // MAGHEGGI
  magheggi: JSON.parse(localStorage.getItem("magheggi"))
    ? JSON.parse(localStorage.getItem("magheggi"))
    : {
        tags: [],
        targets: [],
      },
  updateMagheggi: (newData) =>
    set((state) => ({
      magheggi: { ...newData },
    })),
  updateTags: (newData) =>
    set((state) => ({
      magheggi: { ...state.magheggi, tags: [...newData] },
    })),
  updateTargets: (newData) =>
    set((state) => ({
      magheggi: { ...state.magheggi, targets: [...newData] },
    })),

  // Loading
  isLoading: false,
  dataProviderLoaded: false,
  setIsLoading: (isLoading) =>
    set((state) => ({
      isLoading: isLoading,
    })),
  setIsDataProviderLoaded: (bool) =>
    set((state) => ({
      dataProviderLoaded: bool,
    })),
}));
