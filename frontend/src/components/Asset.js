import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

// temporarily copied from Moments
// minor changes applied
const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset}`}>
      {spinner && <Spinner animation="border" variant="warning" />}
      {src && <img src={src} alt={message} />}
      {message && <p className={`${styles.ProfileText} mt-4`}>{message}</p>}
    </div>
  );
};

export default Asset;
