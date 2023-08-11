import React, { ReactNode } from 'react';

import { css, CSS } from '../../../styles/system';

interface Props {
  children?: ReactNode;
  id?: string;
  /** Set the role of the element, to be used for testing */
  role?: string;
  /** Set the styling of the element */
  css?: CSS;
  variant?: 'columns';
  onClick?: (e?: any) => void;
}

export const Flex = ({ children, css, variant, onClick, id, role }: Props) => {
  return (
    <div role={role} id={id} onClick={onClick} className={styles({ css, variant })}>
      {children}
    </div>
  );
};

const styles = css({
  display: 'flex',
  alignItems: 'center',
  variants: {
    variant: {
      columns: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'no-wrap'
      }
    }
  }
});
