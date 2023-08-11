import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { css } from "../../../styles/system";
import { Input } from "./input";
export const AunctionInput = ({ value, onChange, css, max }) => {

  const onChangeValue = (value) => {
    onChange(parseInt(value) || 0);
  }

  return (
    <div className={wrapper({})}>
      <div
        className={amountHandler({ position: "left" })}
        onClick={() => onChangeValue(value - 1)}
      >
        <AiOutlineMinus size={20} />
      </div>
      <Input
        value={value}
        onChange={(e)=> onChangeValue(e.target.value)}
        css={{ width: "50px" }}
        type="number"
        max={max}
        min={0}
      />
      <div
        className={amountHandler({ position: "right" })}
        onClick={() => onChangeValue(value + 1)}
      >
        <AiOutlinePlus size={20} />
      </div>
    </div>
  );
};

const wrapper = css({
  display: "flex",
  alignItems: "center",
});

const amountHandler = css({
  height: "40px",
  display: "flex",
  width: "40px",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "$grey2",
  border: "1px solid $grey4",
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: "$grey3",
  },
  '&:active': {
    backgroundColor: "$grey4",
  },
  variants: {
    position: {
      left: {
        borderRight: "none",
      },
      right: {
        borderLeft: "none",
      },
    },
  },
});
