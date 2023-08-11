import React, { useState } from "react";

import { Text } from "../../primitives/text/text";
import { Flex } from "../../primitives/flex/flex";
import { Select } from "../../primitives/select/select";
import { SelectOption } from "../../primitives/select/option";
import { IoIosStats } from "react-icons/io";
import { PlayerRoles } from "./player-roles";
import { css } from "../../../styles/system";
import { currentSeason } from "../../../settings/season";

interface Props {
  player: any;
  settings: any;
}

export const PlayerStats = ({ player, settings }: Props) => {
  const playedSeasons = Object.keys(player.stats);
  const [selectedSeason, setSelectedSeason] = useState(
    playedSeasons?.includes(currentSeason) ? currentSeason : playedSeasons[0]
  );
  return (
    <div>
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
          <IoIosStats size={30} />
        </Flex>
        <Text size="xlarge">Statistiche</Text>
      </Flex>
      <div>
        <Text color="grey" css={{ fontSize: "15px", marginBottom: "10px" }}>
          INFORMAZIONI CALCIATORE
        </Text>
        <Flex css={statsWrapper}>
          <Flex css={statItem}>
            <Text>Altezza</Text>
            <Text isBold>{player.height}</Text>
          </Flex>
          <Flex css={statItem}>
            <Text>Data di nascita</Text>
            <Text isBold>{player.birth_date}</Text>
          </Flex>
          <Flex css={statItem}>
            <Text>Piede preferito</Text>
            <Text isBold>
              {player.main_feet === "Dx" ? "Destro" : "Sinistro"}
            </Text>
          </Flex>
          <Flex css={statItem}>
            <Text>Ruolo</Text>
            <PlayerRoles
              gameType={settings.gameType}
              rolesMantra={player.role_mantra}
              roleClassic={player.role_classic}
              size="small"
            />
          </Flex>
          <Flex css={statItem}>
            <Text>Quotazione</Text>
            <Text>
              {settings.gameType === "mantra" ? player.quot_m : player.quot_c}
            </Text>
          </Flex>
        </Flex>
        <Text
          color="grey"
          css={{ fontSize: "15px", marginBottom: "10px", marginTop: "25px" }}
        >
          STATISTICHE FANTACALCIO
        </Text>
        <Flex css={{ marginTop: "15px", marginBottom: "15px" }}>
          <Select
            value={selectedSeason}
            size="small"
            onChange={(e) => setSelectedSeason(e.target.value)}
          >
            {playedSeasons.map((season) => (
              <SelectOption key={season} value={season}>
                {season}
              </SelectOption>
            ))}
          </Select>
        </Flex>
        <Flex css={statsWrapper}>
          <Flex css={statItemWithColoredStat}>
            <Text>Partite giocate</Text>
            <div className={coloredStat()}>
              <Text>{player.stats[selectedSeason]?.played_matches || "-"}</Text>
            </div>
          </Flex>

          <Flex css={statItemWithColoredStat}>
            <Text>Media voto</Text>
            <div className={coloredStat()}>
              <Text>{player.stats[selectedSeason]?.mv || "-"}</Text>
            </div>
          </Flex>

          <Flex css={statItemWithColoredStat}>
            <Text>Media fanta voto</Text>
            <div className={coloredStat()}>
              <Text>{player.stats[selectedSeason]?.mfv || "-"}</Text>
            </div>
          </Flex>

          {player.role_classic === "P" && (
            <>
              <Flex css={statItemWithColoredStat}>
                <Text>Goal subiti</Text>
                <div className={coloredStat()}>
                  <Text>
                    {player.stats[selectedSeason]?.goals_received || "-"}
                  </Text>
                </div>
              </Flex>
              <Flex css={statItemWithColoredStat}>
                <Text>Goal subiti in casa</Text>
                <div className={coloredStat()}>
                  <Text>
                    {player.stats[selectedSeason]?.home_goals_received || "-"}
                  </Text>
                </div>
              </Flex>
              <Flex css={statItemWithColoredStat}>
                <Text>Goal subiti fuori casa</Text>
                <div className={coloredStat()}>
                  <Text>
                    {player.stats[selectedSeason]?.away_goals_received || "-"}
                  </Text>
                </div>
              </Flex>
              <Flex css={statItemWithColoredStat}>
                <Text>Rigori parati</Text>
                <div className={coloredStat()}>
                  <Text>
                    {player.stats[selectedSeason]?.saved_penalties || "-"}
                  </Text>
                </div>
              </Flex>
            </>
          )}
          {player.role_classic !== "P" && (
            <>
              <Flex css={statItemWithColoredStat}>
                <Text>Goal</Text>
                <div className={coloredStat()}>
                  <Text>{player.stats[selectedSeason]?.goals || "-"}</Text>
                </div>
              </Flex>
              <Flex css={statItemWithColoredStat}>
                <Text>Goal in casa</Text>
                <div className={coloredStat()}>
                  <Text>{player.stats[selectedSeason]?.home_goals || "-"}</Text>
                </div>
              </Flex>
              <Flex css={statItemWithColoredStat}>
                <Text>Goal fuori casa</Text>
                <div className={coloredStat()}>
                  <Text>{player.stats[selectedSeason]?.away_goals || "-"}</Text>
                </div>
              </Flex>
              <Flex css={statItemWithColoredStat}>
                <Text>Rigori</Text>
                <div className={coloredStat()}>
                  <Text>{player.stats[selectedSeason]?.penalties || "-"}</Text>
                </div>
              </Flex>
              <Flex css={statItemWithColoredStat}>
                <Text>Assist</Text>
                <div className={coloredStat()}>
                  <Text>{player.stats[selectedSeason]?.assists || "-"}</Text>
                </div>
              </Flex>
            </>
          )}
          <Flex css={statItemWithColoredStat}>
            <Text>Autogoal</Text>
            <div className={coloredStat()}>
            <Text>{player.stats[selectedSeason]?.own_goals || "-"}</Text>
            </div>
          </Flex>
          <Flex css={statItemWithColoredStat}>
            <Text>Ammonizioni</Text>
            <div className={coloredStat()}>
            <Text>{player.stats[selectedSeason]?.yellow_cards || "-"}</Text>
            </div>
          </Flex>
          <Flex css={statItemWithColoredStat}>
            <Text>Espulsioni</Text>
            <div className={coloredStat()}>
            <Text>{player.stats[selectedSeason]?.red_cards || "-"}</Text>
            </div>
          </Flex>
        </Flex>
        <Text
          color="grey"
          css={{ fontSize: "12px", marginBottom: "10px", marginTop: "20px" }}
        >
          DISTRIBUZIONE PARTITE
        </Text>
        <Flex css={statsWrapper}>
          <Flex css={statItemWithColoredStat}>
            <Text>Titolare</Text>
            <div className={coloredStat()}>
              <Text>{player.stats[selectedSeason]?.matches_in_lineups || '-'}</Text>
            </div>
          </Flex>
          <Flex css={statItemWithColoredStat}>
            <Text>Subentrato</Text>
            <div className={coloredStat()}>
              <Text>{player.stats[selectedSeason]?.matches_entered_late || '-'}</Text>
            </div>
          </Flex>
          <Flex css={statItemWithColoredStat}>
            <Text>Squalificato</Text>
            <div className={coloredStat()}>
              <Text>{player.stats[selectedSeason]?.matches_disqualified || '-'}</Text>
            </div>
          </Flex>
          <Flex css={statItemWithColoredStat}>
            <Text>Infortunato</Text>
            <div className={coloredStat()}>
              <Text>{player.stats[selectedSeason]?.matches_injured || '-'}</Text>
            </div>
          </Flex>
          <Flex css={statItemWithColoredStat}>
            <Text>Non utilizzato</Text>
            <div className={coloredStat()}>
              <Text>{player.stats[selectedSeason]?.matches_unused || '-'}</Text>
            </div>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

const statsWrapper = {
  display: "flex",
  gap: "15px",
  width: "100%",
  flexWrap: "wrap",
};

const statItem = {
  minWidth: "280px",
  padding: "8px",
  borderRadius: "$2",
  backgroundColor: "$grey1",
  justifyContent: "space-between",
  "&:hover": {
    backgroundColor: "$grey2",
  },
};

const statItemWithColoredStat = {
  minWidth: "200px",
  padding: "0px 0px 0px 8px",
  borderRadius: "$2",
  backgroundColor: "$grey1",
  justifyContent: "space-between",
  "&:hover": {
    backgroundColor: "$grey2",
  },
};

const coloredStat = css({
  padding: "8px",
  backgroundColor: "$grey4",
  borderRadius: "$2",
});
