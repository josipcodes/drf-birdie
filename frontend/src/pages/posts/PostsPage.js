import React, { useEffect, useState } from "react";
import { axiosRequest } from "../../api/axiosDefaults";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Post from "./Post";
import Asset from "../../components/Asset";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import appStyles from "../../App.module.css";

// modelled after Moments lessons
function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  // keeping track if all data has loaded
  const [isLoaded, setIsLoaded] = useState(false);
  // we'll have to re-fetch posts again when user clicks between home, feed and liked pages.
  // to detect location, we'll use useLocation react router hook.
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // the request string will contain filter parameter, which comes from the filter prop we set in routes.
        // tells API if we want to see all posts or certain ones.
        const { data } = await axiosRequest.get(`/posts/?${filter}/`);
        setPosts(data);
        // setting IsLoaded to true so spinner no longer spins.
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    // we want spinner displayed before we fetch posts.
    setIsLoaded(false);
    // we want this called any time filter or url changes.
    fetchPosts();
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-lg-1" lg={8}>
        {/* ternary to display spinner or posts */}
        {isLoaded ? (
            // nested ternary to display posts or message.
            <>
                {posts.results.length ? (
                    // map over posts and render each one
                    posts.results.map((post) => (
                        // setPosts is needed to like posts.
                        <Post key={post.id} {...post} setPosts={setPosts} />
                      ))
                ) : (
                    // show no results asset
                    <Container className={appStyles.Content}>
                        {/* no results image, message we passed down */}
                        <Asset message={message} />
                    </Container>
                )}
            </>
        ) : (
            // spinner
            <Container className={appStyles.Content}>
                <Asset spinner />
            </Container>
        )}

      </Col>
      {/* small screen hook needed, tbd */}
      <Col lg={4} className="d-none d-lg-block p-lg-1">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default PostsPage;
