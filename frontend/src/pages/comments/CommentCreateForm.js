import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import bttnStyles from "../../styles/Button.module.css";
import Avatar from "../../components/Avatar";
import { axiosResponse } from "../../api/axiosDefaults";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

import useScreenWidth from "../../hooks/useScreenWidth"

import styles from "../../styles/CommentCreateEditForm.module.css"

// based off of Moments, with various changes
function CommentCreateForm(props) {
  const { post, setPost, setComments, profile_id } = props;
  const [content, setContent] = useState("");

  const currentUser = useCurrentUser();

    // screen width check
    const smallScreen = useScreenWidth();

  const handleChange = (e) => {
    // update comment content
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosResponse.post("/comments/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar
              src={currentUser?.profile_avatar}
              text={currentUser?.username}
              height={smallScreen ? 35 : 40}
            />
          </Link>
          <Form.Control
            as="textarea"
            className={`ml-2 ml-md-3 ${styles.CommentHeight}`}
            placeholder="Type comment..."
            rows={smallScreen ? 4 : 2}
            value={content}
            onChange={handleChange}
  
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${bttnStyles.Button} d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        Comment
      </button>
    </Form>
  );
}

export default CommentCreateForm;
