import React from "react";

import { css } from "../../../styles/system";
import { PlayerBanner } from "./player-banner";
import { Flex } from "../../primitives/flex/flex";
import { PlayerCard } from "./player-card";
import { PlayerStats } from "./player-stats";

interface Props {
  player?: any;
  settings?: any;
}

export const PlayerOverview = ({ player, settings }: Props) => {
  return (
    <div className={wrapper()}>
      <PlayerBanner teamName={player.team} name={player.name} />
      <Flex
        css={{
          padding: "$5",
          alignItems: "start",
          "@bp2max": {
            padding: "0",
            marginTop: "10px",
            display: "block",
          },
        }}
      >
        <PlayerCard player={player} settings={settings} />
        <Flex
          css={{
            paddingLeft: "120px",
            aligItems: "start",
            position: 'relative',
            top: '-13px',
            "@bp2max": {
              padding: "0",
              marginTop: '20px',
              position: 'inherit'
            },
          }}
        >
          <PlayerStats player={player}settings={settings} />
        </Flex>
      </Flex>
    </div>
  );
};

const wrapper = css({
  width: "100%",
});
