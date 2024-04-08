import React, { useEffect, useState } from "react";
import { axiosRequest } from "../../api/axiosDefaults";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Post from "./Post";
import Asset from "../../components/Asset";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import appStyles from "../../App.module.css";

import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularCategories from "../../components/PopularCategories";

import useScreenWidth from "../../hooks/useScreenWidth";

import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Add from "../../components/Add";

// modelled after Moments lessons
function PostsPage({ message, filter = "", selectedCategory = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  // keeping track if all data has loaded
  const [isLoaded, setIsLoaded] = useState(false);
  // we'll have to re-fetch posts again when user clicks between home, feed and liked pages.
  // to detect location, we'll use useLocation react router hook.
  const { pathname } = useLocation();

  // attemting to fix loading issues when not logged in
  const currentUser = useCurrentUser();

  // screen width check
  const smallScreen = useScreenWidth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // the request string will contain filter parameter, which comes from the filter prop we set in routes.
        // tells API if we want to see all posts or certain ones.
        if (currentUser == null) {
          const { data } = await axios.get(`/posts/?${filter}`);
          setPosts(data);
        } else {
          const { data } = await axiosRequest.get(`/posts/?${filter}`);
          setPosts(data);
        }
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
  }, [filter, pathname, currentUser]);

  return (
    <Row className="mt-2">
      <Col className="py-2 p-md-1" md={8}>
        {/* ternary to display spinner or posts */}
        {isLoaded ? (
          // nested ternary to display posts or message.
          <>
            {posts.results.length ? (
              <InfiniteScroll
                // child component will tell our Infinite Scroll component which child components we want it to render.
                children={
                  // map over posts and render each one
                  posts.results.map((post) => (
                    // setPosts is needed to like posts.
                    <Post key={post.id} {...post} setPosts={setPosts} />
                  ))
                }
                // how many posts are displayed
                dataLength={posts.results.length}
                // loader
                loader={<Asset spinner />}
                // check if there is more data to display
                // we use double not operator, returns true for truthy and false for falsy values
                // next is set to null if there are no more posts left
                hasMore={!!posts.next}
                // if hasMore is true, loads more
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              // show no results asset
              <Container className={appStyles.Content}>
                {/* message we passed down */}
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
      {!smallScreen && (
        // display popular categories when on desktop
        <Col md={4} className="p-md-2">
          <PopularCategories selectedCategory={selectedCategory} />
          <Add />
        </Col>
      )}
    </Row>
  );
}

export default PostsPage;
