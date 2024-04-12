import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosResponse } from "../../api/axiosDefaults";

import bttnStyles from "../../styles/Button.module.css";

import styles from "../../styles/CommentCreateEditForm.module.css";

// based off of Moments, with some changes
function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;

  const [formContent, setFormContent] = useState(content);

  const handleChange = (e) => {
    setFormContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    // prevents refreshing
    e.preventDefault();
    try {
      await axiosResponse.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                modified: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          as="textarea"
          value={formContent}
          onChange={handleChange}
          className={styles.CommentHeight}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={`${bttnStyles.Button} mr-1`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </button>
        <button
          className={bttnStyles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          Update
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
