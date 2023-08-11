import { modalCommonStyles } from "../../../styles/global";
import { css } from "../../../styles/system";
import { Flex } from "../../primitives/flex/flex";
import { Text } from "../../primitives/text/text";
import { Tooltip } from "../../primitives/tooltip/tooltip";
import { PlayerBanner } from "../../shared/player/player-banner";
import { PlayerCard } from "../../shared/player/player-card";
import { useEffect, useState } from "react";
import { Button } from "../../primitives/button/button";

import { ImHammer2 } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai";
import { BiCoinStack } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { AunctionInput } from "../../primitives/input/au-input";
import { SelectSearch } from "../../primitives/select/select-search";
import { ErrorMessage } from "../../primitives/text/error";
import { updatePlayer } from "../../../requests/players";
import { useStore } from "../../../store/store";
import { shallow } from "zustand/shallow";
import { Loader } from "../../primitives/loader/loader";
import { Card } from "../../primitives/card/card";
import { Avatar } from "../../primitives/avatar/avatar";
import {
  calcMaxOffer,
  calcRemaingCredits,
  getChipLeader,
} from "../../../utils/users";
import { BsShuffle } from "react-icons/bs";
import { Sticker } from "../../primitives/sticker/sticker";
import { toArray } from "../../../utils/objects";
import { toast } from "react-toastify";

export const AuctionModal = ({ player, settings, users, onShuffle }) => {
  const ownerData = users.find((user) => user.id === player.owned);

  // getStore
  const { updatePlayer: updatePlayerStore, players } = useStore(
    (state) => ({
      updatePlayer: state.updatePlayer,
      players: state.players,
    }),
    shallow
  );

  // General states
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAuctionMode, setIsAuctionMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canStickerPlay, setCanStickerPlay] = useState(false);

  // Player purchase states
  const [cost, setCost] = useState(parseInt(player.owned_amount) || 0);
  const [owner, setOwner] = useState(player.owned || "");
  const [updateError, setUpdateError] = useState("");

  // Update player
  const onUpdatePlayer = async () => {
    if (!cost || !owner) {
      toast.error("Completa tutti i campi");
      setUpdateError("Completa tutti i campi");
      return;
    }
    if (cost < 1) {
      toast.error("Specifica un valore maggiore di 0");
      setUpdateError("Specifica un valore maggiore di 0");
      return;
    }
    setIsLoading(true);
    setUpdateError("");
    const newData = {
      ...player,
      owned: owner,
      owned_amount: cost,
    };
    const response = await updatePlayer(newData, player.id);
    setIsLoading(false);
    if (response.data) {
      // Update store
      updatePlayerStore(newData, newData.id);
      setIsEditMode(false);
      setCanStickerPlay(true);
      toast.success('Giocatore acquistato!')
    } else {
      toast.error(response.errorMessage);
      setUpdateError(response.errorMessage);
    }
  };

  // Deactivate sound
  useEffect(() => {
    canStickerPlay && setCanStickerPlay(false);
  }, [canStickerPlay]);

  // Release player
  const onReleasePlayer = async () => {
    setIsLoading(true);
    setUpdateError("");
    const newData = {
      ...player,
      owned: "",
      owned_amount: null,
    };
    const response = await updatePlayer(newData, player.id);
    setIsLoading(false);
    if (response.data) {
      // Update store
      updatePlayerStore(newData, newData.id);
      setIsEditMode(false);
      setIsAuctionMode(false);
    } else {
      setUpdateError(response.errorMessage);
    }
  };

  const generateBuyers = (users, players, cost) => {
    return users
      .filter((user) => {
        const maxOffer = calcMaxOffer(settings, players, user.id);
        const purchasedPlayersAmount = players.filter(
          (player) => player.owned === user.id
        ).length;

        const canOffer =
          maxOffer >= cost && purchasedPlayersAmount < settings.max_players;

        return canOffer;
      })
      .map((user) => {
        return {
          label: user.username,
          value: user.id,
          description: user.team_name,
        };
      });
  };

  return (
    <div className={modalSizes()}>
      {isLoading && <Loader />}
      <PlayerBanner teamName={player.team} name={player.name} />
      <Flex
        css={{
          alignItems: "start",
          marginTop: "40px",
          paddingTop: "10px",
          "@bp2max": {
            padding: "0",
            display: "block",
          },
        }}
      >
        <div
          style={{
            minWidth: "370px",
            marginLeft: "30px",
            marginTop: "10px",
            "@bp2max": {
              minWidth: "inherit",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            },
          }}
        >
          <PlayerCard player={player} settings={settings} />
        </div>
        <div style={{ width: "100%" }}>
          {player.owned && (
            <div>
              <Text
                size="xlarge"
                css={{
                  textAlign: "center",
                  marginBottom: "15px",
                  "@bp2max": { marginTop: "20px" },
                }}
              >
                Gestisci calciatore
              </Text>
              <Flex
                css={{
                  justifyContent: "center",
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                <Flex css={ownerBox}>
                  <Text>
                    Calciatore acquistato da <b>{ownerData.username}</b> (
                    {ownerData.team_name}) per <b>{player.owned_amount}</b>{" "}
                    crediti
                  </Text>
                </Flex>
                {!isEditMode && (
                  <Flex
                    css={{
                      marginTop: "20px",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Sticker
                      width={250}
                      play={canStickerPlay}
                      player={player}
                      user={users.find((user) => user.id === owner)}
                      settings={settings}
                    />
                    <Flex css={{ marginTop: "20px" }}>
                      <Tooltip
                        text={`Svincola a prezzo pieno (${player.owned_amount} crediti)`}
                        variant="dark"
                        fontSize="small"
                        followCursor={false}
                        position="top"
                      >
                        <Button
                          color="red"
                          css={{ marginRight: "20px" }}
                          onClick={onReleasePlayer}
                        >
                          <RxCross2 />
                          <Text css={{ marginLeft: "5px" }} color="white">
                            Svincola
                          </Text>
                        </Button>
                      </Tooltip>
                      <Button color="black" onClick={() => setIsEditMode(true)}>
                        <AiFillEdit />
                        <Text css={{ marginLeft: "5px" }} color="white">
                          Modifica
                        </Text>
                      </Button>
                    </Flex>
                  </Flex>
                )}
                {isEditMode && (
                  <Flex css={editPlayerBox}>
                    <Text css={{ marginBottom: "15px", fontSize: "20px" }}>
                      Modifica
                    </Text>
                    <div style={{ marginBottom: "15px" }}>
                      <AunctionInput
                        value={cost}
                        onChange={setCost}
                        max={settings.budget}
                      />
                    </div>
                    <SelectSearch
                      value={owner}
                      onChange={(value) => setOwner(value)}
                      menuSize="medium"
                      options={generateBuyers(users, players, cost)}
                    />
                    {updateError && <ErrorMessage>{updateError}</ErrorMessage>}
                    <Flex css={{ marginTop: "20px" }}>
                      <Button
                        color="red"
                        css={{ marginRight: "20px" }}
                        onClick={() => setIsEditMode(false)}
                      >
                        <IoMdArrowBack />
                        <Text css={{ marginLeft: "5px" }} color="white">
                          Annulla
                        </Text>
                      </Button>
                      <Button color="black" onClick={onUpdatePlayer}>
                        <TiTick />
                        <Text css={{ marginLeft: "5px" }} color="white">
                          Conferma
                        </Text>
                      </Button>
                    </Flex>
                  </Flex>
                )}
              </Flex>
            </div>
          )}
          {!player.owned && (
            <div>
              {!isAuctionMode && (
                <div>
                  <Text
                    size="xlarge"
                    css={{
                      textAlign: "center",
                      marginBottom: "35px",
                      "@bp2max": { marginTop: "20px" },
                    }}
                  >
                    Vuoi iniziare l'asta per {player.name}?
                  </Text>
                  <Flex
                    css={{
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      color="orange"
                      css={{ marginRight: "20px" }}
                      onClick={onShuffle}
                    >
                      <BsShuffle />
                      <Text css={{ marginLeft: "8px" }} color="white">
                        Salta ed estrai nuovo
                      </Text>
                    </Button>
                    <Button
                      color="black"
                      onClick={() => {
                        setIsAuctionMode(true);
                        setOwner("");
                        setCost(0);
                      }}
                    >
                      <ImHammer2 />
                      <Text css={{ marginLeft: "8px" }} color="white">
                        Asta
                      </Text>
                    </Button>
                  </Flex>
                </div>
              )}
              {isAuctionMode && (
                <>
                  <Flex
                    css={{
                      padding: "0 0 0 20px",
                      alignItems: "initial",
                      "@bp2max": { padding: 0, display: "inherit" },
                    }}
                  >
                    <Flex
                      css={{
                        display: "block",
                        width: "60%",
                        ...editPlayerBox,
                        "@bp2max": { width: "100%", padding: "20px 0" },
                      }}
                    >
                      <Text
                        size="xlarge"
                        css={{
                          textAlign: "center",
                          marginBottom: "15px",
                          "@bp2max": { marginTop: "20px" },
                        }}
                      >
                        Gestisci asta
                      </Text>
                      <Flex css={{ flexDirection: "column" }}>
                        <Text css={{ marginBottom: "20px", fontSize: "160px" }}>
                          {cost}
                        </Text>
                        <div style={{ marginBottom: "20px" }}>
                          <AunctionInput
                            value={cost}
                            onChange={setCost}
                            max={settings.budget}
                          />
                        </div>
                        <div>
                          <SelectSearch
                            css={{ textAlign: "center" }}
                            value={owner}
                            onChange={(value) => setOwner(value)}
                            placeholder="Seleziona un giocatore"
                            menuSize="medium"
                            options={generateBuyers(users, players, cost)}
                          />
                        </div>
                        {updateError && (
                          <ErrorMessage>{updateError}</ErrorMessage>
                        )}
                        <Button
                          color="green"
                          onClick={onUpdatePlayer}
                          css={{ marginTop: "20px" }}
                        >
                          ASSEGNA
                        </Button>
                      </Flex>
                    </Flex>
                    <Flex
                      css={{
                        display: "block",
                        paddingLeft: "20px",
                        width: "40%",
                        "@bp2max": { width: "100%", marginTop: "20px" },
                      }}
                    >
                      <Text
                        size="xlarge"
                        css={{ marginBottom: "20px", textAlign: "center" }}
                      >
                        Lista giocatori
                      </Text>
                      <div className={usersWrapper()}>
                        {users.map((user) => {
                          const maxOffer = calcMaxOffer(
                            settings,
                            players,
                            user.id
                          );
                          const remaininCredits = calcRemaingCredits(
                            settings.budget,
                            players,
                            user.id
                          );
                          const isChipLeader =
                            getChipLeader(settings.budget, players, users)
                              .id === user.id;
                          const purchasedPlayersAmount = players.filter(
                            (player) => player.owned === user.id
                          ).length;

                          const cannotOffer =
                            maxOffer < cost ||
                            purchasedPlayersAmount >= settings.max_players;
                          return (
                            <Card
                              css={cardStyle(isChipLeader, cannotOffer)}
                              key={user.id}
                            >
                              <Flex
                                css={{
                                  padding: "8px",
                                  paddingBottom: "0px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Avatar
                                  width={80}
                                  alt={user.username}
                                  hair={user.avatar.hair}
                                  accessory={user.avatar.accessory}
                                  hairColor={user.avatar.hair_color}
                                  facialHair={user.avatar.facial_hair}
                                  facialHairColor={
                                    user.avatar.facial_hair_color
                                  }
                                  clothes={user.avatar.clothes}
                                  clothesColor={user.avatar.clothes_color}
                                  eyes={!cannotOffer ? user.avatar.eyes : "Cry"}
                                  eyebrow={
                                    !cannotOffer
                                      ? user.avatar.eyebrow
                                      : "SadConcerned"
                                  }
                                  mouth={
                                    !cannotOffer ? user.avatar.mouth : "Sad"
                                  }
                                  skinColor={user.avatar.skin_color}
                                />
                              </Flex>
                              <div style={{ textAlign: "center" }}>
                                <div className={userName()}>
                                  <Text
                                    color="grey"
                                    css={{
                                      fontSize: "12px",
                                      display: "block",
                                    }}
                                  >
                                    {user.username}
                                  </Text>
                                </div>
                                <div style={{ padding: "6px" }}>
                                  <Flex css={{ justifyContent: "center" }}>
                                    <BiCoinStack size="12" />
                                    <Text
                                      css={{
                                        fontSize: "12px",
                                        marginLeft: "6px",
                                      }}
                                    >
                                      {remaininCredits}
                                    </Text>
                                  </Flex>
                                </div>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </Flex>
                  </Flex>
                </>
              )}
            </div>
          )}
        </div>
      </Flex>

      <Flex css={{ justifyContent: "end", marginTop: "70px" }}>
        {(isAuctionMode || isEditMode || player.owned) && (
          <Button color="orange" onClick={onShuffle}>
            <BsShuffle />
            <Text css={{ marginLeft: "8px" }} color="white">
              Estrai nuovo
            </Text>
          </Button>
        )}
      </Flex>
    </div>
  );
};

const modalSizes = css({
  width: "92vw",
  maxHeight: "90vh",
  overflowY: "scroll",
  ...modalCommonStyles(),
});

const ownerBox = {
  justifyContent: "center",
  width: "fit-content",
  padding: "$4",
  backgroundColor: "$grey2",
  borderRadius: "$3",
};

const editPlayerBox = {
  marginTop: "20px",
  padding: "$5",
  backgroundColor: "$grey2",
  flexDirection: "column",
  borderRadius: "$3",
  "&:hover": {
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
  },
};

const usersWrapper = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  width: "100%",
  flexWrap: "wrap",
  height: "max-content",
  "@bp1max": {
    gap: "40px 0px",
    paddingLeft: 0,
    minHeight: "inherit",
  },
  "@bp2max": {
    marginTop: "0px",
  },
});

const cardStyle = (isChipLeader, isGreyedOut) => {
  return {
    borderRadius: "$4",
    position: "relative",
    width: "90px",
    height: "100%",
    padding: "0",
    background: isChipLeader
      ? "linear-gradient(145deg, rgba(255,215,0,1) 23%, rgba(255,255,255,1) 100%)"
      : "linear-gradient(145deg, rgba(177,177,177,1) 0%, rgba(255,255,255,1) 100%)",
    ...(isGreyedOut && { filter: "grayscale(100%)", opacity: "0.5" }),
  };
};

const userName = css({
  backgroundColor: "#ffffff6e",
  padding: "$3",
});
