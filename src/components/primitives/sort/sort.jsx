import React, { MouseEvent, ReactNode } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

import { Flex } from "../flex/flex";

interface Props {
  /** Set the sort direction */
  direction: string;
  /** Set the onMouseDown handler */
  onClick: (
    event?: MouseEvent<HTMLDivElement>
  ) => Promise<void | boolean> | void;
  /** Set whether the sort is active */
  isActive: boolean;
  /** Eventually set children */
  children?: ReactNode;
}

export const Sort = ({ direction, onClick, isActive, children }: Props) => {
  return (
    <Flex onClick={onClick} role="sort" css={pointer}>
      <Flex css={styles}>
        <Flex css={{ marginBottom: "-$1" }}>
          <div
            style={{
              "& svg": {
                height: "$4",
              },
            }}
          >
            <FaCaretUp
              color={direction === "asc" && isActive ? "white" : "grey"}
            />
          </div>
        </Flex>
        <Flex css={{ marginTop: "-$1" }}>
          <div
            style={{
              "& svg": {
                height: "$4",
              },
            }}
          >
            <FaCaretDown
              color={direction === "desc" && isActive ? "white" : "grey"}
            />
          </div>
        </Flex>
      </Flex>
      {children && (
        <Flex>
          {children}
        </Flex>
      )}
    </Flex>
  );
};

const styles = {
  flexDirection: "column",
  opacity: "70%",
  marginRight: "$3",
  "&:hover": {
    opacity: "100%",
  },
};

const pointer = {
  userSelect: "none",
  "&:hover": {
    cursor: "pointer",
  },
};
