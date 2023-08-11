import React, {  useState } from "react";

import { WarningMessage } from "../../../primitives/text/warning";
import { Button } from "../../../primitives/button/button";
import { Modal } from "../../../primitives/modal/modal";
import { Input } from "../../../primitives/input/input";
import { Text } from "../../../primitives/text/text";
import { ErrorMessage } from "../../../primitives/text/error";
import { css } from "../../../../styles/system";
import { modalCommonStyles } from "../../../../styles/global";
import { Loader } from "../../../primitives/loader/loader";
import { updateUser } from "../../../../requests/users";
import { useStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";

export const UserUnregistered = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    // Set store
    const { setUser } = useStore(
      (state) => ({ setUser: state.setUser }),
      shallow
    );

  const onUpdateUser = async () => {
    // Validation
    setError("");
    if (!password) {
      setError("Inserisci la password prima di procedere");
      return;
    }
    setIsLoading(true);
    const newData = {...user, password: password, is_registered: true}
    const response = await updateUser(newData, user.id);
    if (response.status === 200) {
        setUser(newData);
        localStorage.setItem("fantauser", JSON.stringify(newData));
        setTimeout(()=>{
          setIsModalOpen(false)
        }, 500)
    }
    setIsLoading(false);
  }

  return (
    <>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        {isLoading && <Loader />}
        <div className={modalSizes()}>
          <Text size="xlarge" css={{ marginBottom: "20px" }}>
            Crea password
          </Text>
          <Input
            label="Password"
            size="full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hasSpaceBottom
            placeholder="La tua password"
            description="Non esiste ancora un sistema di recuper password. Non usare una password sensibile, dato che è visibile in chiaro nel DB."
          />
          {error && (
            <ErrorMessage>{error}</ErrorMessage>
          )}
          <Button color="black" onClick={onUpdateUser} hasSpaceTop>
            Salva la tua password
          </Button>
        </div>
      </Modal>
      <WarningMessage>
        Non sei attualmente registrato. Crea la tua password!
        <Button color="black" css={{ marginLeft: "15px" }} onClick={()=> setIsModalOpen(true)}>
          Registrati
        </Button>
      </WarningMessage>
    </>
  );
};

const modalSizes = css({
  width: "40vw",
  ...modalCommonStyles(),
});
