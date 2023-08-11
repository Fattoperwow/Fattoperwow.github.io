import { css } from "../../../styles/system";
import { Flex } from "../../primitives/flex/flex";
import { Text } from "../../primitives/text/text";
import { Modal } from "../../primitives/modal/modal";
import { GrSelect } from "react-icons/gr";
import { LiaRandomSolid } from "react-icons/lia";
import { Input } from "../../primitives/input/input";
import { Image } from "../../primitives/image/image";
import { useEffect, useState } from "react";
import { Button } from "../../primitives/button/button";
import { useStore } from "../../../store/store";
import { shallow } from "zustand/shallow";
import { PlayerRoles } from "../../shared/player/player-roles";
import { AuctionModal } from "./auction-modal";
import { Loader } from "../../primitives/loader/loader";
import { updateSettings } from "../../../requests/settings";
import { updatePlayer } from "../../../requests/players";
import { toast } from "react-toastify";
import { BiDownload } from "react-icons/bi";

export const Auction = () => {
  // Set store
  const {
    users,
    players,
    updatePlayer: updatePlayerStore,
    settings,
    setSettings,
  } = useStore(
    (state) => ({
      users: state.users,
      players: state.players,
      updatePlayer: state.updatePlayer,
      settings: state.settings,
      setSettings: state.setSettings,
    }),
    shallow
  );

  // Set states
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [auctionModaIsOpen, setAuctionModalIsOpen] = useState(null);

  // On player id selection
  useEffect(() => {
    selectedPlayerId && setAuctionModalIsOpen(true);
  }, [selectedPlayerId]);

  // Listen to modal off and reset player id
  useEffect(() => {
    !auctionModaIsOpen && setSelectedPlayerId(null);
  }, [auctionModaIsOpen]);

  const shuffle = async (round) => {
    setIsLoading(true);
    // Prevent infinite loop
    if (round < 100) {
      // Filter array of players that follows the criterias to be drawn:
      // ND < (CR +1) * SDO
      // Where
      // ND = number of times a player has been drawn  (player.draw_count)
      // CR = current round (settings.draw_round)
      // SDO = Number of times a player can be drawn in one round (settings.draw_occurrencies)
      let filteredPlayers = players.filter(
        (player) =>
          player.draw_count < (round + 1) * settings.draw_occurrencies &&
          player.owned === "" &&
          selectedPlayerId !== player.id
      );
      if (filteredPlayers.length > 0) {
        // We have our boy. Now let's extract our player
        const drawnPlayer =
          filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)];

        const newData = {
          ...drawnPlayer,
          draw_count: drawnPlayer.draw_count + 1,
        };

        // Update player states
        const response = await updatePlayer(newData, drawnPlayer.id);
        if (response.data) {
          // Update store
          updatePlayerStore(newData, newData.id);
          setSelectedPlayerId(drawnPlayer.id);
        }

        setIsLoading(false);
      } else {
        // No one has been found
        const response = await updateSettings({
          ...settings,
          draw_round: round + 1,
        });
        if (response.status === 200) {
          setSettings({ draw_round: round + 1 });
          shuffle(round + 1);
        }
      }
    } else {
      setIsLoading(false);
      setSelectedPlayerId(null);
      toast.error(
        "Qualcosa e' andato storto ed abbiamo raggounto il limite di 100 estrazioni"
      );
      return {};
    }
  };

  const onDownloadCSV = () => {
    // Get array of rows
    let rows = [["$", "$", "$"]];
    const purchasedPlayers = players.filter((player) => player.owned !== "");

    purchasedPlayers.forEach((player) => {
      const user = users.find((user) => user.id === player.owned);
      rows.push([user.team_name, player.id, player.owned_amount]);
    });

    // define content
    let csvContent =
      "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");

    var encodedUri = encodeURI(csvContent);
    var dlAnchorElem = document.getElementById("downloadAnchorElem2");
    dlAnchorElem.setAttribute("href", encodedUri);
    dlAnchorElem.setAttribute("download", "rosa.csv");
    dlAnchorElem.click();
  };

  return (
    <>
      {isLoading && <Loader />}
      <a id="downloadAnchorElem2" style={{ display: "none" }} alt="" />
      <Modal isOpen={auctionModaIsOpen} setIsOpen={setAuctionModalIsOpen}>
        <AuctionModal
          player={players.find((player) => player.id === selectedPlayerId)}
          settings={settings}
          users={users}
          onShuffle={() => shuffle(settings.draw_round)}
          key={selectedPlayerId}
        />
      </Modal>
      <div className={wrapper()}>
        <div className={controlsWrapper()}>
          <Flex
            css={{
              marginBottom: "25px",
              "@bp2max": {
                textAlign: "center",
              },
            }}
          >
            <Flex
              css={{
                marginRight: "10px",
              }}
            >
              <GrSelect size={26} />
            </Flex>
            <Text size="xlarge">Seleziona un calciatore</Text>
          </Flex>
          <Flex css={{ alignItems: "end", "@bp2max": { display: "block" } }}>
            <Flex css={box}>
              <Text css={{ fontSize: "18px", marginBottom: "15px" }} isBold>
                Cerca un calciatore
              </Text>
              <Input
                placeholder="Cerca un calciatore per nome..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                size="medium"
              />
            </Flex>
            <Flex css={box}>
              <Text
                bottomMargin
                css={{ fontSize: "18px", marginBottom: "15px" }}
                isBold
              >
                Estrai random
              </Text>
              <Button
                color="black"
                onClick={() => shuffle(settings.draw_round)}
              >
                <LiaRandomSolid size={18} />
                <Text color="white" css={{ marginLeft: "6px" }}>
                  Estrai
                </Text>
              </Button>
            </Flex>
            <Flex css={box}>
              <Text
                bottomMargin
                css={{ fontSize: "18px", marginBottom: "15px" }}
                isBold
              >
                Scarica CSV leghe
              </Text>
              <Button color="black" onClick={() => onDownloadCSV()}>
                <BiDownload size={18} />
                <Text color="white" css={{ marginLeft: "6px" }}>
                  Download
                </Text>
              </Button>
            </Flex>
          </Flex>
          <div>
            {search && (
              <div style={{ marginTop: "30px" }}>
                <Text isBold>Risultati:</Text>
                <Flex css={itemsWrapper}>
                  {players
                    .filter((player) =>
                      player.name.toLowerCase()?.includes(search.toLowerCase())
                    )
                    .map((player) => {
                      const playerOwner = users.find(
                        (user) => user.id === player.owned
                      )?.team_name;
                      return (
                        <Flex
                          css={item}
                          key={player.id}
                          onClick={() => {
                            setSelectedPlayerId(player.id);
                          }}
                        >
                          <Flex
                            css={{
                              background: "$white",
                              justifyContent: "center",
                              minHeight: "80px",
                              padding: "6px",
                              borderRadius: "$2",
                            }}
                          >
                            <Image
                              src={`/media/players/${player.id}.png`}
                              defaultSrc={`/media/general/player.png`}
                              css={{
                                maxHeight: "70px",
                                maxWidth: "70px",
                              }}
                              alt={player.team}
                            />
                          </Flex>
                          <div style={{ marginLeft: "15px" }}>
                            <Text
                              isBold
                              isDisplayBlock
                              css={{ fontSize: "18px", marginBottom: "10px" }}
                            >
                              {player.name}
                            </Text>
                            <Flex css={{ marginBottom: "10px" }}>
                              <Image
                                src={`/media/teams/${player.team}.png`}
                                css={{ maxHeight: "20px", maxWidth: "20px" }}
                                alt={player.team}
                              />
                              <div style={{ margin: "0px 10px" }}>·</div>
                              <PlayerRoles
                                gameType={settings.game_type}
                                rolesMantra={player.role_mantra}
                                roleClassic={player.role_classic}
                                size="xsmall"
                              />
                            </Flex>
                            {playerOwner && (
                              <Text isDisplayBlock size="small" color="grey">
                                {playerOwner}
                              </Text>
                            )}
                            {!playerOwner && (
                              <Text isDisplayBlock size="small" color="grey">
                                Svincolato
                              </Text>
                            )}
                          </div>
                        </Flex>
                      );
                    })}
                </Flex>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const wrapper = css({
  padding: "$4",
  "@bp2max": {
    padding: "$1",
  },
});

const controlsWrapper = css({
  background: "$white",
  padding: "$4",
  borderRadius: "$3",
});

const box = {
  background: "$grey1",
  border: "1px solid $grey2",
  padding: "$5",
  borderRadius: "$2",
  flexDirection: "column",
  minHeight: "122px",
  justifyContent: "center",
  marginRight: "40px",
  "&:hover": {
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  },
  "@bp2max": {
    marginRight: "0px",
    marginTop: "20px",
  },
};

const itemsWrapper = {
  display: "flex",
  gap: "15px",
  width: "100%",
  flexWrap: "wrap",
  marginTop: "$3",
};

const item = {
  minWidth: "250px",
  padding: "$3",
  borderRadius: "$2",
  background: "$grey2",
  cursor: "pointer",
  "&:hover": {
    background: "$grey3",
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
  },
  "@bp2max": {
    width: "100%",
  },
};
