import React, { ReactNode } from "react";
import { ImWarning } from "react-icons/im";

import { css } from "../../../styles/system";
import { Text } from "./text";
import { Flex } from "../flex/flex";

interface Props {
  children?: ReactNode;
  css?: any;
}

export const WarningMessage = ({ children }: Props) => {
  return (
    <Flex
      css={{
        backgroundColor: "rgb(255,255,0, 0.3)",
        maxWidth: "100%",
        marginTop: '$4',
        padding: "$3 $4",
        borderRadius: "$3",
        ...css,
      }}
    >
      <Flex css={{ marginRight: "8px" }}>
        <ImWarning color="#f3b818" />
      </Flex>
      <Text color="yellow">{children}</Text>
    </Flex>
  );
};
