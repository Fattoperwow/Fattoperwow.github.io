import React, {
  KeyboardEvent,
  MouseEvent,
  ChangeEvent,
  FocusEvent,
} from "react";
import { css } from "../../../styles/system";
import { Label } from "../label/label";
import { Flex } from "../flex/flex";
import { Text } from "../text/text";

interface Props {
  /** Set the ID of the element */
  id?: string;
  /** Set the input type */
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  /** Set the name of the element */
  name?: string;
  /** Set the value of the element */
  value?: string | number;
  /** Set the default value of the element */
  defaultValue?: string | number;
  /** Set whether the element is optional */
  optional?: boolean;
  /** Set the label of the element */
  label?: string;
  /** Set the placeholder of the element */
  placeholder?: string;
  /** Set whether the element is disabled */
  isDisabled?: boolean;
  /** Set whether the element is visible */
  isVisible?: boolean;
  /** Attach an icon to the right of the input element */
  icon?: IconType;
  /** Set whether to auto focus */
  autoFocus?: boolean;
  /** Set whether the element has space to the bottom */
  hasSpaceBottom?: boolean;
  /** Set whether the element has space to the top */
  hasSpaceTop?: boolean;
  /** Set whether the element has space to the left */
  hasSpaceLeft?: boolean;
  /** Set whether to render the element inline */
  isInline?: boolean;
  /** Set the size of the element */
  size?: "xs" | "xsmall" | "small" | "medium" | "large" | "full";
  /** Set the onChange handler */
  onChange?: (
    event?: ChangeEvent<HTMLInputElement>
  ) => Promise<void | boolean> | void;
  /** Set the onBlur handler */
  onBlur?: (
    event?: FocusEvent<HTMLInputElement>
  ) => Promise<void | boolean> | void;
  /** Set the onKeyDown handler */
  onKeyDown?: (
    event?: KeyboardEvent<HTMLInputElement>
  ) => Promise<void | boolean> | void;
  /** Set the onMouseDown handler */
  onMouseDown?: (
    event?: MouseEvent<HTMLInputElement>
  ) => Promise<void | boolean> | void;
  /** Set custom css */
  css?: CSS;
  /** Set role */
  role?: string;
  /** Define wether the element has ellipsis */
  hasEllipsis?: boolean;
  /** Set minimum value for number type*/
  min?: string | number;
  /** Set maximum value for number type*/
  max?: string | number;
  /** Set whether the choice field is focused */
  isFocused?: boolean;
  /** Set whether there is a description underneath the field */
  description?: string;
}

export const Input = ({
  id,
  name,
  icon,
  leftIcon,
  iconColor,
  value,
  optional,
  defaultValue,
  hasSpaceBottom,
  hasNoBorderRadius,
  hasBoxRight,
  hasLabelBox,
  hasSpaceTop,
  hasSpaceLeft,
  isInline,
  isSuccess,
  size,
  variant,
  isFocused,
  isLoading,
  autoFocus,
  placeholder,
  isDisabled,
  isReadOnly,
  isVisible = true,
  label,
  colonIsDisabled,
  error,
  hasErrorOutline,
  helpIcon,
  onChange,
  onBlur,
  onMouseDown,
  onKeyDown,
  type = "text",
  isFitContent,
  suffix,
  suffixTooltip,
  css,
  role,
  iconCss,
  isHelpIconExample,
  hasEllipsis,
  maxLength,
  min,
  max,
  tabIndex,
  description,
}: Props) => {
  return (
    <>
      {label && (
        <div className={wrapper({ size })}>
          {label && (
            <Label
              htmlFor={id}
              error={error}
              isSuccess={isSuccess}
              colonIsDisabled={colonIsDisabled}
            >
              {label}
            </Label>
          )}
        </div>
      )}
      <div
        className={flexWrapper({
          hasSpaceBottom,
          hasSpaceTop,
          hasSpaceLeft,
          size,
        })}
      >
        <div className={wrapper({ size })}>
          <Flex css={{ width: "100%" }}>
            <Flex css={{ width: "100%" }}>
              <Flex css={{ width: "100%", position: "relative" }}>
                <input
                  className={styles({
                    variant,
                    isFocused,
                    isInline,
                    isVisible,
                    isDisabled,
                    hasNoBorderRadius,
                    hasBoxRight,
                    hasIcon: !!icon,
                    hasLeftIcon: !!leftIcon,
                    hasError: !!error || hasErrorOutline,
                    isLoading,
                    hasLabelBox,
                    hasEllipsis,
                    hasSuffix: !!suffix,
                    css,
                  })}
                  type={type}
                  value={value}
                  defaultValue={defaultValue}
                  id={id}
                  name={name}
                  placeholder={placeholder}
                  disabled={isDisabled}
                  readOnly={isReadOnly}
                  min={min}
                  max={max}
                  maxLength={maxLength}
                  tabIndex={tabIndex}
                  onChange={onChange}
                  onMouseDown={onMouseDown}
                  onKeyDown={(event) => {
                    onKeyDown && onKeyDown(event);
                  }}
                  onBlur={onBlur}
                  autoFocus={autoFocus}
                  role={role}
                />
                {suffix && (
                  <Flex css={suffixStyle}>
                    <Text>{suffix}</Text>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Flex>
        </div>
        {description && <Text size="xsmall">{description}</Text>}
      </div>
    </>
  );
};

const wrapper = css({
  position: "relative",
  display: "flex",
  width: "100%",
  variants: {
    size: {
      xs: {
        width: "60px",
      },
      xsmall: {
        width: "150px",
      },
      small: {
        width: "200px",
        "& input": {
          padding: "$1 $3",
        },
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
      inlinesmall: {
        width: "100%",
      },
    },
  },
});

const styles = css({
  padding: "$3",
  height: "$5",
  background: "white",
  border: "1px solid $grey4",
  borderRadius: "$1",
  outline: "none",
  fontFamily: "$normal",
  fontSize: "$4",
  color: "$grey6",
  width: "100%",
  transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s",
  "&:focus": {
    borderColor: "$blue1",
  },
  "&:disabled": {
    border: "1px solid $grey4",
    background: "$grey2",
    cursor: "not-allowed !important",
  },
  "&::placeholder": {
    color: "$grey5",
  },
});

const flexWrapper = css({
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
    hasSpaceLeft: {
      true: {
        marginLeft: "$4",
      },
    },
    size: {
      xs: {},
      xsmall: {},
      small: {},
      medium: {},
      large: {},
      inlinesmall: {
        width: "30%",
      },
      full: {
        width: "100%",
      },
    },
  },
});

const suffixStyle = {
  background: "$grey2",
  justifyContent: "center",
  height: "40px",
  width: "40px",
  border: "1px solid $grey4",
  borderLeft: "none",
};
