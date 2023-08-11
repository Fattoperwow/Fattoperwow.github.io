import React, { ReactNode, MouseEvent } from "react";

import { css } from "../../../styles/system";

interface Props {
  children?: ReactNode;
  /** Set whether the element has space to the right */
  hasSpaceRight?: boolean;
  /** Set whether the element has space to the top */
  hasSpaceTop?: boolean;
  /** Set the button color */
  color?:
    | "blue"
    | "red"
    | "white"
    | "pink"
    | "grey"
    | "orange"
    | "lightGrey"
    | "green"
    | "black";
  /** Set the button type */
  type?: "button" | "submit";
  /** Set whether the button is inlined */
  isInline?: boolean;
  /** Set the disabled state */
  isDisabled?: boolean;
  /** Set a tooltip if the button is disabled */
  disabledHint?: string;
  /** Attach an onClick event handler */
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
  /** Add custom css. Use with restraint though */
  css?: any;
  /** Role for tests */
  role?: string;
}

export const Button = ({
  type = "button",
  onClick,
  variant,
  color,
  error,
  isInline,
  isSuccess,
  isError,
  isDisabled,
  disabledHint,
  hasSpaceRight,
  hasSpaceTop,
  isAuthorized = true,
  authorizedHint = "general.no_access",
  children,
  css,
  role,
}: Props) => {
  return (
    <button
      type={type}
      role={role}
      onClick={onClick}
      className={styles({
        color,
        isInline,
        isDisabled,
        hasSpaceRight,
        hasSpaceTop,
        css,
      })}
      disabled={isDisabled || !isAuthorized}
    >
      {children}
    </button>
  );
};

export const styles = css({
  display: "inline-flex",
  alignItems: "center",
  padding: "0 $4 0 $4",
  height: "$6",
  borderRadius: "$2",
  fontFamily: "$normal",
  fontSize: "$3",
  border: "none",
  color: "white",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "none",
  },
  variants: {
    color: {
      black: {
        background: "$black",
        color: 'white !important',
        border: "1px solid $darkBlack",
        "&:hover": {
          background: "$darkBlack",
        },
      },
      blue: {
        background: "$blue1",
        border: "1px solid $blue1",
        "&:hover": {
          background: "$blue2",
          border: "1px solid $blue2",
        },
      },
      whiteBlue: {
        background: "$white1",
        color: "black",
        border: "1px solid $grey4",
        "&:hover": {
          background: "$grey2",
        },
      },
      pink: {
        background: "$pink1",
        border: "1px solid $pink1",
        "&:hover": {
          background: "$blue2",
          border: "1px solid $blue2",
        },
      },
      red: {
        background: "$red1",
        border: "1px solid $red2",
        "&:hover": {
          background: "$red1",
        },
      },
      white: {
        background: "$white1",
        color: "black",
        border: "1px solid $grey4",
        "&:hover": {
          background: "$grey2",
        },
      },
      grey: {
        background: "$grey3",
        border: "1px solid $grey5",
        color: "black",
        "&:hover": {
          background: "$grey4",
        },
      },
      lightGrey: {
        background: "$grey2",
        border: "1px solid $grey3",
        color: "black",
        "&:hover": {
          background: "$grey3",
        },
      },
      orange: {
        background: "$orange1",
        border: "1px solid $orange2",
        color: "white",
        "&:hover": {
          background: "$orange2",
        },
      },
      green: {
        background: "$green2",
        border: "1px solid $green1",
        color: "white",
        "&:hover": {
          background: "$green1",
        },
      },
    },
    hasSpaceRight: {
      true: {
        marginRight: "$2",
      },
    },
    hasSpaceTop: {
      true: {
        marginTop: "$4",
      },
    },
    isInline: {
      true: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
    isDisabled: {
      true: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
    isAuthorized: {
      false: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
    isError: {
      true: {
        border: "1px solid $red1",
        background: "$red1",
        opacity: 1,
        "&:hover": {
          border: "1px solid $red1",
          background: "$red1",
        },
      },
    },
  },
});
