import { Media } from "react-bootstrap";
import styles from "../styles/Comment.module.css";

import React from "react";
import Avatar from "../components/Avatar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import useScreenWidth from "../hooks/useScreenWidth"

const Comment = (props) => {
  const { profile_id, profile_avatar, owner, modified, content } = props;

    // screen width check
    const smallScreen = useScreenWidth();

  return (
    <div className="mt-2">
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_avatar} height={smallScreen ? 35 : 40} />
        </Link>
        <Media.Body>
          <span className={styles.Commenter}>{owner}</span>
          <span className={styles.ModifiedDate}>{modified}</span>
          <p>{content}</p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;
