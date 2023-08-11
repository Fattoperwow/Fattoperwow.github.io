import { Header } from "../../shared/header/header";
import { css } from "../../../styles/system";
import { useStore } from "../../../store/store";
import { shallow } from "zustand/shallow";
import 'react-toastify/dist/ReactToastify.css';

import fieldBg from "../../../media/field-dark.png";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";


export const PageWrapper = ({ children }) => {
  // Set store
  // const { setUser } = useStore(
  //   (state) => ({ setUser: state.setUser }),
  //   shallow
  // );
  // setUser(JSON.parse(localStorage.getItem("fantauser")));

  return (
    <>
      <div className={wrapper()}>
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className={contentWrapper()}>{children}</div>
      </div>
    </>
  );
};

const wrapper = css({
  maxWidth: "100vw",
  minHeight: "100vh",
  backgroundColor: "$black",
  background: `url(${fieldBg})`,
  // backgroundPosition: 'center',
  // backgroundSize: 'cover'
});

const contentWrapper = css({
  padding: "20px",
  paddingTop: "100px",
});
