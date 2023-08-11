import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useMemo,
  MouseEvent,
} from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { FaSort } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

import { css } from "../../../styles/system";
import { Input } from "../input/input";
import { Label } from "../label/label";

// Hooks
import { useClickOutside } from "../../../hooks/click-outside/click-outside";
import { Tooltip } from "../tooltip/tooltip";
import { Text } from "../text/text";
import { Flex } from "../flex/flex";
import { useStateReducer } from "../../../hooks/state-reducer";
import { useDebounce } from "../../../hooks/debounce";

interface Props {
  children?: ReactNode;
  /** Set the list of options */
  options: any;
  /** Set the default (selected) value */
  value?: any;
  /** Set the default item label to be displayed  */
  itemLabel?: string;
  /** Set the name of the combo box */
  name?: string;
  /** Set the ID of the combo box */
  id?: string;
  /** Set the label message */
  label?: string;
  /** Set the error message */
  error?: string;
  /** Set the isSuccess state */
  isSuccess?: boolean;
  /** Set the isLoading state */
  isLoading?: boolean;
  /** Set the onChange handler */
  onChange: (arg0: any) => Promise<void | boolean> | void;
  /** Set the onClick handler */
  onClick?: (event?: MouseEvent | string) => void;
  /** Set the onSearch handler */
  onSearch?: any;
  /** Set whether the element has space to the bottom */
  hasSpaceBottom?: boolean;
  /** Set whether the element has border radius */
  hasNoBorderRadius?: boolean;
  /** Set whether the element should remove styles due to a left label box */
  hasLabelBox?: boolean;
  /** Set whether the element has space to the right */
  hasSpaceRight?: boolean;
  /** Set whether the element has space to the left */
  hasSpaceLeft?: boolean;
  /** Set whether the element has space to the top */
  hasSpaceTop?: boolean;
  /** Set the size of the combo box */
  size?: "xs" | "small" | "medium" | "large" | "full";
  /** Set the size of the dropdown menu */
  menuSize?: "small" | "medium" | "large" | "full";
  /** Set the placeholder of the select field */
  placeholder?: string;
  /** Whether the combo box is disabled */
  isDisabled?: boolean;
  /** Color of dropdown icon */
  dropIconColor?: "white" | "light";
  /** Set if label has colon disabled*/
  colonIsDisabled?: boolean;
  /** Set custom css */
  css?: any;
  /** Allow user to select empty option from dropdown */
  allowEmptyOption?: boolean;
  /** Set prefix */
  prefix?: string;
  /** Define wether the field has ellipsis when the content is bigger than the field */
  hasEllipsis?: boolean;
}

export interface State {
  isOpen?: boolean;
  searchQuery?: string;
  isLoading?: boolean;
  focusedItem?: number;
  items?: {
    value: string,
    label: string,
    description?: string,
  }[];
}

export const SelectSearch = forwardRef(
  (
    {
      id,
      value,
      itemLabel,
      options,
      label,
      error,
      isSuccess,
      isDisabled,
      isLoading,
      onChange,
      onSearch,
      onClick,
      hasSpaceBottom,
      hasNoBorderRadius,
      hasLabelBox,
      hasSpaceRight,
      hasSpaceLeft,
      hasSpaceTop,
      placeholder,
      allowEmptyOption,
      size,
      menuSize,
      dropIconColor,
      colonIsDisabled,
      css,
      prefix,
      hasEllipsis,
    },
    ref
  ) => {
    const [state, dispatch] = useStateReducer({
      isOpen: false,
      items: options,
      searchQuery: null,
      focusedItem: 0,
    });

    const debouncedSearch = useDebounce(state.searchQuery, 500);

    useEffect(() => {
      if (onSearch && debouncedSearch !== null) {
        onSearch(debouncedSearch);
      }
    }, [debouncedSearch]);

    const comboRef = useRef(null);
    const itemsRef = useRef([]);
    const listRef = useRef(null);

    // Memoize for click outside
    const closeCombo = useCallback(() => {
      dispatch("isOpen", false);
    }, []);

    const calcOptions = () => {
      if (allowEmptyOption) {
        return [{ value: "", label: "-" }, ...options];
      }
      return options;
    };

    // Close combo menu on click outside
    useClickOutside(comboRef, closeCombo);

    // Handle item focus on hover
    const handleFocus = (itemPosition: number) => {
      dispatch("focusedItem", itemPosition);
    };

    // Calc list height
    const listHeight = useMemo(() => {
      return Math.min(state.items?.length * 33, 210);
    }, [state.items?.length]);

    // Select value handler
    const selectValue = (index: number) => {
      onChange(state.items[index]?.value);
      dispatch("isOpen", false);
    };

    // Focus item handler
    const handleFocusedItem = () => {
      const focusedItem = state.items
        ? Math.max(
            state.items?.findIndex((option) => option.value === value),
            0
          )
        : 0;

      dispatch("focusedItem", focusedItem);
      return focusedItem;
    };

    // Async handler
    useEffect(() => {
      if (!isLoading) {
        dispatch("items", options);
        handleFocusedItem();
      }
    }, [isLoading]);

    // Item dispatcher
    useEffect(() => {
      dispatch("items", calcOptions());
      handleFocusedItem();
    }, [options]);

    // Search handler
    useEffect(() => {
      const results = calcOptions()?.filter((item) =>
        item.label
          ?.toLowerCase()?.includes(state.searchQuery?.toLowerCase() || "")
      );

      dispatch("items", results);

      if (state.searchQuery) {
        dispatch("focusedItem", 0);
        listRef.current?.scrollToIndex(0);
        return;
      }

      const focusedItem = handleFocusedItem();

      requestAnimationFrame(() => {
        listRef.current?.scrollToIndex({
          index: focusedItem,
          align: "start",
        });
      });
    }, [state.searchQuery]);

    // Clear search query on close
    // Execute onClick on open
    useEffect(() => {
      if (state.isOpen && onClick) {
        onClick(value);
      }

      if (!state.isOpen) {
        dispatch("searchQuery", null);
        return;
      }

      handleFocusedItem();
    }, [state.isOpen]);

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
            hasSpaceRight,
            hasSpaceLeft,
            hasSpaceTop,
            size,
          })}
        >
          <div className={wrapper({ size })} ref={comboRef}>
            {prefix && <Flex css={prefixStyle}>{prefix}</Flex>}
            <Input
              id={id}
              onMouseDown={(event: any) => {
                event.preventDefault();
                dispatch("isOpen", !state.isOpen);
              }}
              value={
                (isLoading && "Loading...") ||
                options?.find((option) => option.value === value)?.label ||
                itemLabel ||
                (placeholder ? "" : "-")
              }
              placeholder={placeholder}
              isDisabled={isDisabled || isLoading}
              size={size}
              hasEllipsis={hasEllipsis}
              css={{
                ...css,
                cursor: 'pointer'
              }}
            />

            {state.isOpen && (
              <div className={menu({ size, menuSize })}>
                {options?.length >= 5 && (
                  <span className={search()}>
                    <Input
                      value={state.searchQuery || ""}
                      onChange={(event) => {
                        dispatch("searchQuery", event?.target.value);
                      }}
                      placeholder="Search"
                      icon={FaSearch}
                      autoFocus
                    />
                  </span>
                )}
                {state.items?.length === 0 ? (
                  <span className={item({ isFocused: true })}>No results</span>
                ) : (
                  <Virtuoso
                    style={{ height: listHeight, width: "100%" }}
                    totalCount={state.items?.length + 1}
                    ref={listRef}
                    data={state.items}
                    initialTopMostItemIndex={state.focusedItem}
                    itemContent={(index) => (
                      <span
                        key={state.items[index]?.value}
                        onClick={() => selectValue(index)}
                        onMouseEnter={() => handleFocus(index)}
                        ref={(el) => (itemsRef.current[index] = el)}
                        className={item({
                          isFocused: index === state.focusedItem,
                        })}
                      >
                        <Flex>
                          {<Text>{state.items[index]?.label}</Text>}
                          {state.items[index]?.description && (
                            <Text
                              css={{
                                color: "$grey5",
                                fontSize: "12px",
                                marginLeft: "10px",
                              }}
                            >
                              {state.items[index]?.description}
                            </Text>
                          )}
                        </Flex>
                      </span>
                    )}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

const wrapper = css({
  position: "relative",
  display: "flex",
  userSelect: "none",
  variants: {
    size: {
      xs: {},
      small: {},
      medium: {},
      large: {},
      full: {
        width: "100%",
      },
    },
  },
});

const menu = css({
  top: "$20",
  padding: "$2",
  border: "1px solid $blue1",
  borderRadius: "$1",
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  background: "white",
  width: "360px",
  maxHeight: "300px",
  zIndex: "$1",
  variants: {
    size: {
      xs: {
        width: "60px",
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
    },
    menuSize: {
      small: {
        width: "190px",
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
    },
  },
});

const item = css({
  padding: "$1",
  minHeight: "30px",
  wordBreak: "break-word",
  width: "100%",
  cursor: "pointer",
  background: "white",
  display: "inline-flex",
  fontWeight: 400,
  variants: {
    isFocused: {
      true: {
        background: "$grey1",
      },
    },
  },
});

const search = css({
  width: "100%",
  background: "white",
  zIndex: "$1",
  paddingBottom: "$1",
  margin: 0,
});

const flexWrapper = css({
  display: "flex",
  alignItems: "center",
  variants: {
    hasSpaceBottom: {
      true: {
        marginBottom: "$3",
      },
    },
    hasSpaceRight: {
      true: {
        marginRight: "$1",
      },
    },
    hasSpaceLeft: {
      true: {
        marginLeft: "$1",
      },
    },
    hasSpaceTop: {
      true: {
        marginTop: "$2",
      },
    },
    size: {
      xs: {
        width: "60px",
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
    },
  },
});

const prefixStyle = {
  backgroundColor: "$grey2",
  padding: "0 12px 0",
  height: "34px",
  border: "1px solid $grey4",
  borderRight: "none",
  borderRadius: "2px 0",
  justifyContent: "center",
  alignItems: "center",
  with: "fit-content",
};
