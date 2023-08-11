import React, { ReactNode } from "react";

import { css } from "../../../styles/system";

export interface RowProps {
  children?: ReactNode;
  /** Set the onClick handler of the row */
  onClick?: () => void;
  /** Role for testing purposes */
  role?: string;
  /** Custom css */
  css?: any;
  /** Has darker grey background color */
  hasGreyBackground?: boolean;
}

export const TableRow = ({
  children,
  onClick,
  role,
  css,
  hasGreyBackground,
}: RowProps) => {
  return (
    <tr
      role={role}
      className={styles({ isClickable: !!onClick, css, hasGreyBackground })}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

const styles = css({
  position: "relative",
  "&:not(:first-child)": {
    borderTop: "1px solid $grey3",
  },
  variants: {
    isDragging: {
      true: {
        zIndex: 1,
        background: "$grey1",
        boxShadow: "0 10px 10px $grey3",
      },
    },
    isClickable: {
      true: {
        cursor: "pointer",
      },
    },
    hasGreyBackground: {
      true: {
        backgroundColor: "$grey1",
      },
    },
  },
});
