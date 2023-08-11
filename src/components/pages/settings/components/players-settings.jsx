import { css } from "../../../../styles/system";
import { useState } from "react";
import * as XLSX from "xlsx";

import { Text } from "../../../primitives/text/text";
import { Loader } from "../../../primitives/loader/loader";
import { ErrorMessage } from "../../../primitives/text/error";
import { useStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";
import axios from "axios";
import { toast } from "react-toastify";
import { updatePlayers } from "../../../../requests/players";
import { toArray } from "../../../../utils/objects";
import { Button } from "../../../primitives/button/button";
import { Flex } from "../../../primitives/flex/flex";
import { CiCircleRemove } from "react-icons/ci";
import { updateSettings } from "../../../../requests/settings";

export const PlayersSettings = ({ user }) => {
  // Data states
  const [isLoading, setIsLoading] = useState(false);

  // getStore
  const { settings, setSettings, players, setPlayers } = useStore(
    (state) => ({
      players: state.players,
      settings: state.settings,
      setSettings: state.setSettings,
      setPlayers: state.setPlayers,
    }),
    shallow
  );

  // General states
  const [error, setError] = useState("");

  // on import
  const onImport = async (e) => {
    setIsLoading(true);
    console.log("hey");
    const [file] = e.target.files;
    const reader = new FileReader();

    try {
      reader.onload = async (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const rawData = XLSX.utils
          .sheet_to_csv(ws, { header: 1 })
          .split("\n")
          .filter((el, index) => index > 1);

        let mappedData = {};

        await rawData.map(async (el, index) => {
          const playerRow = el.split(",");
          const execelData = {
            id: playerRow[0],
            role_classic: playerRow[1],
            role_mantra: playerRow[2],
            slug: playerRow[3].toLowerCase().split(".").join(""),
            team: playerRow[4],
            quot_c: parseInt(playerRow[5]),
            quot_m: parseInt(playerRow[8]),
          };
          const currentplayer = await axios
            .get("/api/scrape", {
              params: {
                slug: execelData.slug,
                id: execelData.id,
                season: "",
                team: execelData.team.toLowerCase(),
                fetchOldSeason: true,
                role: execelData.role_classic.toUpperCase(),
              },
            })
            .then(async (response) => {
              // add to mapped data
              mappedData[execelData.id] = {
                id: execelData.id,
                role_classic: execelData.role_classic,
                role_mantra: execelData.role_mantra,
                slug: playerRow[3],
                team: execelData.team,
                quot_c: parseInt(execelData.quot_c),
                quot_m: parseInt(execelData.quot_m),
                owned: "",
                owned_amount: 0,
                is_active: true,
                draw_count: 0,
                ...response.data,
              };
              if (index === rawData.length - 1) {
                // Set data in firebase and store
                const response = await updatePlayers(mappedData);
                if (response.data) {
                  setPlayers(toArray(mappedData));
                  toast.success("Calciatori importati correttamente");
                  setIsLoading(false);
                }
              }
            })
            .catch((error) => {
              console.error("Error fetching scraped data:", error);
            });

          return currentplayer;
        });
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  // on reset players
  const onResetPlayers = async () => {
    if (
      window.confirm("Sei sicuro di voler ripristinare lo stato dell'asta?")
    ) {
      // Make player array
      setIsLoading(true);
      const newPlayers = players.map((player) => {
        return {
          ...player,
          owned: "",
          owned_amount: 0,
          draw_count: 0,
        };
      });
      const newPlayerObject = newPlayers.reduce(
        (a, v) => ({ ...a, [v.id]: v }),
        {}
      );
      const newSettings = {
        ...settings,
        draw_occurrencies: 1,
        draw_round: 0,
      };
      // Set data in firebase
      const response = await updatePlayers(newPlayerObject);
      if (response.data) {
        // Update settings
        const responseS = await updateSettings(newSettings);
        if (responseS.status === 200) {
          // Update store
          setPlayers(newPlayers);
          setSettings(newSettings);
          toast.success("Asta resettata correttamente");
          setIsLoading(false);
        } else {
          toast.error("Qualcosa e' andato storto");
          setIsLoading(false);
        }
      } else {
        toast.error("Qualcosa e' andato storto");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={wrapper()}>
      {isLoading && <Loader />}
      <div>
        <Text size="xlarge" css={{ marginBottom: "8px" }}>
          Carica calciatori
        </Text>
        <Text css={{ marginBottom: "20px" }}>
          Usa il file XLSX di fantaclaico.it. Meglio usare una VPN per fruire al
          meglio di questa funzionalita'.
        </Text>
        <input
          type="file"
          onChange={onImport}
          accept={".xlsx"}
        />
      </div>
      <div style={{ marginTop: "40px" }}>
        <Text size="xlarge" css={{ marginBottom: "8px" }}>
          Resetta calciatori ed estrazioni
        </Text>
        <Text css={{ marginBottom: "20px" }}>
          Questa funzione ripristina lo stato dell'asta da zero, resettando i
          calciatori assegnati e le estrazioni.
        </Text>
        <Button
          color="red"
          css={{ marginBottom: "30px", height: "40px" }}
          onClick={() => onResetPlayers()}
        >
          <Flex css={{ marginRight: "8px" }}>
            <CiCircleRemove size={20} color="white" />
          </Flex>
          Rirpistina
        </Button>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

const wrapper = css({
  marginTop: "20px",
});
