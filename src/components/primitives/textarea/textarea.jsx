import React, { forwardRef } from 'react';

import { Label } from "../label/label";

import { css } from '../../../styles/system';

interface Props {
  /** Supports custom css */
  css?: any;
  /** String value to be rendered by the text area */
  value?: string;
  /** Fires when typing in the text area */
  onChange?: (e) => void;
  /** Placeholder string */
  placeholder?: string;
  /** Remove border if you want an attached label box to the left */
  hasLabelBox?: boolean;
  /** Determines initial width */
  size?: 'small' | 'medium' | 'large' | 'full';
  /** Determines initial height */
  rows?: number;
  /** Determines whether or not you can resize the component */
  resizeDirection?: 'all' | 'vertical' | 'horizontal' | 'none';
  /** Description Label */
  label?: string;
  /** Error label*/
  error?: string;
  /** Set whether the element has the success state */
  isSuccess?: boolean;
  /** Set whether the element must be disabled */
  isDisabled?: boolean;
  /** Do something on keyup */
  onKeyUp?: (e) => void;
  /** Do something on scroll */
  onScroll?: (e) => void;
  /** Set the help icon with given text inside a tooltip.  */
  helpIcon?: string;
  /** Whether or not the help icon is formatted in the apis build step format  */
  isHelpIconExample?: boolean;
}

export const TextArea = forwardRef(
  (
    {
      value,
      onChange,
      css,
      hasLabelBox,
      placeholder,
      size,
      rows,
      resizeDirection = 'all',
      error,
      isSuccess,
      label,
      helpIcon,
      isHelpIconExample,
      onKeyUp,
      onScroll,
      isDisabled
    },
    ref
  ) => {
    return (
      <>
        {label && (
          <Label error={error} isSuccess={isSuccess}>
            {label}
          </Label>
        )}
        <textarea
          ref={ref}
          role="textarea"
          onKeyUp={onKeyUp}
          onScroll={onScroll}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          disabled={isDisabled}
          className={styles({
            resizeDirection,
            hasError: !!error,
            hasLabelBox,
            size,
            css
          })}
        />
      </>
    );
  }
);

const styles = css({
  fontFamily: '$normal',
  padding: '$2 $3',
  fontSize: '$4',
  border: '1px solid $grey4',
  borderRadius: '$1',
  maxWidth: '100%',
  maxHeight: '100%',
  color: '$grey6',
  '&:focus-visible': {
    border: '1px solid $blue1',
    outline: 'none'
  },
  variants: {
    resizeDirection: {
      all: {
        resize: 'both'
      },
      vertical: {
        resize: 'vertical'
      },
      horizontal: {
        resize: 'horizontal'
      },
      none: {
        resize: 'none'
      }
    },
    size: {
      small: {
        width: '200px'
      },
      medium: {
        width: '300px'
      },
      large: {
        width: '400px'
      },
      full: {
        width: '100%'
      }
    },
    hasLabelBox: {
      true: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      }
    },
    hasError: {
      true: {
        border: '1px solid $red1'
      }
    }
  }
});
