import { css } from "../../../../styles/system";
import { Flex } from "../../../primitives/flex/flex";
import { icons } from "./icons";

export const IconPicker = ({ value, onChange }) => {
  return (
    <Flex css={iconPicker}>
      {icons.map((icon) => (
        <div
          className={iconWrapper({ isActive: value === icon.value })}
          key={icon.value}
          onClick={() => onChange(icon.value)}
        >
          {icon.component}
        </div>
      ))}
    </Flex>
  );
};

const iconPicker = {
  width: "400px",
  height: "300px",
  overflowY: "scroll",
  flexWrap: "wrap",
  borderRadius: "$1",
  "@bp2max": {
    width: 'inherit',
    marginBottom: '30px'
  },
  "& svg": {
    width: "50px",
    height: "50px",
  },
  boxShadow:
    "rgba(0, 0, 0, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.15) 0px 8px 16px",
};

const iconWrapper = css({
  padding: "$2",
  margin: "$2",
  borderRadius: "$2",
  cursor: "pointer",
  variants: {
    isActive: {
      true: {
        backgroundColor: "#4cb34c82",
      },
      false: {
        "&:hover": {
          backgroundColor: "$grey3",
        },
      },
    },
  },
});
