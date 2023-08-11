import { shallow } from "zustand/shallow";
import { useStore } from "../../../../store/store";
import { css } from "../../../../styles/system";
import { Flex } from "../../../primitives/flex/flex";
import { SelectSearch } from "../../../primitives/select/select-search";
import { Text } from "../../../primitives/text/text";
import { icons } from "./icons";
import { cloneElement, useState } from "react";
import { fasce } from "../utils";
import { TextArea } from "../../../primitives/textarea/textarea";
import { Tooltip } from "../../../primitives/tooltip/tooltip";
import { PlayerRoles } from "../../../shared/player/player-roles";
import { Button } from "../../../primitives/button/button";
import { ErrorMessage } from "../../../primitives/text/error";
import { Image } from "../../../primitives/image/image";
import { Input } from "../../../primitives/input/input";
import { TbPercentage } from "react-icons/tb";
import { toast } from "react-toastify";

export const AddTarget = ({
  isEdit,
  editPlayerId,
  editSelectedFascia,
  editNotes,
  editPMax,
  editTags,
}) => {
  const { players, magheggi, settings, updateTargets } = useStore(
    (state) => ({
      players: state.players,
      magheggi: state.magheggi,
      settings: state.settings,
      updateTargets: state.updateTargets,
    }),
    shallow
  );

  console.log({editPlayerId})


  // Set states
  const [playerId, setPlayerId] = useState(editPlayerId || null);
  const [selectedFascia, setSelectedfascia] = useState(
    editSelectedFascia || ""
  );
  const [notes, setNotes] = useState(editNotes || "");
  const [pMax, setPMax] = useState(parseFloat(editPMax) || "");
  const [tags, setTags] = useState(editTags || []);

  const [isError, setIsError] = useState("");

  const magheggiedPlayers = magheggi?.targets.map((target) => target.id);

  const handleTagSelection = (id) => {
    if (tags.includes(id)) {
      // Remove tag
      setTags([...tags.filter((tagId) => tagId !== id)]);
    } else {
      // Add tag
      setTags([...tags, id]);
    }
  };

  const onSubmit = () => {
    setIsError("");
    if (!playerId) {
      setIsError("Seleziona calciatore.");
      return;
    }
    if (pMax) {
      if (pMax <= 0 || pMax >= 100) {
        setIsError("Valore errato per il prezzo massimo.");
        return;
      }
    }
    if (isEdit) {
      // Update target
      const targets = magheggi?.targets.map((target) => {
        return target.id === playerId
          ? {
              ...target,
              fascia: selectedFascia,
              notes: notes,
              p_max: pMax,
              tags: tags,
            }
          : target;
      });
      // Save everything to localstorage
      const newMagheggiData = {
        ...magheggi,
        targets: [...targets],
      };
      updateTargets(targets);
      // Add data to localstorage
      localStorage.setItem("magheggi", JSON.stringify(newMagheggiData));

      toast.success("Obiettivo modificato correttamente!");
    } else {
      // Create target

      // Create data object
      const newData = [
        ...magheggi?.targets,
        {
          id: playerId,
          fascia: selectedFascia,
          notes: notes,
          p_max: pMax,
          tags: tags,
        },
      ];
      // Create full object to store to local storage
      const newMagheggiData = {
        ...magheggi,
        targets: [...newData],
      };

      updateTargets(newData);

      // Add data to localstorage
      localStorage.setItem("magheggi", JSON.stringify(newMagheggiData));

      // Clean fieds
      setPlayerId(null);
      setNotes("");
      setPMax(null);
      setSelectedfascia("");
      setTags([]);

      toast.success("Obbiettivo creato correttamente!");
    }
  };

  return (
    <div>
      <Text size="xlarge" css={{ marginBottom: "20px" }}>
        {isEdit ? "Modifica" : "Aggiungi obiettivo"}
      </Text>
      <Flex css={{ "@bp2max": { display: "block" } }}>
        {!isEdit && (
          <Flex>
            <div>
              <SelectSearch
                value={playerId}
                label="Seleziona calciatore"
                size="medium"
                onChange={(value) => setPlayerId(value)}
                menuSize="medium"
                options={players
                  .filter((player) => !magheggiedPlayers.includes(player.id))
                  .map((player) => {
                    return {
                      label: player.name,
                      value: player.id,
                      description: (
                        <Flex>
                          <Flex css={{ marginRight: "8px" }}>
                            <Image
                              src={`/media/teams/${player.team}.png`}
                              css={{ maxHeight: "20px", maxWidth: "20px" }}
                              alt={player.team}
                            />
                          </Flex>
                          <PlayerRoles
                            gameType={settings.game_type}
                            rolesMantra={player.role_mantra}
                            roleClassic={player.role_classic}
                            size="xsmall"
                          />
                        </Flex>
                      ),
                    };
                  })}
              />
            </div>
          </Flex>
        )}
        <Flex
          css={{
            marginLeft: isEdit ? "0px" : "20px",
            "@bp2max": { marginLeft: "0px", marginTop: "10px" },
          }}
        >
          <div>
            <SelectSearch
              value={selectedFascia}
              label="Seleziona fascia"
              size="medium"
              onChange={(value) => setSelectedfascia(value)}
              menuSize="medium"
              options={fasce}
            />
          </div>
        </Flex>
        <Flex
          css={{
            marginLeft: "20px",
            "@bp2max": { marginLeft: "0px", marginTop: "10px" },
          }}
        >
          <div>
            <Input
              label="Prezzo massimo"
              placeholder="Prezzo massimo in %"
              value={pMax}
              css={{ width: "180px" }}
              onChange={(e) => setPMax(parseFloat(e.target.value))}
              type="number"
              max={100}
              min={0}
              suffix={<TbPercentage size={18} />}
            />
          </div>
        </Flex>
      </Flex>
      <Flex css={{ marginTop: "$4" }}>
        <div>
          <TextArea
            label="Aggiungi note"
            placeholder="Inserisci note"
            size="large"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </Flex>
      <div>
        <Text isBold css={{ marginBottom: "$2", marginTop: "$4" }}>
          Seleziona tags:
        </Text>
        <Flex>
          {magheggi?.tags.map((tag) => (
            <div
              className={iconWrapper({ isActive: tags.includes(tag.id) })}
              key={tag.id}
              onClick={() => handleTagSelection(tag.id)}
            >
              <Tooltip
                text={tag.name}
                variant="dark"
                fontSize="medium"
                followCursor={false}
                position="top"
              >
                <Flex
                  css={{
                    backgroundColor: tag.bg,
                    width: "65px",
                    height: "65px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "$pill",
                  }}
                >
                  {cloneElement(
                    icons.find((loopIcons) => loopIcons.value === tag.icon)
                      .component,
                    { color: tag.color, size: 40 }
                  )}
                </Flex>
              </Tooltip>
            </div>
          ))}
          {magheggi?.tags.lenght === 0 && (
            <Text>Non hai creato nessun tag.</Text>
          )}
        </Flex>
        {isError && <ErrorMessage>{isError}</ErrorMessage>}
        <Button color="black" css={{ marginTop: "20px" }} onClick={onSubmit}>
          {isEdit ? "Salva" : "Crea"}
        </Button>
      </div>
    </div>
  );
};
const iconWrapper = css({
  padding: "$2",
  margin: "$2",
  borderRadius: "$2",
  cursor: "pointer",
  variants: {
    isActive: {
      true: {
        backgroundColor: "#4cb34c82",
      },
      false: {
        "&:hover": {
          backgroundColor: "$grey3",
        },
      },
    },
  },
});
