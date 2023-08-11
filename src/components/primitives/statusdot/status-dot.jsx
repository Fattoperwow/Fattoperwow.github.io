import React from "react";

import { css } from "../../../styles/system";

interface Props {
  size?: "xsmall" | "small" | "medium" | "large";
  isActive?: boolean;
  css?: any;
  hasSpaceLeft?: boolean;
  hasSpaceRight?: boolean
}

export const StatusDot = ({ isActive, size, hasSpaceLeft, hasSpaceRight, css }: Props) => {
  return (
    <span>
      <div
        className={styles({
          size,
          isActive,
          hasSpaceLeft,
          hasSpaceRight,
          css,
        })}
      ></div>
    </span>
  );
};

const styles = css({
  borderRadius: "$pill",
  variants: {
    isActive: {
      true: { backgroundColor: "$green2" },
      false: { backgroundColor: "$grey6" },
    },
    size: {
      xsmall: {
        width: "$1",
        height: "$1",
      },
      small: {
        width: "$2",
        height: "$2",
      },
      medium: {
        width: "$4",
        height: "$4",
      },
    },
    hasSpaceLeft: {
      true: {
        marginLeft: "$2",
      },
    },
    hasSpaceRight: {
      true: {
        marginRight: "$3",
      },
    },
  },
});
