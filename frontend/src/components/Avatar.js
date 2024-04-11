import React from "react";
import styles from "../styles/Avatar.module.css";

// modeled after Moments with changes applied
const Avatar = ({ src, height = 45, text }) => {
  /* src is avatar image
  height is avatar height
  text is username rendered on
  NavBar and Comment form */
  return (
    <span className={styles.Username}>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt="user avatar"
      />
      {text}
    </span>
  );
};


export default Avatar;