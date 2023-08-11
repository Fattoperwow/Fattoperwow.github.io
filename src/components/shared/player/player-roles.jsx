import React from "react";

import { css } from "../../../styles/system";
import { Flex } from "../../primitives/flex/flex";
import { Text } from "../../primitives/text/text";

interface Props {
  gameType: "classic" | "mantra";
  rolesMantra: string;
  roleClassic: string;
  size: "xsmall" | "small" | "medium" | "large";
  isSelectable?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export const PlayerRoles = ({
  gameType,
  rolesMantra,
  roleClassic,
  size,
  isSelectable,
  value,
  onChange,
}: Props) => {
  const mantraRoles = rolesMantra.split(";");

  const onSetValue = (selectedValue) => {
    // if Value exist already we remove it, otherwise we add it
    if (value?.includes(selectedValue)) {
      // Remove
      onChange([...value?.filter((v) => v !== selectedValue)]);
    } else {
      onChange([...value, selectedValue]);
    }
  };
  return (
    <Flex>
      {gameType === "classic" ? (
        <div className={roleStyle({ size, role: roleClassic.toLowerCase() })}>
          <Text color="white">{roleClassic}</Text>
        </div>
      ) : (
        mantraRoles.map((role) => {
          return (
            <div
              key={role}
              className={roleStyle({
                size,
                role: role.toLowerCase(),
                isSelectable,
                isSelectedSelectable: isSelectable && value?.includes(role),
                isUnSelectedSelectable: isSelectable && !value?.includes(role),
              })}
              onClick={() => onSetValue(role)}
            >
              <Text color="white">{role}</Text>
            </div>
          );
        })
      )}
    </Flex>
  );
};

const roleStyle = css({
  borderRadius: "$pill",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "$white",
  "&:not(:last-child)": {
    marginRight: "4px",
  },
  variants: {
    size: {
      xsmall: {
        width: "20px",
        height: "20px",
        "& span": {
          fontSize: "11px !important",
        },
      },
      small: {
        width: "25px",
        height: "25px",
        "& span": {
          fontSize: "12px !important",
        },
      },
      medium: {
        width: "32px",
        height: "32px",
        "& span": {
          fontSize: "16px !important",
        },
      },
    },
    role: {
      p: {
        backgroundColor: "$yellow3",
      },
      d: {
        backgroundColor: "$green1",
      },
      c: {
        backgroundColor: "$blue1",
      },
      a: {
        backgroundColor: "$red1",
      },
      por: {
        backgroundColor: "$yellow3",
      },
      dd: {
        backgroundColor: "$green1",
      },
      ds: {
        backgroundColor: "$green1",
      },
      dc: {
        backgroundColor: "$green1",
      },
      e: {
        backgroundColor: "$blue1",
      },
      m: {
        backgroundColor: "$blue1",
      },
      w: {
        backgroundColor: "$violet1",
      },
      t: {
        backgroundColor: "$violet1",
      },
      pc: {
        backgroundColor: "$red1",
      },
    },
    isSelectable: {
      true: {
        borderRadius: "$2",
        cursor: "pointer",
        "&:hover": {
          opacity: "0.9",
        },
        "&:active": {
          opacity: "1",
        },
      },
    },
    isSelectedSelectable: {
      true: {
        opacity: "0.8",
      },
    },
    isUnSelectedSelectable: {
      true: {
        opacity: "0.3",
      },
    },
  },
});
