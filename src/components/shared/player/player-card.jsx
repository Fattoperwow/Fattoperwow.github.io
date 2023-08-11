import React from "react";

import { css } from "../../../styles/system";
import { Image } from "../../primitives/image/image";
import { PlayerRoles } from "./player-roles";
import cardBackground from "../../../media/players/playercard-bg.png";
import {
  playerCardColorVariants,
  playerCardMainColorVariants,
} from "../../../styles/global";
import { Flex } from "../../primitives/flex/flex";
import { getCountryCode } from "../../../utils/countries";
import { Text } from "../../primitives/text/text";

interface Props {
  player: any;
  settings: any;
}

export const PlayerCard = ({ player, settings }: Props) => {
  const playerNameArray = [
    player.name.substring(0, player.name.indexOf(" ")),
    player.name.substring(player.name.indexOf(" ") + 1),
  ];

  return (
    <Flex css={{ position: "relative" }}>
      <div className={fakePlayerCard()}></div>
      <div
        className={playerCard({ team: player.team.toLowerCase() })}
        style={{ backgroundImage: `url("${cardBackground}")` }}
      >
        <div className={overlay({ team: player.team.toLowerCase() })}></div>
        <div className={secondOverlay()}>
          <Flex
            css={{
              padding: "15px 20px 0px 20px",
              justifyContent: "space-between",
            }}
          >
            <span>
              <Image
                src={`/media/teams/${player.team}.png`}
                css={{ maxHeight: "35px", maxWidth: "35px" }}
                alt={player.team}
              />
            </span>
            <div className={"flagIcon d-none"}>
              <span>
                <img
                  src={`https://flagcdn.com/h40/${getCountryCode(
                    player?.nationality?.split(",")[0]
                  )}.png`}
                  srcSet={`https://flagcdn.com/h40/${getCountryCode(
                    player?.nationality?.split(",")[0]
                  )}.png 2x,
https://flagcdn.com/h60/${getCountryCode(
                    player?.nationality?.split(",")[0]
                  )}.png 3x`}
                  alt={player.nationality}
                  className={flag()}
                />
              </span>
            </div>
          </Flex>
          <div className={playerImageWrapper()}>
            <Image
              src={`/media/players/${player.id}.png`}
              defaultSrc={`/media/general/player.png`}
              css={{
                maxHeight: "220px",
                maxWidth: "270px",
              }}
              alt={player.team}
            />
          </div>
          <div className={playerInfo()}>
            <div className={playerName()}>
              <div>
                {playerNameArray[1] && (
                  <Text isBold css={{ fontSize: "22px", color: "black" }}>
                    {playerNameArray[1]}
                  </Text>
                )}
              </div>
              <div>
                {playerNameArray[0] && (
                  <Text isBold css={{ fontSize: "30px", color: "black" }}>
                    {playerNameArray[0]}
                  </Text>
                )}
              </div>
            </div>
            <Flex css={{ justifyContent: "center", marginTop: "15px" }}>
              <PlayerRoles
                gameType={"mantra"}
                rolesMantra={player.role_mantra}
                roleClassic={player.role_classic}
                size="medium"
              />
            </Flex>
          </div>
        </div>
      </div>
    </Flex>
  );
};

export const playerCard = css({
  position: "absolute",
  zIndex: "1",
  height: "415px",
  minWidth: "300px",
  borderRadius: "20px",
  backgroundSize: "104%",
  backgroundPosition: "center",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
  variants: {
    team: {
      ...playerCardMainColorVariants(),
    },
  },
  "@bp2max": {
    position: "inherit",
  },
});

export const fakePlayerCard = css({
  height: "413px",
  minWidth: "259px",
  borderRadius: "20px",
  left: "40px",
  backgroundSize: "104%",
  backgroundPosition: "center center",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  backgroundColor: "$grey2",
  transform: "rotate(14deg)",
  position: "relative",
  "@bp2max": {
    display: "none",
  },
});

const overlay = css({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0",
  left: "0",
  borderRadius: "20px",
  variants: {
    team: {
      ...playerCardColorVariants(145),
    },
  },
});

const secondOverlay = css({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: 3,
});

const playerImageWrapper = css({
  display: "flex",
  justifyContent: "center",
  position: "relative",
  top: "-28px",
});

const playerInfo = css({
  textAlign: "center",
  position: "relative",
  top: "-29px",
});
const playerName = css({
  padding: "10px",
  backgroundColor: "#ffffff4a",
});
const flag = css({
  borderRadius: "$pill",
  width: "30px",
  height: "30px",
});
