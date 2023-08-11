import React, { ReactNode, useState } from "react";

import { css } from "../../../styles/system";
import { Text } from "../text/text";

interface Props {
  children?: ReactNode;
  /** Tooltip text */
  text?: string | ReactNode;
  /** Position of the tooltip relative to the element*/
  position?: "top" | "bottom" | "left" | "right";
  /** Mode */
  variant?: "light" | "dark";
  /** Size */
  size?: "small" | "medium" | "big";
  /** Font size */
  fontSize?: "default" | "xsmall" | "small" | "medium";
  /** tooltip width */
  width?: string;
  /** boolean to determine if tooltip should follow cursor  */
  followCursor?: boolean;
  /** Pass in if you want less padding around the text */
  lessPadding?: boolean;
  /** for not having a pointer cursor */
  noPointer?: boolean;
  /** Set role */
  role?: string;
  /** Whether or not the tooltip is active or not */
  active?: boolean;
  /** Set wether the wrapper has display flex */
  isDisplayFlex?: boolean;
}

export const Tooltip = ({
  active = true,
  children,
  text,
  position,
  size,
  fontSize,
  variant,
  width = "auto",
  followCursor = true,
  lessPadding,
  noPointer,
  role,
  isDisplayFlex = true,
}: Props) => {
  const [positionCords, setPositionCords] = useState({
    clientX: 0,
    clientY: 0,
  });

  const handleMouseEnter = ({ clientX, clientY }) => {
    setPositionCords({ clientX, clientY });
  };

  const customStyles = followCursor
    ? {
        bottom: window.innerHeight - (positionCords.clientY - 23),
        left: positionCords.clientX,
      }
    : {};

  if (!active) {
    return <>{children}</>;
  }

  return (
    <div
      className={container({ css: { width }, noPointer })}
      onMouseMove={handleMouseEnter}
      role={role || "tooltip"}
    >
      <div className={styles({ isDisplayFlex })}>{children}</div>
      {text && (
        <div
          className={wrapper({
            position,
            size,
            fontSize,
            variant,
            followCursor,
            css: customStyles,
          })}
        >
          <div className={content({ lessPadding })} dangerouslySetInnerHTML={{__html: text}}>
          </div>
        </div>
      )}
    </div>
  );
};

const container = css({
  position: "relative",
  display: "inline-block",
  height: "100%",
  cursor: "pointer",
  "&:hover": {
    "div:nth-child(2)": {
      display: "block",
    },
  },
  variants: {
    noPointer: {
      true: {
        cursor: "default",
      },
    },
  },
});

const styles = css({
  position: "relative",
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  variants: {
    isDisplayFlex: {
      true: {
        display: "flex",
      },
    },
  },
});

const wrapper = css({
  display: "none",
  width: "max-content",
  zIndex: 1000,
  position: "absolute",
  borderRadius: "2px",
  "&:after": {
    content: "",
    width: 0,
    height: 0,
    border: "5px solid transparent",
    borderWidth: "5px",
    position: "absolute",
  },

  variants: {
    followCursor: {
      true: {
        position: "fixed",
        transform: "translateX(-50%)",

        "&:after": {
          top: "100%",
          left: "50%",
          borderTopColor: "$white",
          marginLeft: "-$10",
        },
      },
    },
    variant: {
      light: {
        backgroundColor: "$white",
        color: "$grey",
        boxShadow: "0 5px 10px $colors$grey2",
      },
      dark: {
        backgroundColor: "$black",
        color: "$white",
      },
    },
    fontSize: {
      default: {
        fontSize: "16px",
      },
      xsmall: {
        fontSize: "12px",
      },
      small: {
        fontSize: "small",
      },
      medium: {
        fontSize: "18px",
      },
    },
    size: {
      small: {
        maxWidth: "100px",
      },
      medium: {
        maxWidth: "300px",
      },
      big: {
        maxWidth: "500px",
      },
    },
    position: {
      top: {
        left: "50%",
        bottom: "130%",
        transform: "translateX(-50%)",
        "&:after": {
          top: "100%",
          left: "calc(50% - 5px)",
          borderTopColor: "$white",
        },
      },
      bottom: {
        left: "50%",
        top: "140%",
        transform: "translateX(-50%)",
        "&:after": {
          bottom: "100%",
          left: "calc(50% - 5px)",
          borderBottomColor: "$white",
        },
      },
      left: {
        top: "50%",
        right: "115%",
        transform: "translateY(-50%)",
        "&:after": {
          left: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          borderLeftColor: "$white",
        },
      },
      right: {
        top: "50%",
        left: "130%",
        transform: "translateY(-50%)",
        "&:after": {
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          borderRightColor: "$white",
        },
      },
    },
  },

  defaultVariants: {
    position: "bottom",
    size: "medium",
    fontSize: "default",
    variant: "light",
  },

  compoundVariants: [
    {
      variant: "dark",
      position: "top",
      css: {
        "&:after": {
          borderTopColor: "$black",
        },
      },
    },
    {
      variant: "dark",
      position: "bottom",
      css: {
        "&:after": {
          borderBottomColor: "$black",
        },
      },
    },
    {
      variant: "dark",
      position: "left",
      css: {
        "&:after": {
          borderLeftColor: "$black",
        },
      },
    },
    {
      variant: "dark",
      position: "right",
      css: {
        "&:after": {
          borderRightColor: "$black",
        },
      },
    },
  ],
});

const content = css({
  padding: "$3 $4",
  textAlign: "left",
  flex: "1 1 auto",
  lineHeight: "1.5em",
  variants: {
    lessPadding: {
      true: {
        padding: "4px $2",
      },
    },
  },
});
