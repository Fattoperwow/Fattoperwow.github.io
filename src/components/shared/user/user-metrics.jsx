import React from "react";

import { css } from "../../../styles/system";
import { Text } from "../../primitives/text/text";
import { Hr } from "../../primitives/hr/hr";
import { Flex } from "../../primitives/flex/flex";
import {
  calcMaxOffer,
  calcPurchasedPlayersAmount,
  calcRemaingCredits,
  calcSpentCredits,
} from "../../../utils/users";
import { BiCoinStack, BiFootball } from "react-icons/bi";

import { BsClipboardData } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { RoleCostDistributionStat } from "../graphs/role-cost-distribution";

interface Props {
  user?: any;
  players?: any;
  settings?: any;
}

export const UserMetrics = ({ user, players, settings }: Props) => {
  const minPlayersLeft =
    parseInt(settings.min_players) -
    parseInt(calcPurchasedPlayersAmount(players, user.id));

  const maxPlayersLeft =
    parseInt(settings.max_players) -
    parseInt(calcPurchasedPlayersAmount(players, user.id));

  return (
    <Flex
      css={{
        width: "100%",
        alignItems: "inherit",
        "@bp2max": {
          display: "block",
        },
      }}
    >
      <Flex
        css={{
          width: "30%",
          display: "block",
          "@bp2max": {
            width: "100%",
          },
        }}
      >
        <Flex
          css={{
            marginBottom: "15px",
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
            <BsClipboardData size={26} />
          </Flex>
          <Text size="xlarge">Dati</Text>
        </Flex>
        <Hr css={hrMargin()}>CALCIATORI</Hr>
        <Flex
          css={{
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <Flex css={item}>
            <Flex>
              <BiFootball />
              <Text css={{ marginLeft: "6px" }}>Calciatori acquistati</Text>
            </Flex>
            <Text isBold>{calcPurchasedPlayersAmount(players, user.id)}</Text>
          </Flex>
          {settings?.min_players && minPlayersLeft === maxPlayersLeft && (
            <Flex css={item}>
              <Flex>
                <BiFootball />
                <Text css={{ marginLeft: "6px" }}>Calciatori acquistabili</Text>
              </Flex>
              <Text isBold>{maxPlayersLeft}</Text>
            </Flex>
          )}
          {settings?.min_players && minPlayersLeft !== maxPlayersLeft && (
            <>
              <Flex css={item}>
                <Flex>
                  <BiFootball />
                  <Text css={{ marginLeft: "6px" }}>
                    Calciatori acquistabili (min)
                  </Text>
                </Flex>
                <Text isBold>{minPlayersLeft < 0 ? 0 : minPlayersLeft}</Text>
              </Flex>
              <Flex css={item}>
                <Flex>
                  <BiFootball />
                  <Text css={{ marginLeft: "6px" }}>
                    Calciatori acquistabili (max)
                  </Text>
                </Flex>
                <Text isBold>{maxPlayersLeft}</Text>
              </Flex>
            </>
          )}
        </Flex>
        <Hr css={hrMargin()}>CREDITI</Hr>
        <Flex
          css={{
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <Flex css={item}>
            <Flex>
              <BiCoinStack />
              <Text css={{ marginLeft: "6px" }}>Crediti spesi</Text>
            </Flex>
            <Text isBold>{calcSpentCredits(players, user.id)}</Text>
          </Flex>
          <Flex css={item}>
            <Flex>
              <BiCoinStack />
              <Text css={{ marginLeft: "6px" }}>Crediti rimanenti</Text>
            </Flex>
            <Text isBold>
              {calcRemaingCredits(settings.budget, players, user.id)}
            </Text>
          </Flex>
          <Flex css={item}>
            <Flex>
              <BiCoinStack />
              <Text css={{ marginLeft: "6px" }}>Massima offerta</Text>
            </Flex>
            <Text isBold>{calcMaxOffer(settings, players, user.id)}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        css={{
          width: "70%",
          display: "block",
          paddingLeft: "40px",
          "@bp2max": {
            width: "100%",
            marginTop: "40px",
            paddingLeft: "0px",
          },
        }}
      >
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
            <VscGraph size={26} />
          </Flex>
          <Text size="xlarge">Grafici</Text>
        </Flex>
        <Text size="small" color="grey">
          Ogni giocatore viene considerato secondo il ruolo piu' conveniente,
          seguendo la seguente classificazione:
        </Text>
        <Text
          size="small"
          color="grey"
        >{`Por > Dc > Dd = Ds > M > E > C > W = T > A > Pc`}</Text>
        <Text size="small" color="grey" css={{ marginBottom: "10px" }}>
          Ad esempio, un "Dd, E" viene considerato come "Dd".
        </Text>
        <Flex css={{ height: "500px", width: "100%" }}>
          <RoleCostDistributionStat
            players={players}
            settings={settings}
           />
        </Flex>
      </Flex>
    </Flex>
  );
};

const item = {
  width: "100%",
  padding: "8px",
  borderRadius: "$2",
  backgroundColor: "$grey1",
  justifyContent: "space-between",
  "&:hover": {
    backgroundColor: "$grey2",
  },
};

const hrMargin = css({
  marginTop: "25px",
  marginBottom: "15px",
});
