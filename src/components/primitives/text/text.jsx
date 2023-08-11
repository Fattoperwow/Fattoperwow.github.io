import React, { ReactNode } from 'react';

import { css } from '../../../styles/system';

interface Props {
  children?: ReactNode;
  /** Set the variant of the element */
  variant?: 'error';
  /** Set the size of the element */
  size?: 'xsmall' | 'small' | 'medium' | 'mediumxl' | 'large' | 'xlarge';
  /** Set the color of the element */
  color?: 'grey' | 'lightGrey' | 'darkgrey' | 'blue' | 'red' | 'white' | 'yellow';
  /** Set whether the text has spacing left */
  hasSpaceLeft?: boolean;
  /** Set whether the text is bold */
  isBold?: boolean;
  /** Set whether the text is display block */
  isDisplayBlock?: boolean;
  /** Sets a bottom Margin */
  bottomMargin?: boolean;
  /** Defines if has hasDangerouslySetInnerHTML */
  hasDangerouslySetInnerHTML?: boolean;
  /** Aligns the text in the center */
  center?: boolean;
  /** allows to pass in css styles. Use with restraint though */
  css?: CSS;
  /** Set role */
  role?: string;
}

/**
 * Text component
 */
export const Text = ({
  children,
  variant,
  size,
  color,
  isBold,
  isDisplayBlock,
  hasSpaceLeft,
  bottomMargin,
  center,
  css,
  role
}: Props) => {
  return (
    <>
        <span
          className={styles({
            variant,
            size,
            color,
            isBold,
            isDisplayBlock,
            hasSpaceLeft,
            bottomMargin,
            center,
            css
          })}
        >
          {children}
        </span>
    </>
  );
};

const styles = css({
  fontFamily: '$normal',
  color: '$black',
  display: 'block',
  variants: {
    variant: {
      error: {
        color: '$red1',
        fontSize: '$2'
      }
    },
    color: {
      grey: { color: '$grey6' },
      lightGrey: { color: '$grey5' },
      darkgrey: { color: '$darkgrey2' },
      blue: { color: '$blue1' },
      red: { color: '$red1' },
      white: { color: '$white' },
      yellow: { color: '$yellow3' }
    },
    size: {
      xsmall: {
        fontSize: '$1'
      },
      small: {
        fontSize: '$2'
      },
      medium: {
        fontSize: '$4'
      },
      mediumxl: {
        fontSize: '$5'
      },
      large: {
        fontSize: '$7'
      },
      xlarge: {
        fontSize: '30px'
      }
    },
    hasSpaceLeft: {
      true: {
        marginLeft: '$1'
      }
    },
    isBold: {
      true: {
        fontWeight: 700
      }
    },
    isDisplayBlock: {
      true: {
        display: 'block'
      }
    },
    bottomMargin: {
      true: {
        marginBottom: '$3'
      }
    },
    center: {
      true: {
        textAlign: 'center'
      }
    }
  },
  defaultVariants: {
    size: 'medium',
    color: '$dark',
  }
});
