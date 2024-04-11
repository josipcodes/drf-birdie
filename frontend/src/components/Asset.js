import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message, buttonMessage }) => {
  /* initially copied off of Momments.
  Changes applied. */
  return (
    <div className={styles.Asset}>
      {spinner && <Spinner animation="border" variant="warning" />}
      {src && <img src={src} alt={message} />}
      {message && <p className={`${styles.ProfileText} mt-4`}>{message}</p>}
      {buttonMessage && <p className={`${styles.ButtonText} mt-4`}>{buttonMessage}</p>}
    </div>
  );
};

export default Asset;
