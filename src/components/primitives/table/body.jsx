import React, { ReactNode } from 'react';

import { css } from "../../../styles/system";

export interface BodyProps {
  children?: ReactNode;
  /** Set whether table rows can be highlighted on hover */
  hasHighlights?: boolean;
  /** Set whether table rows are striped */
  isStriped?: boolean;
  /** Set role */
  role?: string;
  /** Set whether table rows are striped errors */
  isStripedError?: boolean;
}

export const TableBody = ({
  children,
  hasHighlights,
  isStriped,
  role,
  isStripedError
}: BodyProps) => {
  return (
    <tbody className={styles({ hasHighlights, isStriped, isStripedError })} role={role}>
      {children}
    </tbody>
  );
};

const styles = css({
  variants: {
    isStriped: {
      true: {
        '> tr:nth-child(even)': {
          backgroundColor: 'white'
        },
        '> tr:nth-child(odd)': {
          backgroundColor: '$grey1'
        },
        '> tr:hover': {
          backgroundColor: '$grey2'
        },
      }
    },
    isStripedError: {
      true: {
        '> tr:nth-child(even)': {
          backgroundColor: 'white'
        },
        '> tr:nth-child(odd)': {
          backgroundColor: '$red6'
        }
      }
    },
    hasHighlights: {
      true: {
        '& tr:hover': {
          backgroundColor: '$grey2'
        }
      }
    }
  }
});
