import React, { ReactNode } from 'react';

interface Props {
  /** Boolean to determine if the tab is rendered or not  */
  isActive: boolean;
  /** Children components rendered within the tab if "isActive" is true */
  children?: ReactNode;
}

export const TabContent = ({ isActive, children }: Props) => {
  return isActive && <>{children}</>;
};
