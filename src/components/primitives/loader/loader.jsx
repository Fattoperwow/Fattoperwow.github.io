import React from "react";
import styles from "./loader.module.css";

export const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.loader}></span>
    </div>
  );
};
