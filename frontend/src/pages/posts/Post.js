import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  Container,
  Row,
  Card,
  Col,
  Media,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

// temporarily copied from Moments, modified
const Post = (props) => {
  const {
    id,
    owner,
    content,
    modified,
    image,
    profile_id,
    profile_avatar,
    like_id,
    comments_count,
    likes_count,
    category_name,
    saved_id,
    // adding prop from PostPage.js
    postPage,
  } = props;
  

  const currentUser = useCurrentUser();
  // assigning boolean value to is_owner.
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media
          className={`${styles.PostHeader} d-flex justify-content-between align-items-center `}
        >
          {/* link wrapped around header */}
          <Link to={`/profiles/${profile_id}/`}>
            <Avatar src={profile_avatar} height={45} />
            {owner}
          </Link>
          {/* displaying when the post was last updated */}
          <span
            className={` ${styles.PostHeader} mt-1`}
          >
            <span>{modified}</span>
          {/* ... are placeholder for dropdown menu, we are now testing if logic works */}
          {/* todo - is_owner is malfunctioning right now, so this is visible if is_owner is removed from the conditional */}
          <span className={styles.HeaderContent}>{is_owner && postPage && "..."}</span>
          </span>
        </Media>
        <Link to={`/posts/${id}/`}>
          {/* checking if category_name content and image props have been passed before we render them */}
          {category_name && (
            <span className={styles.Category}>
              {category_name}
            </span>
          )}
          {content && (
            <span className={`text-left ${styles.PostText}`}>{content}</span>
          )}
          {/* reminder, image is not mandatory */}
          {image && (
            // image wrapped in a link to the post
            <Link to={`/posts/${id}`}>
              {/* alt? tbd */}
              <Card.Img className={styles.PostImage} src={image} />
            </Link>
          )}
        </Link>
      </Card.Body>
      <Card.Body>
        <div>
          <Container>
            <Row className="justify-content-around text-center">
              {/* tbd if all hearts will use the same icon, classes added to test visual representation */}
              <Col className={styles.IconText}>
                {/* like logic */}
                {is_owner ? (
                  // using OverlayTrigger and Tooltip to display a tooltip for the owner.
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>You can't like your own post!</Tooltip>}
                  >
                    <i className="fas fa-heart" />
                  </OverlayTrigger>
                ) : like_id ? (
                  // if like_id exists, user already liked the post
                  <span onClick={() => {}}>
                    <i className={`far fa-heart ${styles.Heart}`} />
                  </span>
                ) : currentUser ? (
                  // if user is logged in, they can like the post
                  <span onClick={() => {}}>
                    <i className={`fas fa-heart ${styles.HeartOutline}`} />
                  </span>
                ) : (
                  // display tooltip for non-user
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Log in to like a post!</Tooltip>}
                  >
                    <i className="fas fa-heart" />
                  </OverlayTrigger>
                )}
                {/* number of likes */}
                {likes_count}
              </Col>
              <Col className={styles.IconText}>
                {/* comments icon leads to the post page */}
                <Link to={`/posts/${id}`} className={styles.IconText}>
                  {/* post text hover needed to align visual representation? tbd */}
                  <i className={`far fa-comments ${styles.PostText}`} />
                  {/* number of comments */}
                  {comments_count}
                </Link>
              </Col>
              <Col>
                {currentUser && (
                  <span onClick={() => {}} className={styles.IconText}>
                    <i
                      className={
                        saved_id
                          ? `fa-brands fa-earlybirds ${styles.IconText}`
                          : `fa-solid fa-egg ${styles.PostText}`
                      }
                    />
                  </span>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
