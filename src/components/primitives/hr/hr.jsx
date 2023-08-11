import React from "react";

import { css } from "../../../styles/system";
import { Text } from "../text/text";

interface Props {
  children?: ReactNode;
  css: any;
}

export const Hr = ({ children, css }: Props) => {
  return <div className={hr(css)}><Text color="lightGrey">{children}</Text></div>;
};

const hr = css({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  "&::before": {
    content: "",
    flex: "1",
    borderBottom: "1px solid $grey5",
    marginRight: "15px",
  },
  "&::after": {
    content: "",
    flex: "1",
    borderBottom: "1px solid $grey5",
    marginLeft: "15px",
  }
});
