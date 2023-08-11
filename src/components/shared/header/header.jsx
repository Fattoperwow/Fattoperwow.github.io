import React, { useState } from "react";
import { Text } from "../../primitives/text/text";
import { Flex } from "../../primitives/flex/flex";
import { css } from "../../../styles/system";
import { Link } from "react-router-dom";

// icons
import { FaCog } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Logout } from "../../pages/login/Logout";

export const Header = () => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <>
      <Logout isOpen={isLogoutOpen} setIsOpen={setIsLogoutOpen} />
      <div className={header()}>
        <div className={wrapper()}>
          <div>
            <Link to="/" className={linkStyle()}>
              <Text size="large" color="white">
                FantaAsta
              </Text>
            </Link>
          </div>
          <Flex>
            <div className={mr()}>
              <Link to="/" className={linkStyle()}>
                <FaHome color="white" />
                <Text color="white" css={{ marginLeft: "5px" }}>
                  Home
                </Text>
              </Link>
            </div>
            <div className={mr()}>
              <Link to="/impostazioni" className={linkStyle()}>
                <FaCog color="white" />
                <Text color="white" css={{ marginLeft: "5px" }}>
                  Impostazioni
                </Text>
              </Link>
            </div>
            <div>
              <div
                className={linkStyle()}
                onClick={() => setIsLogoutOpen(true)}
              >
                <IoMdLogOut color="white" />
                <Text color="white" css={{ marginLeft: "5px" }}>
                  Logout
                </Text>
              </div>
            </div>
          </Flex>
        </div>
      </div>
    </>
  );
};

const header = css({
  width: "100%",
  backgroundColor: "$darkBlack",
  position: "fixed",
  top: "0",
  left: "0",
  height: "$header",
  zIndex: 999,
});

const wrapper = css({
  margin: "0 $5 0 $5",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "$white",
  height: "100%",
});

const linkStyle = css({
  textDecoration: "none",
  display: "flex",
  justifyContent: "center",
  alighItems: "center",
  cursor: "pointer",
});

const mr = css({
  marginRight: "20px",
});
