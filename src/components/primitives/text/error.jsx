import React, { ReactNode } from "react";
import { BiMessageRoundedError } from "react-icons/bi";

import { css } from "../../../styles/system";
import { Text } from "./text";
import { Flex } from "../flex/flex";

interface Props {
  children?: ReactNode;
  css?: any;
}

export const ErrorMessage = ({ children }: Props) => {
  return (
    <Flex
      css={{
        backgroundColor: "rgb(255,0,0, 0.3)",
        maxWidth: "100%",
        marginTop: '$4',
        padding: "$3 $4",
        borderRadius: "$3",
        ...css,
      }}
    >
      <Flex css={{ marginRight: "8px" }}>
        <BiMessageRoundedError color="#d43f3a" />
      </Flex>
      <Text color="red">{children}</Text>
    </Flex>
  );
};
