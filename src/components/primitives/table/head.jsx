import React, { ReactNode } from 'react';

import { css } from "../../../styles/system";

export interface HeadProps {
  children?: ReactNode;
  css?: any;
  /** Set role */
  role?: string;
}

export const TableHead = ({ children, css, role }: HeadProps) => {
  return (
    <thead className={styles({ css })} role={role}>
      {children}
    </thead>
  );
};

const styles = css({
  '& tr': {
    paddingTop: '$2',
    borderBottom: '2px solid $grey3',
    background: '$darkBlack',
    color: '$white'
  },
  fontWeight: 'bold'
});
