import { css } from "../../../styles/system";
import { Text } from "../../primitives/text/text";
import { FaTag, FaTags } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit2, FiEdit3 } from "react-icons/fi";
import {
  RiFileDownloadLine,
  RiFileUploadLine,
  RiTeamFill,
} from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { BiCoinStack, BiFootball, BiPlus, BiTrash } from "react-icons/bi";
import { MdFileUpload, MdOutlineFileDownload } from "react-icons/md";

import { Flex } from "../../primitives/flex/flex";
import { cloneElement, useEffect, useMemo, useState } from "react";
import { Modal } from "../../primitives/modal/modal";

import { useStore } from "../../../store/store";
import { shallow } from "zustand/shallow";
import { IoMdStats } from "react-icons/io";
import { Table } from "../../primitives/table/table";
import { TableHead } from "../../primitives/table/head";
import { TableRow } from "../../primitives/table/row";
import { TableCell } from "../../primitives/table/cell";
import { Sort } from "../../primitives/sort/sort";
import { TableBody } from "../../primitives/table/body";
import { Tooltip } from "../../primitives/tooltip/tooltip";
import { Image } from "../../primitives/image/image";
import { PlayerRoles } from "../../shared/player/player-roles";
import { CreateTagModal } from "./components/create-tag";
import { UpdateTags } from "./components/update-tags";
import { Button } from "../../primitives/button/button";
import { AddTarget } from "./components/add-target";
import { icons } from "./components/icons";
import { CgNotes } from "react-icons/cg";
import { toast } from "react-toastify";
import { BsCalculator } from "react-icons/bs";
import { GiClick } from "react-icons/gi";
import { PercentageCalculator } from "./components/calc";
import { UploadStrategies } from "./components/upload-strategies";
import {
  calcMaxOffer,
  calcPurchasedPlayersAmount,
  calcRemaingCredits,
} from "../../../utils/users";
import { Pagination } from "../../primitives/pagination/pagination";
import { useTableSort } from "../../../hooks/table-sort";
import { sort } from "../../../utils/arrays";
import { Select } from "../../primitives/select/select";
import { SelectOption } from "../../primitives/select/option";
import { mantraRoles } from "../../../settings/roles";
import { teamsSettings } from "../../../settings/teams/teams";
import { Input } from "../../primitives/input/input";
import { LiaFilterSolid } from "react-icons/lia";
import { TeamModal } from "./components/team";
import { RoleCostDistributionStat } from "../../shared/graphs/role-cost-distribution";
import { PlayerOverview } from "../../shared/player/player-overview";

export const Dashboard = () => {
  const {
    user,
    users,
    players,
    settings,
    magheggi,
    updateTargets,
    updateMagheggi,
  } = useStore(
    (state) => ({
      user: state.user,
      users: state.users,
      players: state.players,
      updatePlayer: state.updatePlayer,
      settings: state.settings,
      setSettings: state.setSettings,
      magheggi: state.magheggi,
      updateTargets: state.updateTargets,
      updateMagheggi: state.updateMagheggi,
    }),
    shallow
  );

  // Get players data
  const purchasedPlayers = players.filter((player) => player.owned === user.id);

  const minPlayersLeft =
    parseInt(settings.min_players) -
    parseInt(calcPurchasedPlayersAmount(purchasedPlayers, user.id));

  const maxPlayersLeft =
    parseInt(settings.max_players) -
    parseInt(calcPurchasedPlayersAmount(purchasedPlayers, user.id));

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
    let filteredPlayers = magheggi.targets
      .filter((pl) => {
        // find player
        const player = players.find(
          (p) => p.id.toString() === pl.id.toString()
        );
        if (player?.id) {
          return true;
        } else {
          return false;
        }
      })
      .map((pl) => {
        // find player
        const player = players.find(
          (p) => p.id.toString() === pl.id.toString()
        );

        if (player) {
          return {
            ...pl,
            ...player,
          };
        }
      });

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
    magheggi.targets,
  ]);

  // Handle modals
  const [isCreateTagModalOpen, setIsCreateTagModalOpen] = useState(false);
  const [isUpdateTagModalOpen, setIsUpdateTagModalOpen] = useState(false);
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);
  const [isTargetEditModalOpen, setIsTargetEditModalOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isUploadStrategiesOpen, setIsUploadStrategiesOpen] = useState(false);
  const [isModuliModalOpen, setIsModuliModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isStatModalOpen, setStatModalOpen] = useState(false);
  const [isPlayerStatsModalOpen, setIsPlayerSatatsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [selectedTarget, setSelectedTarget] = useState(null);

  // Open modal when target is selected
  useEffect(() => {
    selectedTarget && setIsTargetEditModalOpen(true);
  }, [selectedTarget]);

  // Open modal when player is selected
  useEffect(() => {
    selectedPlayer?.id && setIsPlayerSatatsModalOpen(true);
  }, [selectedPlayer]);

  const onCloseTargetEditModalOpen = () => {
    setSelectedTarget(null);
    setIsTargetEditModalOpen(false);
  };

  const onClosePlayerStatsModalOpen = () => {
    console.log("hey");
    setSelectedPlayer(null);
    setIsPlayerSatatsModalOpen(false);
  };

  // Remove target
  const onRemoveTarget = (targetId) => {
    const player = players.find(
      (player) => player.id.toString() === targetId.toString()
    );
    if (
      window.confirm(
        `Sicuro di voler rimuovere ${player.name} dai tuoi obiettivi?`
      )
    ) {
      const filteredTargets = magheggi.targets.filter(
        (el) => el.id.toString() !== targetId.toString()
      );
      const newMagheggi = { ...magheggi, targets: [...filteredTargets] };
      // Update state
      updateTargets(filteredTargets);
      //Update local storage
      localStorage.setItem("magheggi", JSON.stringify(newMagheggi));

      toast.success(`${player.name} rimosso correttamente dagli obiettivi!`);
    }
  };

  // Download strategies
  const onDownloadStrategies = () => {
    // create file in browser
    const strategies = { ...magheggi };
    const fileName = "strategie";
    const json = JSON.stringify(strategies, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  // Upload stragegies
  const onUploadStrategies = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const rawData = e.target.result;
      try {
        const data = JSON.parse(rawData);
        if (!data.targets || !data.tags) {
          setUploadError("File non supportato.");
        } else {
          // Set the file in store and localstorage
          updateMagheggi(data);
          localStorage.setItem("magheggi", JSON.stringify(data));
          toast.success("Strategia importata correttamente!");
          setIsUploadStrategiesOpen(false);
        }
      } catch (error) {
        setUploadError("File non supportato.");
      }
    };
  };

  // define row colors
  const rowColor = (isOwned, notOwnedByUser) => {
    if (isOwned) {
      return {
        backgroundColor: "#a0d7b759 !important",
        "&:hover": {
          backgroundColor: "#50a07159 !important",
        },
      };
    } else if (notOwnedByUser) {
      return {
        filter: "grayscale(100%)",
        backgroundColor: "$grey3 !important",
        "&:hover": {
          backgroundColor: "$grey4 !important",
        },
        "& span": {
          color: "#5559 !important",
        },
        "& div span": {
          color: "$white !important",
        },
      };
    } else {
      return {};
    }
  };

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
      <div className={wrapper()}>
        <Flex css={boxStyle} onClick={() => setIsCreateTagModalOpen(true)}>
          <div className="icon">
            <FaTag size={90} />
          </div>
          <div style={boxInfoWrapper}>
            <Text size="xlarge">Crea tag</Text>
            <Flex css={secondIconWrapper}>
              <AiOutlinePlus size={20} />
            </Flex>
          </div>
        </Flex>
        <Flex css={boxStyle} onClick={() => setIsUpdateTagModalOpen(true)}>
          <div className="icon">
            <FaTags size={90} />
          </div>
          <div style={boxInfoWrapper}>
            <Text size="xlarge">Modifica tags</Text>
            <Flex css={secondIconWrapper}>
              <FiEdit3 size={20} />
            </Flex>
          </div>
        </Flex>
        <Flex css={boxStyle} onClick={() => onDownloadStrategies()}>
          <div className="icon">
            <RiFileDownloadLine size={90} />
          </div>
          <div style={boxInfoWrapper}>
            <Text size="xlarge">Scarica strategie</Text>
            <Flex css={secondIconWrapper}>
              <MdOutlineFileDownload size={20} />
            </Flex>
          </div>
        </Flex>
        <Flex css={boxStyle} onClick={() => setIsUploadStrategiesOpen(true)}>
          <div className="icon">
            <RiFileUploadLine size={90} />
          </div>
          <div style={boxInfoWrapper}>
            <Text size="xlarge">Importa strategie</Text>
            <Flex css={secondIconWrapper}>
              <MdFileUpload size={20} />
            </Flex>
          </div>
        </Flex>
      </div>
      <div className={wrapper()}>
        <Flex css={boxStyle} onClick={() => setIsTeamModalOpen(true)}>
          <div className="icon">
            <RiTeamFill size={90} />
          </div>
          <div style={boxInfoWrapper}>
            <Text size="xlarge">Rosa</Text>
            <Flex css={secondIconWrapper}>
              <AiOutlineEye size={20} />
            </Flex>
          </div>
        </Flex>
        <Flex css={boxStyle} onClick={() => setStatModalOpen(true)}>
          <div className="icon">
            <IoMdStats size={90} />
          </div>
          <div style={boxInfoWrapper}>
            <Text size="xlarge">Statistiche</Text>
            <Flex css={secondIconWrapper}>
              <AiOutlineEye size={20} />
            </Flex>
          </div>
        </Flex>
        <Flex css={boxStyle} onClick={() => setIsModuliModalOpen(true)}>
          <div className="icon">
            <BiFootball size={90} />
          </div>
          <div style={boxInfoWrapper}>
            <Text size="xlarge">Moduli</Text>
            <Flex css={secondIconWrapper}>
              <AiOutlineEye size={20} />
            </Flex>
          </div>
        </Flex>
        <Flex css={boxStyle} onClick={() => setIsCalcOpen(true)}>
          <div className="icon">
            <BsCalculator size={90} />
          </div>
          <div style={boxInfoWrapper}>
            <Text size="xlarge">Calcolatrice</Text>
            <Flex css={secondIconWrapper}>
              <GiClick size={20} />
            </Flex>
          </div>
        </Flex>
      </div>
      <div className={wrapper()}>
        <Flex css={{ ...boxStyle, display: "block" }}>
          <Text size="xlarge" css={{ marginBottom: "10px" }}>
            Metriche
          </Text>
          <Flex css={{ flexWrap: "wrap" }}>
            {settings?.min_players && minPlayersLeft === maxPlayersLeft && (
              <Flex css={metricItem}>
                <Flex>
                  <BiFootball />
                  <Text css={{ marginLeft: "6px" }}>
                    Calciatori acquistabili
                  </Text>
                </Flex>
                <Text isBold>{maxPlayersLeft}</Text>
              </Flex>
            )}
            {settings?.min_players && minPlayersLeft !== maxPlayersLeft && (
              <>
                <Flex css={metricItem}>
                  <Flex>
                    <BiFootball />
                    <Text css={{ marginLeft: "6px" }}>
                      Calciatori acquistabili (min)
                    </Text>
                  </Flex>
                  <Text isBold>{minPlayersLeft < 0 ? 0 : minPlayersLeft}</Text>
                </Flex>
                <Flex css={metricItem}>
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
            <Flex css={metricItem}>
              <Flex>
                <BiCoinStack />
                <Text css={{ marginLeft: "6px" }}>Crediti rimanenti</Text>
              </Flex>
              <Text isBold>
                {calcRemaingCredits(settings.budget, players, user.id)}
              </Text>
            </Flex>
            <Flex css={metricItem}>
              <Flex>
                <BiCoinStack />
                <Text css={{ marginLeft: "6px" }}>Massima offerta</Text>
              </Flex>
              <Text isBold>{calcMaxOffer(settings, players, user.id)}</Text>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <div className={wrapper()}>
        <Flex
          css={{
            ...tableWrapper,
            width: "100%",
            overflow: "scroll",
          }}
        >
          <div>
            <Text size="xlarge" css={{ marginBottom: "20px" }}>
              Obiettivi
            </Text>
            <div>
              <Text
                css={{ fontSize: "18px", color: "grey", marginBottom: "10px" }}
              >
                FILTRI
              </Text>
              <Flex
                css={{
                  marginBottom: "10px",
                  alignItems: "inherit",
                  "@bp2max": {
                    display: "block",
                  },
                }}
              >
                <div style={{ marginRight: "20px" }}>
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
            <Button
              color="black"
              css={{ marginBottom: "15px" }}
              onClick={() => setIsTargetModalOpen(true)}
            >
              <BiPlus color="white" />
              <Text color="white" css={{ marginLeft: "5px" }}>
                Aggiungi obiettivo
              </Text>
            </Button>
            <Flex css={{ display: "block" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width="220px">
                      <Sort
                        direction={sortState.direction}
                        isActive={sortState.sort === "name"}
                        onClick={() => handleSort("name")}
                      >
                        Nome
                      </Sort>
                    </TableCell>
                    <TableCell isCentered width="75px">
                      Squadra
                    </TableCell>
                    <TableCell width="75px">Ruolo</TableCell>
                    <TableCell isCentered width="75px">
                      <Sort
                        direction={sortState.direction}
                        isActive={sortState.sort === "fascia"}
                        onClick={() => handleSort("fascia")}
                      >
                        Fascia
                      </Sort>
                    </TableCell>
                    <TableCell isCentered width="100px">
                      <Sort
                        direction={sortState.direction}
                        isActive={sortState.sort === "p_max"}
                        onClick={() => handleSort("p_max")}
                      >
                        P. massimo
                      </Sort>
                    </TableCell>
                    <TableCell width="170px">Tags</TableCell>
                    <TableCell isCentered width="55px">
                      Note
                    </TableCell>
                    <TableCell width="55px" css={{ textAlign: "end" }}>
                      Azioni
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody isStriped>
                  {filteredPlayers.map((player) => {
                    const owner = users.find(
                      (user) => user.id === player?.owned
                    );
                    const isOnwed = player.owned === user.id;
                    if (player) {
                      return (
                        <TableRow
                          key={player.id}
                          css={rowColor(isOnwed, !!player.owned)}
                        >
                          <TableCell padding="small">
                            <Flex onClick={() => setSelectedPlayer(player)}>
                              <Text isBold={owner?.id ? false : true} css={{'&:hover': {color: '$blue1'}}}>
                                {player.name}
                              </Text>
                            </Flex>
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
                          <TableCell
                            isCentered
                            padding="small"
                            css={{ padding: 0 }}
                          >
                            {player.fascia && (
                              <Tooltip
                                text={`${player.fascia} fascia`}
                                variant="dark"
                                fontSize="xsmall"
                                followCursor={false}
                                position="top"
                              >
                                <div
                                  className={fasciaStyle({
                                    color: player.fascia,
                                  })}
                                >
                                  <Text color="white">{player.fascia}</Text>
                                </div>
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell isCentered padding="small">
                            {player.p_max && <Text>{player.p_max}%</Text>}
                          </TableCell>
                          <TableCell isCentered padding="small">
                            <Flex>
                              {player.tags.map((tagId) => {
                                const tag = magheggi.tags.find(
                                  (tag) => tag.id === tagId
                                );
                                if (tag) {
                                  return (
                                    <Flex css={{ marginRight: "5px" }}>
                                      <Tooltip
                                        text={tag.name}
                                        variant="dark"
                                        fontSize="small"
                                        followCursor={false}
                                        position="top"
                                      >
                                        <Flex
                                          css={{
                                            backgroundColor: tag.bg,
                                            width: "30px",
                                            height: "30px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: "$pill",
                                          }}
                                        >
                                          {cloneElement(
                                            icons.find(
                                              (loopIcons) =>
                                                loopIcons.value === tag.icon
                                            ).component,
                                            { color: tag.color, size: 18 }
                                          )}
                                        </Flex>
                                      </Tooltip>
                                    </Flex>
                                  );
                                }
                              })}
                            </Flex>
                          </TableCell>
                          <TableCell isCentered padding="small">
                            {player.notes && (
                              <Tooltip
                                text={player.notes.replaceAll("\n", "<br />")}
                                variant="dark"
                                fontSize="small"
                                followCursor={false}
                                position="top"
                              >
                                <div className={actionWrapper()}>
                                  <CgNotes color="black" />
                                </div>
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell padding="small">
                            <Flex
                              css={{
                                justifyContent: "flex-end",
                                gap: "0px 5px",
                              }}
                            >
                              <Tooltip
                                text="Modifica obiettivo"
                                variant="dark"
                                fontSize="small"
                                followCursor={false}
                                position="top"
                              >
                                <div
                                  className={actionWrapper()}
                                  onClick={() => setSelectedTarget(player)}
                                >
                                  <FiEdit2 color="black" />
                                </div>
                              </Tooltip>
                              <Tooltip
                                text="Elimina obiettivo"
                                variant="dark"
                                fontSize="small"
                                followCursor={false}
                                position="top"
                              >
                                <div
                                  className={actionWrapper()}
                                  onClick={() => onRemoveTarget(player.id)}
                                >
                                  <BiTrash color="black" />
                                </div>
                              </Tooltip>
                            </Flex>
                          </TableCell>
                        </TableRow>
                      );
                    }
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
              {magheggi?.targets.length === 0 && (
                <Text css={{ marginTop: "20px" }}>
                  Non hai ancora inserito un obiettivo.
                </Text>
              )}
            </Flex>
          </div>
        </Flex>
      </div>
      <Modal isOpen={isCreateTagModalOpen} setIsOpen={setIsCreateTagModalOpen}>
        <div className={modalWrapper()}>
          <CreateTagModal />
        </div>
      </Modal>
      <Modal isOpen={isUpdateTagModalOpen} setIsOpen={setIsUpdateTagModalOpen}>
        <div className={modalWrapper()}>
          <UpdateTags />
        </div>
      </Modal>
      <Modal isOpen={isTargetModalOpen} setIsOpen={setIsTargetModalOpen}>
        <div className={modalWrapper()}>
          <AddTarget />
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
      <Modal isOpen={isCalcOpen} setIsOpen={setIsCalcOpen}>
        <div className={modalWrapper({ size: "small" })}>
          <PercentageCalculator budget={settings.budget} />
        </div>
      </Modal>
      <Modal
        isOpen={isUploadStrategiesOpen}
        setIsOpen={setIsUploadStrategiesOpen}
      >
        <div className={modalWrapper({ size: "small" })}>
          <UploadStrategies onImport={onUploadStrategies} error={uploadError} />
        </div>
      </Modal>
      <Modal isOpen={isTeamModalOpen} setIsOpen={setIsTeamModalOpen}>
        <div className={modalWrapper({ size: "small" })}>
          <TeamModal
            players={players.filter((player) => player.owned === user.id)}
          />
        </div>
      </Modal>
      <Modal isOpen={isModuliModalOpen} setIsOpen={setIsModuliModalOpen}>
        <Image
          src={`/media/general/moduli.jpeg`}
          css={{ maxHeight: "95vh", maxWidth: "90vw" }}
          alt="Moduli"
        />
      </Modal>
      <Modal isOpen={isStatModalOpen} setIsOpen={setStatModalOpen}>
        <div className={modalWrapper({ size: "small" })}>
          <Flex css={{ height: "500px", width: "100%" }}>
            <RoleCostDistributionStat
              settings={settings}
              players={players.filter((player) => player.owned === user.id)}
            />
          </Flex>
        </div>
      </Modal>
      <Modal
        isOpen={isPlayerStatsModalOpen}
        setIsOpen={onClosePlayerStatsModalOpen}
      >
        <div className={modalWrapper()}>
          <PlayerOverview player={selectedPlayer} settings={settings} />
        </div>
      </Modal>
    </>
  );
};

const wrapper = css({
  display: "flex",
  alignItems: "center",
  gap: "30px 30px",
  flexWrap: "wrap",
  padding: "0 40px",
  height: "max-content",
  overflowX: 'scroll',
  "&:not(:first-child)": {
    marginTop: "30px",
  },
  "@bp2max": {
    marginTop: "0px",
    padding: "0px",
    gap: "20px 0px",
    minHeight: "inherit",
  },
});

const boxStyle = {
  backgroundColor: "$white",
  borderRadius: "$3",
  padding: "$4",
  minWidth: "200px",
  cursor: "pointer",
  "@bp2max": {
    width: "100%",
  },
  position: "relative",
  borderLeft: "4px solid $green1",
  height: "100%",
  overflow: "hidden",
  "& svg": {},
  "& .icon": {
    position: "absolute",
    bottom: "-25px",
    right: "-15px",

    "& svg": {
      transition: "all .2s",
      color: "#0000001f",
    },
  },
  "&:hover": {
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",

    "& .icon": {
      "& svg": {
        width: "110px",
        height: "110px",
      },
    },
  },
};

const tableWrapper = {
  backgroundColor: "$white",
  borderRadius: "$3",
  padding: "$4",
  cursor: "pointer",
  "@bp2max": {
    width: "100%",
  },
  "&:hover": {
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  },
};

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

const boxInfoWrapper = {
  width: "100%",
};
const secondIconWrapper = {
  justifyContent: "end",
  marginTop: "20px",
  "@bp2max": {
    width: "100%",
  },
};

const fasciaStyle = css({
  color: "$white",
  fontSize: "500",
  borderRadius: "$2",
  padding: "$2 $4",
  width: "100%",
  variants: {
    color: {
      1: {
        backgroundColor: "$red1",
      },
      2: {
        backgroundColor: "$orange1",
      },
      3: {
        backgroundColor: "$yellow3",
      },
      4: {
        backgroundColor: "$green2",
      },
      5: {
        backgroundColor: "$blue1",
      },
      6: {
        backgroundColor: "$grey5",
      },
    },
  },
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

const metricItem = {
  minWidth: "250px",
  padding: "8px",
  borderRadius: "$2",
  backgroundColor: "$grey2",
  justifyContent: "space-between",
  "&:not(:last-child)": {
    marginRight: "$3",
  },
  "@bp2max": {
    width: "100%",
    marginTop: "10px",
  },
};
