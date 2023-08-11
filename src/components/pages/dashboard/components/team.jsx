import { Text } from "../../../primitives/text/text";
import { Table } from "../../../primitives/table/table";
import { TableHead } from "../../../primitives/table/head";
import { TableRow } from "../../../primitives/table/row";
import { TableCell } from "../../../primitives/table/cell";
import { TableBody } from "../../../primitives/table/body";
import { Tooltip } from "../../../primitives/tooltip/tooltip";
import { PlayerRoles } from "../../../shared/player/player-roles";
import { Image } from "../../../primitives/image/image";
import {
  getMantraRoleWeight,
  getPlayerFavourableRole,
} from "../../../../utils/players";

export const TeamModal = ({ players }) => {
  return (
    <div>
      <Text size="xlarge" css={{ marginBottom: "20px" }}>
        La tua rosa
      </Text>
      {players.length > 0 && (
        <Table isStriped css={tableStyles}>
          <TableHead>
            <TableRow>
              <TableCell minWidth="200px">Nome</TableCell>
              <TableCell isCentered width="8%">
                Squadra
              </TableCell>
              <TableCell width="15%">Ruolo</TableCell>
              <TableCell isCentered width="15%">
                Prezzo di acquisto
              </TableCell>
              <TableCell isCentered width="15%">
                Quotazione
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody isStriped>
            {players
              .sort(function (a, b) {
                return (
                  getMantraRoleWeight[
                    getPlayerFavourableRole(a.role_mantra).toUpperCase()
                  ] -
                  getMantraRoleWeight[
                    getPlayerFavourableRole(b.role_mantra).toUpperCase()
                  ]
                );
              })
              .map((player) => {
                return (
                  <TableRow key={player.id}>
                    <TableCell>
                      <Text isBold>{player.name}</Text>
                    </TableCell>
                    <TableCell isCentered>
                      <Tooltip
                        text={player.team}
                        variant="dark"
                        fontSize="small"
                        followCursor={false}
                        position="top"
                      >
                        <Image
                          src={`/media/teams/${player.team}.png`}
                          css={{ maxHeight: "20px", maxWidth: "20px" }}
                          alt={player.team}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <PlayerRoles
                        gameType="mantra"
                        rolesMantra={player.role_mantra}
                        roleClassic={player.role_classic}
                        size="xsmall"
                      />
                    </TableCell>
                    <TableCell isCentered>
                      <Text isBold>{player.owned_amount}</Text>
                    </TableCell>
                    <TableCell isCentered>{player.quot_m}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}
      {players.length === 0 && (
        <Text>Non hai ancora acquistato nessun giocatore.</Text>
      )}
    </div>
  );
};

const tableStyles = {
  overflowX: "scroll",
  backgroundColor: "red",
  fontSize: "small",
};
