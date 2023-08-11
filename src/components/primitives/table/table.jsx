import React, { ReactNode } from "react";
import { Loader } from "../loader/loader";

import { css } from "../../../styles/system";

interface Props {
  children?: ReactNode;
  /** Set whether the element has space to the top */
  hasSpaceTop?: boolean;
  /** Set whether the element has space to the bottom */
  hasSpaceBottom?: boolean;
  /** Set whether the element the css rule table-layout: fixed */
  noTableLayoutFixed?: boolean;
  /** when it is Loading between page changes; show loader and blur out background */
  isLoading?: boolean;
  /** Set role */
  role?: string;
  /** Add custom css */
  css?: any;
}

export const Table = ({
  children,
  css,
  hasSpaceTop,
  hasSpaceBottom,
  noTableLayoutFixed,
  isLoading,
  role,
}: Props) => {
  return (
    <>
      {isLoading && <Loader />}
      <table
        className={styles({
          hasSpaceTop,
          hasSpaceBottom,
          noTableLayoutFixed,
          isLoading,
          css,
        })}
        role={role || "table"}
      >
        {children}
      </table>
    </>
  );
};

const styles = css({
  fontFamily: "$normal",
  borderCollapse: "collapse",
  tableLayout: "fixed",
  display: "table",
  borderSpacing: 0,
  width: "100%",
  maxWidth: "100%",
  mt: "$2",
  mb: "$4",
  variants: {
    hasSpaceTop: {
      true: {
        marginTop: "$2",
      },
    },
    hasSpaceBottom: {
      true: {
        marginBottom: "$4",
      },
    },
    noTableLayoutFixed: {
      true: {
        tableLayout: "unset",
      },
    },
    isLoading: {
      true: {
        opacity: 0.6,
      },
    },
  },
});
