import { css } from "../../../styles/system";
import { Text } from "../../primitives/text/text";
import { Modal } from "../../primitives/modal/modal";
import { Input } from "../../primitives/input/input";
import { Button } from "../../primitives/button/button";
import { modalCommonStyles } from "../../../styles/global";
import { useState } from "react";
import { createUser } from "../../../requests/users";
import { Loader } from "../../primitives/loader/loader";

// Icon
import { TiTick } from "react-icons/ti";

import { useHandleResponse } from "../../../hooks/response/response";
import { ErrorMessage } from "../../primitives/text/error";

export const CreateAccount = ({ isOpen, setIsOpen }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [teamName, setTeamName] = useState("");

  // Loader & op states
  const [isLoading, setisloading] = useState(false);
  const [error, setError] = useState("");

  // Response handling
  const { isSuccess, isError, handleResponse } = useHandleResponse();

  const onSubmit = async () => {
    // Validation
    setError(false);
    if (!userName || !password || !teamName) {
      setError("Completa tutti i campi prima di procedere.");
      return;
    }
    setisloading(true);
    const response = await createUser(userName, password, teamName);
    handleResponse(response);
    setisloading(false);
    if (isError) {
      setError("Qualcosa non ha funzionato. Riprova!");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={modalSizes()}>
          <Text size="xlarge" css={{ marginBottom: "20px" }}>
            Crea account
          </Text>
          {!isSuccess && (
            <>
              <Input
                label="Nome squadra"
                size="full"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                hasSpaceBottom
                placeholder="Fai il simpaticone ihih"
              />
              <Input
                label="Username"
                size="full"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                hasSpaceBottom
                placeholder="Il tuo username, che utilizzerai per effettuare il login"
                description="Usa il tuo nome o il tuo soprannome, verra' utilizzato dalla lega per identificarti. Ex: Giorgio"
              />
              <Input
                label="Password"
                type="password"
                size="full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="La tua password"
                description="Non esiste ancora un sistema di recuper password. Non usare una password sensibile, dato che è visibile in chiaro nel DB."
              />
              {error && (
                <ErrorMessage>
                  {error}
                </ErrorMessage>
              )}
              <Button color="black" onClick={onSubmit} hasSpaceTop>
                Crea account
              </Button>
            </>
          )}
          {isSuccess && (
            <Text size="large" css={{ marginTop: "10px" }}>
              <TiTick color="green" /> Account creato con successo. Ora puoi effrettuare il login!
            </Text>
          )}
        </div>
      </Modal>
    </>
  );
};

const modalSizes = css({
  width: "40vw",
  ...modalCommonStyles(),
});
