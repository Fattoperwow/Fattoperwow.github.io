import { css } from "../../../styles/system";
import { Card } from "../../primitives/card/card";
import { Text } from "../../primitives/text/text";
import { Link } from "react-router-dom";
import { BiFootball } from "react-icons/bi";
import { ImHammer2 } from "react-icons/im";
import { IoMdStats } from "react-icons/io";
import { FaHatWizard } from "react-icons/fa";
import { useStore } from "../../../store/store";

export const Home = () => {
  // User user store
  const { user } = useStore();
  return (
    <div className={wrapper()}>
      {user.role === "admin" && (
        <Card css={cardStyle}>
          <Link to="/asta" style={linkStyle}>
            <div>
              <Text size="large" isBold css={cardTitle}>
                Gestore asta
              </Text>
              <Text>
                Gestisci l'asta. <br /> Assegna o svincola i calciatori ai giocatori
              </Text>
            </div>
            <div className={iconWrapper()}>
              <ImHammer2 size="150" color="#0000001f" />
            </div>
          </Link>
        </Card>
      )}
      <Card css={cardStyle}>
        <Link to="/utenti" style={linkStyle}>
          <div>
            <Text size="large" isBold css={cardTitle}>
              Statistiche asta
            </Text>
            <Text>
              Analizza l'andamento dell'asta e controlla le squadre dei tuoi
              avversari
            </Text>
          </div>
          <div className={iconWrapper()}>
            <IoMdStats size="150" color="#0000001f" />
          </div>
        </Link>
      </Card>
      <Card css={cardStyle}>
        <Link to="/calciatori" style={linkStyle}>
          <div>
            <Text size="large" isBold css={cardTitle}>
              Statistiche calciatori
            </Text>
            <Text>
              Osserva le statistiche di tutti i calciatori disponibili per
              l'asta
            </Text>
          </div>
          <div className={iconWrapper()}>
            <BiFootball size="150" color="#0000001f" />
          </div>
        </Link>
      </Card>
      <Card css={cardStyle}>
        <Link to="/dashboard" style={linkStyle}>
          <div>
            <Text size="large" isBold css={cardTitle}>
              Dashboard strategie
            </Text>
            <Text>
              Crea, personalizza e pianifica i le tue strategie prima, durante e
              dopo l'asta
            </Text>
          </div>
          <div className={iconWrapper()}>
            <FaHatWizard size="150" color="#0000001f" />
          </div>
        </Link>
      </Card>
    </div>
  );
};

const wrapper = css({
  marginTop: "15%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "40px",
  width: "100%",
  flexWrap: "wrap",
  height: "max-content",
  paddingLeft: "$4",
  "@bp1max": {
    gap: "40px 0px",
    paddingLeft: 0,
    minHeight: "inherit",
  },
  "@bp2max": {
    marginTop: "0px",
  },
});

const cardStyle = {
  borderRadius: "$4",
  position: "relative",
  padding: "30px",
  borderTop: "4px solid $green1",
  cursor: "pointer",
  width: "350px",
  height: "100%",
  overflow: "hidden",
  "& svg": {
    transition: "all .2s",
  },
  "&:hover": {
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    "& svg": {
      width: "180px",
      height: "180px",
    },
  },
};

const iconWrapper = css({
  position: "absolute",
  bottom: "-40px",
  right: "-20px",
});

const cardTitle = {
  marginBottom: "25px",
  fontSize: "35px",
};

const linkStyle = {
  textDecoration: "none",
  color: "$dark",
};
