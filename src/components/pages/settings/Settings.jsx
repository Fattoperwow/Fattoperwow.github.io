import { css } from "../../../styles/system";
import { Tabs } from "../../primitives/tabs/tabs";
import { TabContent } from "../../primitives/tabs/tab-content";
import { useState } from "react";
import { UserSettings } from "./components/user";
import { UsersSettings } from "./components/users";
import { useStore } from "../../../store/store";
import { shallow } from "zustand/shallow";
import { updateUser } from "../../../requests/users";
import { Loader } from "../../primitives/loader/loader";
import { UserUnregistered } from "./components/user-unregistered";
import { GeneralSettings } from "./components/general-settings";
import { PlayersSettings } from "./components/players-settings";
import { toast } from "react-toastify";

export const Settings = () => {
  // General state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Set store
  const { user, setUser } = useStore(
    (state) => ({ user: state.user, setUser: state.setUser }),
    shallow
  );

  // Set tabs
  const [currentTab, setCurrentTab] = useState("user");

  // Define tabs
  const tabs = [
    {
      label: "Il mio profilo",
      id: "user",
    },
  ];
  if (user?.role === "admin") {
    tabs.push({
      label: "Impotazione utenti",
      id: "users",
    });
    tabs.push({
      label: "Impostazioni generali di gioco",
      id: "general_settings",
    });
    tabs.push({
      label: "Gestione calciatori",
      id: "players_settings",
    });
  }

  // Update user
  const onUpdateUser = async (newData, id) => {
    // Validation
    setError("");
    if (!newData.username || !newData.team_name) {
      setError("Compila tutti i campi prima di procedere");
      toast.error("Compila tutti i campi prima di procedere");
      return;
    }
    if (
      user.role === "admin" &&
      newData.role !== "admin"
    ) {
      setError("Non puoi effettuare il downgrade da admin");
      toast.error("Non puoi effettuare il downgrade da admin");
      return;
    }
    setIsLoading(true);
    const response = await updateUser(newData, id);
    if (response.status === 200) {
      if (id === user.id) {
        setUser(newData);
        localStorage.setItem("fantauser", JSON.stringify(newData));
        toast.success("Profilo modificato correttamente");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={wrapper()}>
      {isLoading && <Loader />}
      <div className={settingsWrapper()}>
        <Tabs
          items={tabs}
          selectedTabId={currentTab}
          onTabChange={setCurrentTab}
        >
          <TabContent isActive={currentTab === "user"}>
            <div className={mt()}>
              {!user.is_registered && <UserUnregistered user={user} />}
              <UserSettings
                user={user}
                avatarWidth={340}
                onSubmit={onUpdateUser}
                error={error}
              />
            </div>
          </TabContent>
          <TabContent isActive={currentTab === "general_settings"}>
            <GeneralSettings />
          </TabContent>
          <TabContent isActive={currentTab === "users"}>
            <UsersSettings />
          </TabContent>
          <TabContent isActive={currentTab === "players_settings"}>
            <PlayersSettings />
          </TabContent>
        </Tabs>
      </div>
    </div>
  );
};

const wrapper = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "$5",
});

const settingsWrapper = css({
  backgroundColor: "$white",
  width: "90vw",
  borderRadius: "$3",
  padding: "$5",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
});

const mt = css({
  marginTop: "$4",
});
