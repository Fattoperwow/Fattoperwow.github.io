import React, { ReactNode } from "react";

import { css } from "../../../styles/system";

export interface CellProps {
  children?: ReactNode;
  /** Set the width of the cell */
  width?: string;
  /** Set the minWidth of the cell */
  minWidth?: string;
  /**Set padding */
  padding?: "default" | "unset" | "small";
  /** Set wheher the cell has an ellipsis */
  hasEllipsis?: boolean;
  /** Pass some custom css in */
  css?: any;
  /** Set role */
  role?: string;
  /** defines wether the content is centered */
  isCentered?: boolean;
}

export const TableCell = ({
  children,
  width,
  minWidth,
  hasEllipsis,
  css,
  role,
  padding = "default",
  isCentered,
}: CellProps) => {
  if (hasEllipsis) {
    return (
      <td
        className={styles(width, minWidth)({ css, padding, isCentered })}
        role={role}
      >
        <span className={ellipsisOverflow()}>{children}</span>
      </td>
    );
  }

  return (
    <td
      className={styles(width, minWidth)({ css, padding, isCentered })}
    >
      {children}
    </td>
  );
};

const styles = (width?: string, minWidth?: string) =>
  css({
    width,
    minWidth,
    variants: {
      padding: {
        default: {
          padding: "$3",
          "&:first-of-type": {
            paddingLeft: "$4",
          },
          "&:last-of-type": {
            paddingRight: "$4",
          },
        },
        unset: {
          padding: "unset",
        },
        small: {
          padding: "$2",
          "&:first-of-type": {
            paddingLeft: "$3",
          },
          "&:last-of-type": {
            paddingRight: "$3",
          },
        },
      },
      isCentered: {
        true: {
          textAlign: "center",
        },
      },
      paddingType: {
        true: {
          textAlign: "center",
        },
      },
    },
  });

const ellipsisOverflow = css({
  display: "block",
  width: "100%",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
});
