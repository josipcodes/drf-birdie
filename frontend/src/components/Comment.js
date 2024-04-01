import { Media } from "react-bootstrap";
import styles from "../styles/Comment.module.css";

import React from "react";
import Avatar from "../components/Avatar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import useScreenWidth from "../hooks/useScreenWidth";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { MoreDropdown } from "./PostDropdown";

const Comment = (props) => {
  const { profile_id, profile_avatar, owner, modified, content } = props;

  // currentUser from  custom context
  const currentUser = useCurrentUser();
  // checking if current user's username matches owner's
  const is_owner = currentUser?.username === owner;

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
        {is_owner && (
          <MoreDropdown handleEdit={() => {}} handleDelete={() => {}} />
        )}
      </Media>
    </div>
  );
};

export default Comment;
