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
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/Dropdowns";
import { axiosResponse } from "../../api/axiosDefaults";

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
    saved_count,
    // adding prop from PostPage.js
    postPage,
    // adding prop from ProfilePage.js
    profilePage,
    // passed from parent components to update the likes/saves.
    setPosts,
    setCurrentPosts,
  } = props;

  const currentUser = useCurrentUser();
  // assigning boolean value to is_owner.
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  // copied from Moments
  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  // copied from Moments
  // tbd if asking for confirmation would benefit or annoy the user
  const handleDelete = async () => {
    try {
      await axiosResponse.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  // built based off of Moments lessons with changes
  const handleSave = async () => {
    /* Function saves a post, increases the number of saves on the post */
    try {
      // save id is needed so the API knows which post is being saved
      const { data } = await axiosResponse.post("/saved/", { post: id });
      if (profilePage) {
        setCurrentPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            // using ternary to check if the post id matches the post we saved.
            // if it does, we'll add to the count, otherwise we return post so map can continue checking.
            return post.id === id
              ? {
                  ...post,
                  saved_count: post.saved_count + 1,
                  saved_id: data.id,
                }
              : post;
          }),
        }));
      } else {
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            // using ternary to check if the post id matches the post we saved.
            // if it does, we'll add to the count, otherwise we return post so map can continue checking.
            return post.id === id
              ? {
                  ...post,
                  saved_count: post.saved_count + 1,
                  saved_id: data.id,
                }
              : post;
          }),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // built based off of Moments lessons with changes
  const handleUnsave = async () => {
    /* Function unsaves a post, decreases the number of saves on the post */
    try {
      await axiosResponse.delete(`/saved/${saved_id}/`);
      if (profilePage) {
        setCurrentPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? { ...post, saved_count: post.saved_count - 1, saved_id: null }
              : post;
          }),
        }));
      } else {
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? { ...post, saved_count: post.saved_count - 1, saved_id: null }
              : post;
          }),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // built based off of Moments lessons
  const handleLike = async () => {
    /* Function likes a post, increases the number of likes on the post */
    try {
      // like id is needed so the API knows which post is being liked
      const { data } = await axiosResponse.post("/likes/", { post: id });
      if (profilePage) {
        setCurrentPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            // using ternary to check if the post id matches the post we liked.
            // if it does, we'll add to the count, otherwise we return post so map can continue checking.
            return post.id === id
              ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
              : post;
          }),
        }));
      } else {
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            // using ternary to check if the post id matches the post we liked.
            // if it does, we'll add to the count, otherwise we return post so map can continue checking.
            return post.id === id
              ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
              : post;
          }),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // built based off of Moments lessons
  const handleUnlike = async () => {
    /* Function unlikes a post, decreases the number of likes on the post */
    try {
      await axiosResponse.delete(`/likes/${like_id}/`);
      if (profilePage) {
        setCurrentPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? { ...post, likes_count: post.likes_count - 1, like_id: null }
              : post;
          }),
        }));
      } else {
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? { ...post, likes_count: post.likes_count - 1, like_id: null }
              : post;
          }),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={profilePage ? styles.ProfilePost : styles.Post}>
      <Card.Body>
        <Media
          className={`${styles.PostHeader} d-flex justify-content-between`}
        >
          {/* link wrapped around header */}
          <Col>
            <Link to={`/profiles/${profile_id}/`}>
              <Avatar src={profile_avatar} height={45} />
              {owner}
              {!postPage && !profilePage && (
                <i
                  className={`fa-solid fa-arrow-up-right-from-square ml-2 ${styles.OwnerLinkIcon}`}
                ></i>
              )}
            </Link>
          </Col>
          {/* displaying when the post was last updated */}
          <Col className="mt-2 text-right d-flex justify-content-end p-0 pt-1">
            <span>{modified}</span>
            {/* ... are placeholder for dropdown menu, we are now testing if logic works */}
            <span className="ml-3">
              {is_owner && postPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </span>
          </Col>
        </Media>
        <Link to={`/posts/${id}/`}>
          {/* checking if category_name content and image props have been passed before we render them */}
          {category_name && (
            <span className={styles.Category}>{category_name}</span>
          )}
          {content && (
            <span className={`text-left ${styles.PostText}`}>{content}</span>
          )}
          {/* reminder, image is not mandatory */}
          {image && <Card.Img className={styles.PostImage} src={image} />}
        </Link>
      </Card.Body>
      <Card.Body>
        <div>
          <Container>
            <Row className="justify-content-around text-center">
              <Col className={styles.IconText}>
                {/* like logic */}
                {is_owner ? (
                  // using OverlayTrigger and Tooltip to display a tooltip for the owner.
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>You can't like your own post!</Tooltip>}
                  >
                    <i className={`fas fa-heart mt-1 ${styles.PostNotLiked}`} />
                  </OverlayTrigger>
                ) : like_id ? (
                  // if like_id exists, user already liked the post
                  <span onClick={handleUnlike}>
                    <i className={`fas fa-heart mt-1 ${styles.PostLiked}`} />
                  </span>
                ) : currentUser ? (
                  // if user is logged in, they can like the post
                  <span onClick={handleLike}>
                    <i className={`fas fa-heart mt-1 ${styles.PostNotLiked}`} />
                  </span>
                ) : (
                  // display tooltip for non-user
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Log in to like a post!</Tooltip>}
                  >
                    <i className={`fas fa-heart mt-1 ${styles.PostNotLiked}`} />
                  </OverlayTrigger>
                )}
                {/* number of likes */}
                <span className={styles.IconText}>{likes_count}</span>
              </Col>
              <Col className={styles.IconText}>
                {/* comments icon leads to the post page */}
                <Link to={`/posts/${id}`} className={styles.IconText}>
                  {/* post text hover needed to align visual representation? tbd */}
                  <i className={`far fa-comments ${styles.CommentIcon}`} />
                  {/* number of comments */}
                  {comments_count}
                </Link>
              </Col>
              <Col>
                {currentUser && !is_owner && (
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Save a post for later!</Tooltip>}
                  >
                    <span
                      onClick={saved_id == null ? handleSave : handleUnsave}
                      className={styles.IconText}
                    >
                      <i
                        className={
                          saved_id !== null
                            ? `fa-brands fa-earlybirds ${styles.PostSaved}`
                            : `fa-solid fa-egg ${styles.PostNotSaved}`
                        }
                      />
                      {saved_count}
                    </span>
                  </OverlayTrigger>
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
