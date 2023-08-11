import { css } from "../../../styles/system";

import { Modal } from "../../primitives/modal/modal";
import { Table } from "../../primitives/table/table";
import { TableHead } from "../../primitives/table/head";
import { TableBody } from "../../primitives/table/body";
import { TableRow } from "../../primitives/table/row";
import { TableCell } from "../../primitives/table/cell";
import { Image } from "../../primitives/image/image";
import { PlayerRoles } from "../../shared/player/player-roles";
import { Text } from "../../primitives/text/text";
import { Tooltip } from "../../primitives/tooltip/tooltip";
import { IoIosStats, IoMdStats } from "react-icons/io";
import { LiaFilterSolid } from "react-icons/lia";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Flex } from "../../primitives/flex/flex";
import { useEffect, useMemo, useState } from "react";
import { PlayerOverview } from "../../shared/player/player-overview";
import { Pagination } from "../../primitives/pagination/pagination";
import { Select } from "../../primitives/select/select";
import { SelectOption } from "../../primitives/select/option";
import { Input } from "../../primitives/input/input";
import { teamsSettings } from "../../../settings/teams/teams";
import { mantraRoles } from "../../../settings/roles";
import { currentSeason } from "../../../settings/season";
import { Button } from "../../primitives/button/button";
import { Sort } from "../../primitives/sort/sort";
import { useTableSort } from "../../../hooks/table-sort";
import { sort } from "../../../utils/arrays";
import { useStore } from "../../../store/store";
import { shallow } from "zustand/shallow";
import { AddTarget } from "../dashboard/components/add-target";

export const Players = () => {
  // getStore
  const { players, users, magheggi } = useStore(
    (state) => ({
      players: state.players,
      users: state.users,
      magheggi: state.magheggi,
    }),
    shallow
  );
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);
  const [isTargetEditModalOpen, setIsTargetEditModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [selectedTarget, setSelectedTarget] = useState();
  const [selectedTargetId, setSelectedTargetId] = useState(null);

  useEffect(() => {
    selectedTarget && setIsTargetEditModalOpen(true);
  }, [selectedTarget]);

  useEffect(() => {
    selectedTargetId && setIsTargetModalOpen(true);
  }, [selectedTargetId]);

  const onCloseTargetEditModalOpen = () => {
    setSelectedTarget(null);
    setIsTargetEditModalOpen(false);
  };

  const onCloseTargetModalOpen = () => {
    setSelectedTargetId(null);
    setIsTargetModalOpen(false);
  };

  // Filters
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [propertyCondition, setPropertyCondition] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const { sortState, handleSort } = useTableSort({});

  // Filter players
  const { filteredPlayers, unpagedAmount } = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    let filteredPlayers = players;

    // Filter for search
    filteredPlayers = filteredPlayers.filter((player) => {
      return player.name.toLowerCase()?.includes(search.toLowerCase());
    });

    // Filter for team
    if (selectedTeam) {
      filteredPlayers = filteredPlayers.filter((player) => {
        return player.team === selectedTeam;
      });
    }

    // Filter for property condition
    if (propertyCondition) {
      filteredPlayers = filteredPlayers.filter((player) => {
        return propertyCondition === "owned"
          ? player.owned !== ""
          : player.owned === "";
      });
    }

    // Filter for roles
    if (selectedRoles.length > 0) {
      filteredPlayers = filteredPlayers.filter((player) => {
        return player.role_mantra
          .split(";")
          .some((ai) => selectedRoles?.includes(ai));
      });
    }

    // Sort
    if (sortState.sort && sortState.direction) {
      sort(filteredPlayers, sortState.direction, sortState.sort);
    }

    // Here I count before the pagination happens the unpaged amount
    const unpagedAmount = filteredPlayers.length;

    // filter for page size
    filteredPlayers = filteredPlayers.slice(firstPageIndex, lastPageIndex);
    return { filteredPlayers, unpagedAmount };
  }, [
    currentPage,
    pageSize,
    search,
    selectedTeam,
    propertyCondition,
    selectedRoles,
    sortState,
  ]);

  // Reset filters
  const resetFilters = () => {
    setSearch("");
    setSelectedTeam("");
    setPropertyCondition("");
    setCurrentPage(1);
    setSelectedRoles([]);
  };


  return (
    <>
      <Modal isOpen={isPlayerModalOpen} setIsOpen={setIsPlayerModalOpen}>
        <div className={playerStatsModalWrapper()}>
          <PlayerOverview
            player={players.find((player) => player.id === selectedPlayer)}
            settings={{ gameType: "mantra" }}
          />
        </div>
      </Modal>
      <Modal isOpen={isTargetModalOpen} setIsOpen={onCloseTargetModalOpen}>
        <div className={modalWrapper()}>
          <AddTarget editPlayerId={selectedTargetId} />
        </div>
      </Modal>
      <Modal
        isOpen={isTargetEditModalOpen}
        setIsOpen={onCloseTargetEditModalOpen}
      >
        <div className={modalWrapper()}>
          <AddTarget
            isEdit
            editPlayerId={selectedTarget?.id}
            editSelectedFascia={selectedTarget?.fascia}
            editNotes={selectedTarget?.notes}
            editPMax={selectedTarget?.p_max}
            editTags={selectedTarget?.tags}
          />
        </div>
      </Modal>
      <div className={wrapper()}>
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
              "@bp2max": {
                display: "none",
              },
            }}
          >
            <IoIosStats size={30} />
          </Flex>
          <Text size="xlarge">Statistiche calciatori</Text>
        </Flex>
        <div>
          <Text css={{ fontSize: "18px", color: "grey", marginBottom: "10px" }}>
            FILTRI
          </Text>
          <div>
            <Input
              label="Cerca"
              placeholder="Cerca per nome..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              size="small"
              hasSpaceBottom
            />
          </div>
          <Flex
            css={{
              marginBottom: "20px",
              "@bp2max": {
                display: "block",
              },
            }}
          >
            <div style={{ marginRight: "20px" }}>
              <Select
                value={selectedTeam}
                label="Squadra"
                onChange={(e) => {
                  setSelectedTeam(e.target.value);
                  setCurrentPage(1);
                }}
                size="small"
              >
                <SelectOption value={""}>Tutte</SelectOption>
                {teamsSettings.map((team) => {
                  return (
                    <SelectOption key={team.name} value={team.name}>
                      {team.name}
                    </SelectOption>
                  );
                })}
              </Select>
            </div>
            <div>
              <Select
                value={propertyCondition}
                label="Condizione di propieta'"
                onChange={(e) => {
                  setPropertyCondition(e.target.value);
                  setCurrentPage(1);
                }}
                size="small"
              >
                <SelectOption value={""}>Tutti</SelectOption>
                <SelectOption value={"free"}>Svincolati</SelectOption>
                <SelectOption value={"owned"}>Acquistati</SelectOption>
              </Select>
            </div>
          </Flex>
          <Flex
            css={{
              marginBottom: "20px",
              justifyContent: "space-between",
              "@bp2max": {
                display: "block",
              },
            }}
          >
            <div>
              <Text isBold css={{ marginBottom: "5px" }}>
                Ruolo:
              </Text>
              <PlayerRoles
                rolesMantra={mantraRoles.join(";")}
                settings={{ gameType: "mantra" }}
                size="medium"
                isSelectable
                value={selectedRoles}
                onChange={(value) => {
                  setSelectedRoles(value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Flex css={{ alignItems: "end" }}>
              <div>
                <Select
                  value={pageSize}
                  label={"Lunghezza lista"}
                  onChange={(e) => {
                    setPageSize(e.target.value);
                    setCurrentPage(1);
                  }}
                  size="small"
                >
                  <SelectOption value={3}>3</SelectOption>
                  <SelectOption value={5}>5</SelectOption>
                  <SelectOption value={10}>10</SelectOption>
                  <SelectOption value={15}>15</SelectOption>
                  <SelectOption value={20}>20</SelectOption>
                  <SelectOption value={30}>30</SelectOption>
                  <SelectOption value={50}>50</SelectOption>
                </Select>
              </div>
              <Button
                color="white"
                css={{ marginLeft: "20px" }}
                onClick={resetFilters}
              >
                <Flex css={{ marginRight: "8px" }}>
                  <LiaFilterSolid />
                </Flex>
                Resetta filtri
              </Button>
            </Flex>
          </Flex>
        </div>
        <div>
          <Table css={{ overflowX: "scroll" }}>
            <TableHead>
              <TableRow>
                <TableCell minWidth="200px">
                  <Sort
                    direction={sortState.direction}
                    isActive={sortState.sort === "name"}
                    onClick={() => handleSort("name")}
                  >
                    Nome
                  </Sort>
                </TableCell>
                <TableCell isCentered width="8%">
                  <Sort
                    direction={sortState.direction}
                    isActive={sortState.sort === "team"}
                    onClick={() => handleSort("team")}
                  >
                    Squadra
                  </Sort>
                </TableCell>
                <TableCell width="15%">Ruolo</TableCell>
                <TableCell isCentered width="8%">
                  <Tooltip
                    text="Media della stagione corrente"
                    variant="dark"
                    fontSize="xsmall"
                    followCursor={false}
                    position="top"
                  >
                    Media
                  </Tooltip>
                </TableCell>
                <TableCell isCentered width="8%">
                  <Tooltip
                    text="Fantamedia della stagione corrente"
                    variant="dark"
                    fontSize="xsmall"
                    followCursor={false}
                    position="top"
                  >
                    Fantamedia
                  </Tooltip>
                </TableCell>
                <TableCell isCentered width="8%">
                  <Sort
                    direction={sortState.direction}
                    isActive={sortState.sort === "quot_m"}
                    onClick={() => handleSort("quot_m")}
                  >
                    Quotazione
                  </Sort>
                </TableCell>
                <TableCell isCentered width="8%">
                  Proprietario
                </TableCell>
                <TableCell width="8%"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody isStriped>
              {filteredPlayers.map((player) => {
                const owner = users.find((user) => user.id === player.owned);
                const magheggio = magheggi.targets?.find(
                  (target) => target.id.toString() === player.id.toString()
                );
                return (
                  <TableRow key={player.id}>
                    <TableCell padding="small">
                      <Text isBold={owner?.id ? false : true}>
                        {player.name}
                      </Text>
                    </TableCell>
                    <TableCell isCentered padding="small">
                      <Tooltip
                        text={player.team}
                        variant="dark"
                        fontSize="small"
                        followCursor={false}
                        position="top"
                      >
                        <Image
                          src={`/media/teams/${player.team}.png`}
                          css={{ maxHeight: "22px", maxWidth: "22px" }}
                          alt={player.team}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell padding="small">
                      <PlayerRoles
                        gameType="mantra"
                        rolesMantra={player.role_mantra}
                        roleClassic={player.role_classic}
                        size="small"
                      />
                    </TableCell>
                    <TableCell isCentered padding="small">
                      <Text size="small">
                        {player.stats[currentSeason]?.mv || "-"}
                      </Text>
                    </TableCell>
                    <TableCell isCentered padding="small">
                      <Text size="small">
                        {player.stats[currentSeason]?.mfv || "-"}
                      </Text>
                    </TableCell>
                    <TableCell isCentered padding="small">
                      <Text size="small">{player.quot_m}</Text>
                    </TableCell>
                    <TableCell isCentered padding="small">
                      <Text size="small">
                        {owner ? (
                          <span className={tag()}>{owner.username}</span>
                        ) : (
                          "-"
                        )}
                      </Text>
                    </TableCell>
                    <TableCell padding="small">
                      <Flex
                        css={{ justifyContent: "flex-end", gap: "0px 5px" }}
                      >
                        <Flex
                          onClick={() =>
                            magheggio
                              ? setSelectedTarget(magheggio)
                              : setSelectedTargetId(player.id || null)
                          }
                        >
                          <Tooltip
                            text="Gestisci magheggi"
                            variant="dark"
                            fontSize="small"
                            followCursor={false}
                            position="top"
                          >
                            <div className={actionWrapper()}>
                              {magheggio ? (
                                <AiFillStar color="orange" />
                              ) : (
                                <AiOutlineStar color="black" />
                              )}
                            </div>
                          </Tooltip>
                        </Flex>
                        <Flex css={{ marginLeft: "5px", marginRight: "5px" }}>
                          <Tooltip
                            text="Guarda statistiche"
                            variant="dark"
                            fontSize="small"
                            followCursor={false}
                            position="top"
                          >
                            <div
                              className={actionWrapper()}
                              onClick={() => {
                                setIsPlayerModalOpen(true);
                                setSelectedPlayer(player.id);
                              }}
                            >
                              <IoMdStats color="black" />
                            </div>
                          </Tooltip>
                        </Flex>
                      </Flex>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={unpagedAmount}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
          {filteredPlayers.length === 0 && (
            <Text>Nessun calciatore soddisfa i tuoi criteri di ricerca.</Text>
          )}
        </div>
      </div>
    </>
  );
};

const wrapper = css({
  backgroundColor: "$white",
  borderRadius: "$3",
  padding: "$5",
  boxShadow: `rgba(0, 0, 0, 0.55) 0px 5px 15px`,
});

const actionWrapper = css({
  width: "35px",
  height: "35px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "$pill",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "$grey3",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
  },
});

const playerStatsModalWrapper = css({
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

const tag = css({
  backgroundColor: "$grey3",
  padding: "2px 6px",
  borderRadius: "$2",
});

const modalWrapper = css({
  width: "92vw",
  maxHeight: "84vh",
  height: "ingerit",
  overflowY: "scroll",
  backgroundColor: "$white",
  borderRadius: "$2",
  padding: "$4",
  "@bp2max": {
    width: "85vw",
  },
  variants: {
    size: {
      small: {
        width: "40vw",
        "@bp2max": {
          width: "85vw",
        },
      },
    },
  },
});
