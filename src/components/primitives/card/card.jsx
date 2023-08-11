import React, { ReactNode } from "react";

import { css } from "../../../styles/system";

interface Props {
  children?: ReactNode;
  /** allows to pass in css styles. Use with restraint though */
  css?: CSS;
  /** Set role */
  role?: string;
}

export const Card = ({ children, css }: Props) => {
  return <div className={styles({css})}>{children}</div>;
};

const styles = css({
  padding: "$2",
  backgroundColor: "$white",
  borderRadius: "$2",
});
