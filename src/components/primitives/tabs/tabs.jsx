import React, { ReactNode } from "react";

import { css } from "../../../styles/system";
import { Tab } from "./tab";

interface Props {
  /**  Tabs items should ber rendered **/
  items: {
    /** Label of the tab */
    label: string,
    /** Id of the tab */
    id: string,
  }[];
  /** Whether the tab lable should be translated */
  translateLabel?: boolean;
  /** Current selected tab id  */
  selectedTabId: string;
  /** Callback with tab id  is called when the tab is changed */
  onTabChange?: (tab: string) => void;
  /** Elements rendered within the tabs component  */
  children?: ReactNode;
  /** Set role */
  role?: string;
}

export const Tabs = ({
  items,
  selectedTabId,
  onTabChange,
  children,
  role,
}: Props) => {
  return (
    <div className={wrapperStyle()} role={role || "tab"}>
      <div className={itemsStyle()}>
        {items.map(({ id, label }) => (
          <div key={id} onClick={() => onTabChange && onTabChange(id)}>
            <Tab id={id} label={label} isSelected={selectedTabId === id} />
          </div>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
};

const wrapperStyle = css({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  backgroundColor: "$white",
});

const itemsStyle = css({
  display: "flex",
  zIndex: 2,
  position: "relative",
  width: "100%",
  height: "auto",
  backgroundColor: "$white",
  borderBottom: "1px solid $grey4",
  color: "$grey8",
  fontSize: "$3",
});
