import React, { ReactNode } from 'react';

import { css } from "../../../styles/system";

export interface FootProps {
  children?: ReactNode;
  /** Set role */
  role?: string;
}

export const TableFoot = ({ children, role }: FootProps) => {
  return (
    <tfoot className={styles()} role={role}>
      {children}
    </tfoot>
  );
};

const styles = css({
  '& tr': {
    paddingTop: '$2',
    borderTop: '2px solid $grey3',
    background: 'white',
    '&:not(:first-child)': {
      borderTop: '1px solid $grey3'
    }
  },
  fontWeight: 'bold'
});
