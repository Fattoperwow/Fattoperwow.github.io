import { css } from "../../../../styles/system";
import { useState } from "react";

import { Button } from "../../../primitives/button/button";
import { ImHammer2 } from "react-icons/im";
import { TbGoGame } from "react-icons/tb";
import { BsCoin } from "react-icons/bs";
import { LuGamepad } from "react-icons/lu";
import { BsFillQuestionCircleFill } from "react-icons/bs";

import { Text } from "../../../primitives/text/text";
import { Input } from "../../../primitives/input/input";
import { Flex } from "../../../primitives/flex/flex";
import { updateSettings } from "../../../../requests/settings";
import { Loader } from "../../../primitives/loader/loader";
import { ErrorMessage } from "../../../primitives/text/error";
import { useStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";
import { Select } from "../../../primitives/select/select";
import { SelectOption } from "../../../primitives/select/option";
import { Tooltip } from "../../../primitives/tooltip/tooltip";
import { toast } from "react-toastify";

export const GeneralSettings = ({ user }) => {
  // Data states
  const [isLoading, setIsLoading] = useState(false);

  // getStore
  const { settings, setSettings } = useStore(
    (state) => ({
      settings: state.settings,
      setSettings: state.setSettings,
    }),
    shallow
  );

  // set Data state
  const [budget, setBudget] = useState(settings.budget);
  const [winterBudget, setWinterudget] = useState(settings.winter_budget);
  const [minPlayers, setMinPlayers] = useState(settings.min_players);
  const [maxPlayers, setMaxPlayers] = useState(settings.max_players);
  const [gameType, setGameType] = useState(settings.game_type);
  const [extrNumber, setExtrNumber] = useState(settings.draw_occurrencies);

  // General states
  const [error, setError] = useState("");

  // on update
  const onUpdate = async () => {
    // Validate
    if (
      !budget ||
      !winterBudget ||
      !minPlayers ||
      !maxPlayers ||
      !gameType ||
      !extrNumber
    ) {
      setError("Compila tutti i campi prima di procedere");
      toast.error("Compila tutti i campi prima di procedere");
      return;
    }

    if (minPlayers === 0 || maxPlayers === 0 || minPlayers > maxPlayers) {
      setError(
        "Si e' verificato un errore riguardante il numero dei giocatori. Ricontrolla i campi"
      );
      toast.error(
        "Si e' verificato un errore riguardante il numero dei giocatori. Ricontrolla i campi"
      );
      return;
    }
    if (extrNumber < 1) {
      toast.error("Il numero minimo per il valore di estraibilita' e' 1");
      setError("Il numero minimo per il valore di estraibilita' e' 1");
      return;
    }
    setError("");
    setIsLoading(true);
    const newData = {
      ...settings,
      budget: parseInt(budget),
      winter_budget: parseInt(winterBudget),
      min_players: parseInt(minPlayers),
      max_players: parseInt(maxPlayers),
      game_type: gameType,
      draw_occurrencies: parseInt(extrNumber),
    };
    const response = await updateSettings(newData);
    if (response.status === 200) {
      setSettings(newData);
      toast.success('Impostazioni aggiornate correttamente!')
    } else {
      setError(response.error);
      toast.error(response.error);
    }
    setIsLoading(false);
  };

  return (
    <div className={wrapper()}>
      {isLoading && <Loader />}
      <div>
        <Flex css={{ marginBottom: "15px" }}>
          <Flex css={{ marginRight: "6px" }}>
            <BsCoin />
          </Flex>
          <Text size="large">Impostazioni budget</Text>
        </Flex>
        <div className={fieldsWrapper()}>
          <div className={fieldWrapper()}>
            <Input
              label="Budget asta"
              type="number"
              placeholder="Il budget a disposzione di tutti"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div className={fieldWrapper()}>
            <Input
              label="Budget asta invernale"
              type="number"
              placeholder="Il budget a disposzione di tutti per l'asta invernare"
              value={winterBudget}
              onChange={(e) => setWinterudget(e.target.value)}
            />
          </div>
        </div>
        <Flex css={{ marginBottom: "15px", marginTop: "30px" }}>
          <Flex css={{ marginRight: "6px" }}>
            <TbGoGame />
          </Flex>
          <Text size="large">Impostazioni rosa</Text>
        </Flex>
        <div className={fieldsWrapper()}>
          <div className={fieldWrapper()}>
            <Input
              label="Numero minimo di giocatori"
              type="number"
              placeholder="Il numero minimo di giocatori in rosa"
              value={minPlayers}
              onChange={(e) => setMinPlayers(e.target.value)}
            />
          </div>

          <div className={fieldWrapper()}>
            <Input
              label="Numero massimo di giocatori"
              type="number"
              placeholder="Il numero massimo di giocatori in rosa"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(e.target.value)}
            />
          </div>
        </div>
        <Flex css={{ marginBottom: "15px", marginTop: "30px" }}>
          <Flex css={{ marginRight: "6px" }}>
            <LuGamepad />
          </Flex>
          <Text size="large">Impostazioni gioco</Text>
        </Flex>
        <div className={fieldsWrapper()}>
          <div className={fieldWrapper()}>
            <Select
              label="Tipo di gioco"
              value={gameType}
              onChange={(e) => {
                setGameType(e.target.value);
              }}
            >
              <SelectOption value="mantra">Mantra</SelectOption>
            </Select>
          </div>
        </div>
        <Flex css={{ marginBottom: "15px", marginTop: "30px" }}>
          <Flex css={{ marginRight: "6px" }}>
            <ImHammer2 />
          </Flex>
          <Text size="large">Impostazioni asta</Text>
        </Flex>
        <div className={fieldsWrapper()}>
          <div className={fieldWrapper()}>
            <Flex css={{ alignItems: "end" }}>
              <div>
                <Input
                  label="Estraibilita' a giro completo"
                  type="number"
                  placeholder="Il numero di volte che un calciatore puo' essere estratto"
                  value={extrNumber}
                  min={1}
                  onChange={(e) => setExtrNumber(e.target.value)}
                />
              </div>
              <Flex css={{ marginLeft: "10px", marginBottom: "10px" }}>
                <Tooltip
                  text="Definisce il numero di occorrenze per cui un calciatore puo' essere ri-estratto, dato un giro completo di estrazioni. Ed esempio, se settato a 1, il calciatore non potra' essere ri-estratto fino alla fine di un giro completo di estrazione."
                  fontSize="small"
                  followCursor={false}
                  position="right"
                >
                  <BsFillQuestionCircleFill color="lightGrey" size={22} />
                </Tooltip>
              </Flex>
            </Flex>
          </div>
        </div>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Flex css={{ width: "100%", justifyContent: "end" }}>
        <Button color="black" onClick={onUpdate} hasSpaceTop>
          Salva
        </Button>
      </Flex>
    </div>
  );
};

const wrapper = css({
  marginTop: "20px",
});

const fieldsWrapper = css({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  height: "max-content",
  gap: "20px",
  "@bp2max": {
    gap: "15px 0px",
  },
});

const fieldWrapper = css({
  minWidth: "20%",
  "@bp2max": {
    flex: "100%",
  },
});
