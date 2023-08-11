import React from "react";

import { css } from "../../../styles/system";
import { Image } from "../../primitives/image/image";
import { Text } from "../../primitives/text/text";
import { playerColorVariants } from "../../../styles/global";

interface Props {
  teamName: string;
  name: string;
}

export const PlayerBanner = ({ teamName, name }: Props) => {
  return (
    <div className={headerWrapper()}>
      <div className={teamBadgeWrapper()}>
        <Image
          src={`/media/teams/${teamName}.png`}
          alt={teamName}
        />
      </div>
      <div className={header({ team: teamName.toLowerCase() })}>
        <Text color="white">
          {name}
        </Text>
      </div>
    </div>
  );
};

const headerWrapper = css({
  display: "flex",
  alignItems: "center",
});

const header = css({
  width: "100%",
  minHeight: "60px",
  display: "flex",
  alignItems: "center",
  padding: "15px",
  paddingLeft: "60px",
  position: "relative",
  left: "-45px",
  top: "-5px",
  borderRadius: "0px 100px 100px 0px",
  marginTop: "$4",
  variants: {
    team: {
      ...playerColorVariants()
    },
  },
  '& span': {
    fontSize: '40px'
  },
  '@bp2max': {
    left: '-33px',
    minWidth: '140px',
    textAlign: 'center',
    padding: "15px 15px 15px 40px",
    minHeight: "40px",
    '& span': {
      fontSize: '25px'
    },
  }
});

const teamBadgeWrapper = css({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "130px",
  minHeight: "130px",
  width: "130px",
  height: "130px",
  borderRadius: "$pill",
  zIndex: 2,
  background: "$white",
  boxShadow: "rgb(0 0 0 / 19%) 0px 10px 20px, rgb(0 0 0 / 23%) 0px 6px 6px",
  '& img': {
    maxHeight: "90px", maxWidth: "90px"
  },
  '@bp2max': {
    minWidth: "80px",
    minHeight: "80px",
    width: "80px",
    height: "80px",
    '& img': {
      maxHeight: "60px", maxWidth: "60px"
    },
  }
});
