import { useNavigate } from "react-router-dom";
import { css } from "../../../styles/system";
import { Input } from "../../primitives/input/input";
import { Text } from "../../primitives/text/text";
import { Hr } from "../../primitives/hr/hr";
import { Button } from "../../primitives/button/button";
import { useState } from "react";
import { CreateAccount } from "./CreateAccount";
import { login, loginWithCode } from "../../../requests/users";
import { Loader } from "../../primitives/loader/loader";
import { useStore } from "../../../store/store";
import { ErrorMessage } from "../../primitives/text/error";
import { fetchVitals } from "../page-wrapper/fetches";

export const Login = () => {
  // History hook
  const navigate = useNavigate();

  // User user store
  const store = useStore();

  // Loader & op states
  const [isLoading, setisloading] = useState(false);
  const [createUserModalIsOpen, setCreateUserModalIsOpen] = useState(false);

  // Login fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  // code login fields
  const [code, setCode] = useState("");
  const [loginCodeErrorMessage, setLoginCodeErrorMessage] = useState("");

  // Login with credential
  const onLoginWithCredentials = async () => {
    // Validation
    if (!username || !password) {
      setLoginErrorMessage("Compila tutti i campi prima di procedere.");
      return;
    }
    setisloading(true);
    setLoginErrorMessage("");
    setLoginCodeErrorMessage("");
    const response = await login(username, password);
    if (response.data) {
      // Fetch vital data
      const data = await fetchVitals(store);
      if (data.success) {
        // Login successful, redirect
        localStorage.setItem("fantauser", JSON.stringify(response.data));
        store.setUser(response.data);
        setisloading(false);
        navigate("/");
      }
    } else {
      setLoginErrorMessage(response.errorMessage);
    }
  };

  // Login with credential
  const onLoginWithCode = async () => {
    // Validation
    if (!code) {
      setLoginCodeErrorMessage("Inserisci il codice prima di procedere");
      return;
    }
    setisloading(true);
    setLoginErrorMessage("");
    setLoginCodeErrorMessage("");
    const response = await loginWithCode(code);
    setisloading(false);
    if (response.data) {
      // Login successful, redirect
      localStorage.setItem("fantauser", JSON.stringify(response.data));
      store.setUser(response.data);
      navigate("/");
    } else {
      setLoginCodeErrorMessage(response.errorMessage);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <CreateAccount
        isOpen={createUserModalIsOpen}
        setIsOpen={setCreateUserModalIsOpen}
      />
      <div className={wrapper()}>
        <div className={bgWrapper()}></div>
        <div className={loginWrapper()}>
          <div>
            <Text size="xlarge" css={{ marginBottom: "20px" }}>
              Login con credenziali
            </Text>
            <Input
              label="Username"
              hasSpaceBottom
              placeholder="Il tuo username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              placeholder="La tua password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginErrorMessage && (
              <ErrorMessage css={{ marginTop: "15px" }}>
                {loginErrorMessage}
              </ErrorMessage>
            )}
            <Button color="black" hasSpaceTop onClick={onLoginWithCredentials}>
              Login
            </Button>
          </div>
          <Hr css={hrMargin()}>Oppure</Hr>
          <div>
            <Text size="xlarge" css={{ marginBottom: "20px" }}>
              Login con codice
            </Text>
            <Input
              label="Codice"
              placeholder="Codice"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {loginCodeErrorMessage && (
              <ErrorMessage>{loginCodeErrorMessage}</ErrorMessage>
            )}
            <Button color="black" hasSpaceTop onClick={onLoginWithCode}>
              Login con codice
            </Button>
          </div>
          <Hr css={hrMargin()}>Oppure</Hr>
          <div>
            <Text size="xlarge" css={{ marginBottom: "10px" }}>
              Crea account
            </Text>
            <Text css={{ marginBottom: "10px", display: "block" }}>
              Non ancora registrato? crea il tuo account!
            </Text>
            <Button
              color="black"
              onClick={() => setCreateUserModalIsOpen(true)}
            >
              Crea account
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const wrapper = css({
  minHeight: "100vh",
  minWidth: "100vw",
  backgroundColor: "$black",
  display: "flex",
});

const loginWrapper = css({
  width: "40%",
  backgroundColor: "$white",
  padding: "$8",
  "@bp2max": {
    width: "100%",
  },
});

const bgWrapper = css({
  width: "60%",
  "@bp2max": {
    width: "0px",
  },
});

const hrMargin = css({
  marginTop: "40px",
  marginBottom: "40px",
});
