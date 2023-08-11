import { css } from "../../../styles/system";

// Hooks
import { Modal } from "./modal";
import { Text } from "../text/text";
import { Flex } from "../flex/flex";
import { Button } from "../button/button";
import { BiError } from "react-icons/bi";

export const ErrorModal = ({
  isOpen,
  setIsOpen,
  title,
  description,
  callToActionName,
  onClick,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={modalWrapper()}>
        <Flex
          css={{
            width: "100%",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
          <div>
            <BiError color="red" size={30} />
          </div>
        </Flex>
        <Text size="xlarge" center css={{ marginBottom: "10px" }}>
          {title}
        </Text>
        {description && <Text center>{description}</Text>}
        {callToActionName && (
          <Flex
            css={{
              width: "100%",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <Button color="white">Annulla</Button>
            <Button color="blue" onClick={onClick}>
              {callToActionName}
            </Button>
          </Flex>
        )}
      </div>
    </Modal>
  );
};

const modalWrapper = css({
  width: "40vw",
  maxHeight: "84vh",
  height: "ingerit",
  overflowY: "scroll",
  backgroundColor: "$white",
  borderRadius: "$2",
  padding: "$5",
  "@bp2max": {
    width: "85vw",
  },
});
