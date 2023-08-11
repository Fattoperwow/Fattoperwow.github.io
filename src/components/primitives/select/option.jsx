import React, { ReactNode } from 'react';

import { css } from '../../../styles/system';

export interface OptionProps {
  children?: ReactNode;
  /** Set the value */
  value?: string | number;
  /** Set whether the value is disabled */
  isDisabled?: boolean;
  /** Set role */
  role?: string;
}

export const SelectOption = ({ children, value, isDisabled, role }: OptionProps) => {
  return (
    <option className={styles()} value={value} disabled={isDisabled} role={role}>
      {children}
    </option>
  );
};

const styles = css({
  height: '$14'
});
