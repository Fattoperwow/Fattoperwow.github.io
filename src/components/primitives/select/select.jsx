import React, { ReactElement, ChangeEvent, FocusEvent } from "react";

import { FaSort } from "react-icons/fa";

import { Label } from "../label/label";

import { css } from "../../../styles/system";

interface Props {
  children?: ReactElement[] | ReactElement;
  /** Set the placehnameolder of the element */
  name?: string;
  /** Set the value of the element */
  value?: string | number;
  /** Set the id of the element */
  id?: string;
  /** Set the label of the element */
  label?: string;
  /** Set whether the element is disabled */
  isDisabled?: boolean;
  /** Set whether the element has space to the bottom */
  hasSpaceBottom?: boolean;
  /** Set whether the element has space to the top */
  hasSpaceTop?: boolean;
  /** Set the size of the element */
  size?: "xsmall" | "small" | "medium" | "large" | "full";
  /** Set the onChange handler */
  onChange?: (
    event?: ChangeEvent<HTMLSelectElement>
  ) => Promise<void | boolean> | void;
  /** Set the onClick handler */
  onClick?: (e: any) => Promise<void | boolean> | void;
  /** Set the onMouseDown+ handler */
  onMouseDown?: (e: any) => Promise<void | boolean> | void;
  /** Set the onBlur handler */
  onBlur?: (
    event?: FocusEvent<HTMLSelectElement>
  ) => Promise<void | boolean> | void;
  /** Set role */
  role?: string;
  /** Set if label has colon disabled*/
  colonIsDisabled?: boolean;
  /** Define wether the element has ellipsis */
  hasEllipsis?: boolean;
  /** Set custom css */
  css?: any;
}

export const Select = ({
  children,
  onChange,
  onClick,
  onMouseDown,
  onBlur,
  id,
  name,
  value,
  label,
  isDisabled,
  hasSpaceBottom,
  hasSpaceTop,
  size,
  role,
  colonIsDisabled,
  hasEllipsis,
  css,
}: Props) => {
  return (
    <>
      {label && (
        <Label htmlFor={id} colonIsDisabled={colonIsDisabled}>
          {label}
        </Label>
      )}
      <div className={flexWrapper({ hasSpaceBottom, hasSpaceTop })}>
        <div className={wrapper()({ size })}>
          <select
            className={styles({ hasEllipsis, css })}
            id={id}
            name={name}
            onChange={onChange}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onBlur={onBlur}
            disabled={isDisabled}
            value={value}
            role={role}
          >
            {children}
          </select>
          <span className={sort()}>
            <FaSort />
          </span>
        </div>
      </div>
    </>
  );
};

const flexWrapper = css({
  display: "flex",
  alignItems: "center",
  variants: {
    hasSpaceBottom: {
      true: {
        marginBottom: "$4",
      },
    },
    hasSpaceTop: {
      true: {
        marginTop: "$4",
      },
    },
  },
});

const wrapper = () =>
  css({
    color: "$grey6",
    position: "relative",
    display: "flex",
    width: "100%",
    variants: {
      size: {
        xsmall: {
          width: "100px",
        },
        small: {
          width: "200px",
        },
        medium: {
          width: "300px",
        },
        large: {
          width: "400px",
        },
        full: {
          width: "100%",
        },
        hasHelpIcon: { true: {} },
      },
    },
  });

const styles = css({
  height: "$6",
  appearance: "none",
  padding: "$1 $3",
  background: "white",
  border: "1px solid $grey4",
  borderRadius: "$1",
  fontSize: "$3",
  outline: "none",
  fontFamily: "$normal",
  color: "$grey6",
  width: "100%",
  position: "relative",
  display: "flex",
  transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s",
  backgroundImage: "none !important",
  cursor: "pointer",
  "&:focus": {
    borderColor: "$blue1",
  },
  "&:disabled": {
    border: "1px solid $grey4",
    background: "$grey2",
  },
  variants: {
    hasLabelBox: {
      true: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
    hasEllipsis: {
      true: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
  },
});

const sort = css({
  position: 'absolute',
    right: '2px',
    top: '24%'
})
