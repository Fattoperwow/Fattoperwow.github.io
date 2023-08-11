import { css } from "../../../styles/system";
import { Card } from "../../primitives/card/card";
import { Text } from "../../primitives/text/text";
import { BiCoinStack } from "react-icons/bi";
import { BiFootball } from "react-icons/bi";
import { Avatar } from "../../primitives/avatar/avatar";
import { Flex } from "../../primitives/flex/flex";
import { useState } from "react";
import { Modal } from "../../primitives/modal/modal";
import {
  calcPurchasedPlayersAmount,
  calcRemaingCredits,
  getChipLeader,
} from "../../../utils/users";
import {
  getMantraRoleWeight as mantraRoleWeight,
  getPlayerFavourableRole,
} from "../../../utils/players";
import { UserOverview } from "../../shared/user/user-overview";
import { useStore } from "../../../store/store";
import { shallow } from "zustand/shallow";
import { toArray } from "../../../utils/objects";

export const Users = () => {
  const { users, players, settings } = useStore(
    (state) => ({
      users: state.users,
      players: state.players,
      updatePlayer: state.updatePlayer,
      settings: state.settings,
      setSettings: state.setSettings,
    }),
    shallow
  );

  // States
  const [userHover, setuserHover] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className={userStatsModalWrapper()}>
          <UserOverview
            user={users.find((user) => user.id === selectedUser)}
            players={players
              .filter((p) => p.owned === selectedUser)
              }
            settings={settings}
          />
        </div>
      </Modal>
      <div className={wrapper()}>
        {users.map((user) => {
          return (
            <div
              onMouseEnter={() => setuserHover(user.id)}
              onMouseLeave={() => setuserHover("")}
              onClick={() => {
                setSelectedUser(user.id);
                setIsModalOpen(true);
              }}
            >
              <Card
                css={cardStyle(
                  getChipLeader(settings.budget, players, users).id === user.id
                )}
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
                    width={200}
                    alt={user.username}
                    hair={user.avatar.hair}
                    accessory={user.avatar.accessory}
                    hairColor={user.avatar.hair_color}
                    facialHair={user.avatar.facial_hair}
                    facialHairColor={user.avatar.facial_hair_color}
                    clothes={user.avatar.clothes}
                    clothesColor={user.avatar.clothes_color}
                    eyes={userHover === user.id ? "Happy" : user.avatar.eyes}
                    eyebrow={user.avatar.eyebrow}
                    mouth={userHover === user.id ? "Smile" : user.avatar.mouth}
                    skinColor={user.avatar.skin_color}
                  />
                </Flex>
                <div style={{ textAlign: "center" }}>
                  <div className={userName()}>
                    <Text
                      isBold
                      css={{
                        fontSize: "20px",
                        display: "block",
                        marginBottom: "5px",
                      }}
                    >
                      {user.team_name}
                    </Text>
                    <Text
                      color="grey"
                      css={{ fontSize: "18px", display: "block" }}
                    >
                      {user.username}
                    </Text>
                  </div>
                  <div style={{ padding: "12px" }}>
                    <Flex
                      css={{
                        marginTop: "15px",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Flex>
                        <BiCoinStack />
                        <Text css={{ marginLeft: "4px" }}>
                          Crediti rimanenti
                        </Text>
                      </Flex>
                      <Text isBold>
                        {calcRemaingCredits(settings.budget, players, user.id)}
                      </Text>
                    </Flex>
                    <Flex
                      css={{
                        marginTop: "15px",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Flex>
                        <BiFootball />
                        <Text css={{ marginLeft: "4px" }}>
                          Calciatori acquistati
                        </Text>
                      </Flex>
                      <Text isBold>
                        {calcPurchasedPlayersAmount(players, user.id)}
                      </Text>
                    </Flex>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

const wrapper = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "50px",
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

const cardStyle = (isChipLeader) => {
  return {
    borderRadius: "$4",
    position: "relative",
    cursor: "pointer",
    width: "220px",
    height: "100%",
    padding: "0",
    background: isChipLeader
      ? "linear-gradient(145deg, rgba(255,215,0,1) 23%, rgba(255,255,255,1) 100%)"
      : "linear-gradient(145deg, rgba(177,177,177,1) 0%, rgba(255,255,255,1) 100%)",
    "&:hover": {
      boxShadow:
        "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    },
  };
};

const userName = css({
  backgroundColor: "$white",
  padding: "$3",
});

const userStatsModalWrapper = css({
  width: "92vw",
  maxHeight: "84vh",
  overflowY: "scroll",
  backgroundColor: "$white",
  borderRadius: "$2",
  padding: "$4",
  "@bp2max": {
    width: "85vw",
  },
});
