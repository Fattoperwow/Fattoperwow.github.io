import { css } from "../../../../styles/system";
import { useEffect, useState } from "react";
import { StatusDot } from "../../../primitives/statusdot/status-dot";
import { Text } from "../../../primitives/text/text";
import { Flex } from "../../../primitives/flex/flex";

import {
  createUser,
  getUsers,
  updateUser,
  updateUsers,
} from "../../../../requests/users";

import { useHandleResponse } from "../../../../hooks/response/response";
import { Loader } from "../../../primitives/loader/loader";
import { ErrorMessage } from "../../../primitives/text/error";
import { UserSettings } from "./user";

// icons
import { FaPlus } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { Button } from "../../../primitives/button/button";
import { Modal } from "../../../primitives/modal/modal";
import { modalCommonStyles } from "../../../../styles/global";
import { Input } from "../../../primitives/input/input";
import uuid from "react-uuid";
import { shallow } from "zustand/shallow";
import { useStore } from "../../../../store/store";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";
import { ErrorModal } from "../../../primitives/modal/error-modal";

export const UsersSettings = () => {
  // Starting setting
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserKey, setSelectedUserKey] = useState(uuid()); // Set store

  const {
    user: loggedUser,
    players,
    setUser,
    users,
    setUsers,
  } = useStore(
    (state) => ({
      user: state.user,
      users: state.users,
      players: state.players,
      setUser: state.setUser,
      setUsers: state.setUsers,
    }),
    shallow
  );

  const [isLoading, setIsLoading] = useState(false);
  // Response handling
  const { isError } = useHandleResponse();

  const onSelectUser = (id) => {
    const user = users.find((user) => user.id === id);
    setSelectedUser(user);
    setSelectedUserKey(uuid());
  };

  // Create new user
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [createUserUsername, setCreateUserUsername] = useState("");
  const [createUserTeam, setCreateUserTeam] = useState("");
  const [createUSerrErrorMessage, setCreateUSerrErrorMessage] = useState("");
  const onCreateUser = async () => {
    // Validation
    if (!createUserUsername || !createUserTeam) {
      setCreateUSerrErrorMessage("Compila tutti i campi prima di procedere.");
      toast.error("Compila tutti i campi prima di procedere.");
      return;
    }
    setCreateUSerrErrorMessage("");
    setIsLoading(true);
    const response = await createUser(
      createUserUsername,
      "",
      createUserTeam,
      false
    );
    if (response.status === 200) {
      setUsers([...users, response.data]);
      toast.success(`Utente ${createUserUsername} creato con successo!`);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 500);
    } else {
      setCreateUSerrErrorMessage(response.error);
      toast.error(response.error);
    }
    setIsLoading(false);
  };

  // Update user
  const [updateError, setUpdateError] = useState("");
  const onUpdateUser = async (userData) => {
    // Validation
    setUpdateError("");
    if (!userData.username || !userData.team_name) {
      setUpdateError("Compila tutti i campi prima di procedere");
      toast.error("Compila tutti i campi prima di procedere.");
      return;
    }
    if (
      userData.id === loggedUser.id &&
      loggedUser.role === "admin" &&
      userData.role !== "admin"
    ) {
      setUpdateError("Non puoi effettuare il downgrade da admin");
      toast.error("Non puoi effettuare il downgrade da admin");
      return;
    }
    setIsLoading(true);
    const response = await updateUser(userData, userData.id);
    if (response.status === 200) {
      // Update user array
      const newUsers = users.map((user) =>
        user.id === userData.id ? { ...user, ...userData } : user
      );
      setUsers([...newUsers]);
      // If is admin itself, update
      if (userData.id === loggedUser.id) {
        setUser(userData);
        localStorage.setItem("fantauser", JSON.stringify(userData));
      }
      toast.success(`${userData.username} modificato correttamente!`);
    } else {
      toast.error(response.error);
    }
    setIsLoading(false);
  };

  const onDeleteUser = async (id) => {
    const user = users.find((user) => user.id === id);

    // Find out if user has players
    const purchasedPlayers = players.filter((player) => player.owned === id);
    if (purchasedPlayers.length > 0) {
      setIsErrorModalOpen(true);
      return;
    }
    if (window.confirm(`Sei sicuro di voler eliminare ${user.username}?`)) {
      setIsLoading(true);
      const newData = users.filter((user) => user.id !== id);
      // Transform it into an objects
      const newDataObject = newData.reduce((a, v) => ({ ...a, [v.id]: v }), {});
      const response = await updateUsers(newDataObject);
      if (response.status === 200) {
        setUsers([...newData]);
        toast.success(`${user.username} eliminato correttamente`);
        setSelectedUser(null);
      } else {
        toast.error(response.error);
      }
      setIsLoading(false);
    }
  };

  const onResetUsers = async () => {
    // Get all the users that are not admin
    const usersToBeRemoved = users.filter((user) => user.role !== "admin");
    const usersIds = usersToBeRemoved.map((user) => user.id);

    // Find out if users have players
    const purchasedPlayers = players.filter((player) =>
      usersIds.includes(player.owned)
    );

    if (purchasedPlayers.length > 0) {
      setIsErrorModalOpen(true);
      return;
    }
    if (window.confirm(`Sei sicuro di voler resettare gli utenti non admin?`)) {
      setIsLoading(true);
      const newData = users.filter((user) => user.role === "admin");
      // Transform it into an objects
      const newDataObject = newData.reduce((a, v) => ({ ...a, [v.id]: v }), {});
      const response = await updateUsers(newDataObject);
      if (response.status === 200) {
        setUsers([...newData]);
        toast.success(`Utenti resettati correttamente`);
        setSelectedUser(null);
      } else {
        toast.error(response.error);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={IsModalOpen} setIsOpen={setIsModalOpen}>
        <div className={modalSizes()}>
          <Text size="xlarge" css={{ marginBottom: "20px" }}>
            Crea utente
          </Text>
          <Input
            label="Nome squadra"
            size="full"
            value={createUserTeam}
            onChange={(e) => setCreateUserTeam(e.target.value)}
            hasSpaceBottom
            placeholder="Il nome della squadra"
          />
          <Input
            label="Username"
            size="full"
            value={createUserUsername}
            onChange={(e) => setCreateUserUsername(e.target.value)}
            hasSpaceBottom
            placeholder="L'username che utilizzera' per accedere"
            description="Usa il suo nome o il suo soprannome, verra' utilizzato dalla lega per identificarlo. Ex: Giorgio"
          />
          {createUSerrErrorMessage && (
            <ErrorMessage>{createUSerrErrorMessage}</ErrorMessage>
          )}
          <Button color="black" onClick={onCreateUser} hasSpaceTop>
            Crea utente
          </Button>
        </div>
      </Modal>
      <ErrorModal
        isOpen={isErrorModalOpen}
        setIsOpen={setIsErrorModalOpen}
        title="Impossibile eliminare utente"
        description="L'utente ha dei calciatori assegnati. Svincola i calciatori a lui assegnati prima di procedere."
      />
      <div className={wrapper()}>
        {isLoading && <Loader />}
        {isError && (
          <ErrorMessage>
            Si sono verificati dei problemi nel reperimento dei dati.
          </ErrorMessage>
        )}
        {!isError && (
          <>
            <div className={userList()}>
              <Button
                color="black"
                css={{ width: "100%", marginBottom: "10px", height: "40px" }}
                onClick={() => setIsModalOpen(true)}
              >
                <Flex css={{ marginRight: "8px" }}>
                  <FaPlus color="white" />
                </Flex>
                Crea utente
              </Button>

              <Button
                color="red"
                css={{ width: "100%", marginBottom: "30px", height: "40px" }}
                onClick={() => onResetUsers()}
              >
                <Flex css={{ marginRight: "8px" }}>
                  <CiCircleRemove size={20} color="white" />
                </Flex>
                Resetta utenti
              </Button>
              {users.map((user) => {
                return (
                  <div
                    className={userListItem({
                      isActive: user.id === selectedUser?.id,
                    })}
                    onClick={() => onSelectUser(user.id)}
                    key={user.id}
                  >
                    <Flex>
                      <StatusDot
                        isActive={user.is_registered}
                        size="medium"
                        hasSpaceRight
                      />
                      <Text size="medium">{user.username}</Text>
                      <Text
                        css={{ fontSize: "12px", marginLeft: "6px" }}
                        color="grey"
                      >
                        ({user.team_name})
                      </Text>
                    </Flex>
                    <Flex
                      css={trashStyle}
                      onClick={(e) => onDeleteUser(user.id)}
                    >
                      <TbTrash size={20} />
                    </Flex>
                  </div>
                );
              })}
            </div>
            <div className={userDetails()}>
              {selectedUser && (
                <>
                  <Flex css={{width: '100%', justifyContent: 'center'}}>
                    <Flex
                      css={{
                        backgroundColor: "$grey2",
                        borderRadius: "$4",
                        padding: "$4 $6",
                        flexDirection: 'column'
                      }}
                    >
                      <Text size="xlarge" css={{marginBottom: '6px'}}>
                        {selectedUser.username}
                      </Text>
                      <Text>
                        {selectedUser.team_name}
                      </Text>
                    </Flex>
                  </Flex>
                  <UserSettings
                    user={selectedUser}
                    key={selectedUserKey}
                    onSubmit={onUpdateUser}
                    error={updateError}
                    hasAdminAuth={loggedUser.role === "admin"}
                  />
                </>
              )}
              {!selectedUser && <Text size="large">Seleziona un utente.</Text>}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const wrapper = css({
  display: "flex",
  marginTop: "20px",
  height: "100%",
  position: "relative",
  "@bp2max": {
    display: "block",
  },
});

const userList = css({
  width: "30%",
  borderRight: "1px solid $grey6",
  overflowY: "scroll",
  padding: "0 $4 0 0",
  "@bp2max": {
    borderRight: "none",
    borderBottom: "1px solid $grey6",
    marginBottom: "20px",
    width: "100%",
  },
});

const userDetails = css({
  width: "70%",
  height: "100%",
  padding: "$2 $5",
  "@bp2max": {
    width: "inherit",
  },
});

const userListItem = css({
  height: "50px",
  backgroundColor: "$grey2",
  marginBottom: "$4",
  borderRadius: "$2",
  padding: "$1 $4",
  "&:hover": {
    backgroundColor: "$grey3",
    cursor: "pointer",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  variants: {
    isActive: {
      true: {
        backgroundColor: "$grey3",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      },
    },
  },
});

const modalSizes = css({
  width: "40vw",
  ...modalCommonStyles(),
});

const trashStyle = {
  width: "40px",
  height: "40px",
  minWidth: "40px",
  minHeight: "40px",
  justifyContent: "center",

  borderRadius: "$pill",
  "&:hover": {
    backgroundColor: "$grey4",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    "& svg": {
      color: "$red1",
    },
  },
};
