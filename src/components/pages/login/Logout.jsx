import { css } from "../../../styles/system";
import { Text } from "../../primitives/text/text";
import { Modal } from "../../primitives/modal/modal";
import { Button } from "../../primitives/button/button";
import { modalCommonStyles } from "../../../styles/global";
import { useNavigate } from "react-router-dom";

// Icon
import { IoMdLogOut } from "react-icons/io";

import { Flex } from "../../primitives/flex/flex";

export const Logout = ({ isOpen, setIsOpen }) => {
  // History hook
  const navigate = useNavigate();

  // on logout
  const onLogout = () => {
    localStorage.removeItem("fantauser");
    navigate("/login");
  };

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={modalSizes()}>
          <Flex css={{ marginBottom: "20px" }}>
            <Flex css={{ marginRight: "10px" }}>
              <IoMdLogOut size="30" />
            </Flex>
            <Text size="xlarge">Logout</Text>
          </Flex>
          <Text css={{ marginBottom: "20px" }}>
            Sei sicuro di voler effettuare il logout?
          </Text>
          <Flex css={{ width: "100%", justifyContent: "space-between" }}>
            <Button color="black" hasSpaceTop onClick={onLogout}>
              Logout
            </Button>
            <Button
              color="white"
              hasSpaceTop
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Annulla
            </Button>
          </Flex>
        </div>
      </Modal>
    </>
  );
};

const modalSizes = css({
  width: "20vw",
  ...modalCommonStyles(),
});
