import { Media } from "react-bootstrap";
import styles from "../styles/Comment.module.css";

import React from "react";
import Avatar from "../components/Avatar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import useScreenWidth from "../hooks/useScreenWidth";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { MoreDropdown } from "./PostDropdown";
import { axiosResponse } from "../api/axiosDefaults";

const Comment = (props) => {
  const {
    profile_id,
    profile_avatar,
    owner,
    modified,
    content,
    id,
    // passed down from PostPage
    setPost,
    setComments,
  } = props;

  // currentUser from  custom context
  const currentUser = useCurrentUser();
  // checking if current user's username matches owner's
  const is_owner = currentUser?.username === owner;

  // screen width check
  const smallScreen = useScreenWidth();

  // copied from Moments
  const handleDelete = async () => {
    try {
      await axiosResponse.delete(`/comments/${id}/`)
      setPost(prevPost => ({
        results: [{
          ...prevPost.results[0],
          // reducing comment count by 1
          comments_count: prevPost.results[0].comments_count - 1
        }]
      }))
      setComments(prevComments => ({
        ...prevComments,
        // we want to filter for the id of comment we are removing
        results: prevComments.results.filter((comment) => comment.id !== id),
      }))
    } catch(err) {
      console.log(err);
    }
  }

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
          <MoreDropdown handleEdit={() => {}} handleDelete={handleDelete} />
        )}
      </Media>
    </div>
  );
};

export default Comment;
