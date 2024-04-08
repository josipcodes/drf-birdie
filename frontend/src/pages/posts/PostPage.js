import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRequest } from "../../api/axiosDefaults";

import appStyles from "../../App.module.css";
import postStyles from "../../styles/Post.module.css";
import styles from "../../styles/PostPage.module.css";

import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../../components/Comment";
import PopularCategories from "../../components/PopularCategories";

import useScreenWidth from "../../hooks/useScreenWidth";
import Add from "../../components/Add";
import { useRedirect } from "../../hooks/useRedirect";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

// modelled after Moments lessons
function PostPage() {
  useRedirect("loggedOut");
  const { id } = useParams();
  // setting an initial value as an empty array in useState to make all the future logic compatible with arrays of objects.
  // this way it doesn't matter if we're getting a single object or array of posts.
  const [post, setPost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const [comments, setComments] = useState({ results: [] });

  // screen width check
  const smallScreen = useScreenWidth();

  useEffect(() => {
    // handleMount to fetch the post on mount.
    const handleMount = async () => {
      try {
        // we'll eventually be making 2 requests - posts, comments.
        // destructuring and renaming variable (to post) in place.
        // it is called renaming with an object key.
        // Promises.all accepts an array of promises and gets resolved when all promises get resolved, returning an array of data.
        // If any of the promises fail, Promise.all gets rejected w/an error.
        const [{ data: post }, { data: comments }] = await Promise.all([
          // fetching the posts
          axiosRequest.get(`/posts/${id}/`),
          // fetching the comments
          axiosRequest.get(`comments/?post=${id}`),
        ]);
        // using setPost func to update the results array in the state to contain a post
        setPost({ results: [post] });
        // setting Comments
        setComments(comments);
        // clg post to check that this is working
      } catch (err) {
        console.log(err);
      }
    };
    // calling handleMount and running the code every time the id in the url changes.
    handleMount();
  }, [id]);

  return (
    <Row className="mt-2">
      <Col className="py-2 p-md-1" md={8}>
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container
          className={`${appStyles.Content} ${postStyles.PostText} ${styles.CommentFormWidth}`}
        >
          {/* tbd if conditional needs changing */}
          {currentUser && (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          )}
          {comments.results.length ? (
            // copied off of Moments
            <InfiniteScroll
              children={
                // if there are comments, they're shown
                comments.results.map((comment) => (
                  // we're spreading comment object so its contents are passed as props
                  <Comment
                    key={comment.id}
                    {...comment}
                    setPost={setPost}
                    setComments={setComments}
                  />
                ))
              }
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : // if there are no comments, we are checking if user is logged in
          currentUser ? (
            <span>No comments yet, be the first to comment.</span>
          ) : (
            // if the user is not logged in
            <span>No comments...yet. Log in to comment.</span>
          )}
        </Container>
      </Col>
      {!smallScreen && (
        // display popular categories when on desktop
        <Col md={4} className="p-md-2">
          <PopularCategories />
          <Add />
        </Col>
      )}
    </Row>
  );
}

export default PostPage;
