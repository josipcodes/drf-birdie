import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import bttnStyles from "../../styles/Button.module.css";

import PopularCategories from "../../components/PopularCategories";
import useScreenWidth from "../../hooks/useScreenWidth";
import { axiosRequest, axiosResponse } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom";
import { Button, Image } from "react-bootstrap";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Post from "../posts/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { ProfileEditDropdown } from "../../components/Dropdowns";

// built following Moments lessons, with major changes
function ProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  // extracting id from the url to know which profile to fetch
  const { id } = useParams();


  const [currentProfile, setCurrentProfile] = useState()
  const [currentPosts, setCurrentPosts] = useState({ results: [] })
  const currentUser = useCurrentUser();
  const [currentUserProfile, setCurrentUserProfile] = useState()

  // screen width check
  const smallScreen = useScreenWidth();

  const FetchProfileData = async () => {
    /* Function fetches current profile
    and current profile posts */
    try {
      const [profile, posts] = await Promise.all([
        axiosRequest.get(`/profiles/${id}/`),
        axiosRequest.get(`/posts/?owner__profile=${id}`)
      ])
      setCurrentProfile(profile.data);
      setCurrentPosts(posts.data);
    } catch (err) {
      console.log(err);
    }
  };

  const FetchCurrentUserProfile = async () => {
    /* Function fetches current user profile */
    try {
      console.log("id", currentUser.profile_id)
      const profile = await axiosRequest.get(`/profiles/${currentUser.profile_id}/`);
      console.log(profile.data)
      setCurrentUserProfile(profile.data)
      console.log("CURRENT USER PROFILE", currentUserProfile);
    } catch (err) {
      console.log(err);
  };
}

  useEffect(() => {
    FetchProfileData();
    if (currentUser) {
      FetchCurrentUserProfile();
    }
    setIsLoaded(true)
  }, [id, currentUser?.profile_id]);

  const handleFollow = async () => {
    /* Function updates current profile and 
    current user profile data after following them */
    try {
      // destructuring data property from the response object
      const { data } = await axiosResponse.post("/followers/", {
        // data sent is what profile user followed
        followed: currentProfile.id,
      });
      setCurrentProfile(prevCurrentProfile => ({
        ...prevCurrentProfile,
        followers_count: currentProfile.followers_count + 1,
        following_id: data.id,
    }))
    setCurrentUserProfile(prevCurrentUserProfile => ({
      ...prevCurrentUserProfile,
      following_count: currentUserProfile.followers_count + 1,
    }))
    } catch (err) {
      console.log(err);
    }
  };

    const handleUnfollow = async () => {
    /* Function updates current profile and 
    current user profile data after following them */
    try {
      await axiosResponse.delete(`/followers/${currentProfile.following_id}/`);
      setCurrentProfile(prevCurrentProfile => ({
        ...prevCurrentProfile,
        followers_count: currentProfile.followers_count - 1,
        following_id: null,
      }))
      setCurrentUserProfile(prevCurrentUserProfile => ({
        ...prevCurrentUserProfile,
        following_count: currentUserProfile.followers_count - 1,
      }))
    } catch (err) {
      console.log(err);
    }
  };

  const mainProfile = (
    <>
    {currentProfile?.is_owner && <ProfileEditDropdown id={currentProfile?.id} />}
      <Row noGutters className={`text-center ${appStyles.Content}`}>
        <Col md={2} className=" mt-1 offset-lg-0">
          <Image
            className={`${styles.ProfileAvatar}`}
            roundedCircle
            src={currentProfile?.avatar}
          />
        </Col>
        <Col md={5} className="mt-1 align-content-center">
          <h3 className={styles.ProfileUsername}>{currentProfile?.owner}</h3>
        </Col>
        <Col
          md={3}
          className="mt-1 offset-md-2 text-lg-right d-flex justify-content-end pr-3"
        >
          {currentUser && !currentProfile?.is_owner &&
            (currentProfile?.following_id ? (
              <Button
                className={bttnStyles.Button}
                onClick={handleUnfollow}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className={bttnStyles.Button}
                onClick={handleFollow}
              >
                Follow
              </Button>
            ))
            }
        </Col>
        <Col className={`${styles.ProfileText} align-content-center`}>
          {/* user stats */}
          <Row className="justify-content-center no-gutters mt-2">
            <Col xs={3} className="pr-4">
              <div>{currentProfile?.posts_count}</div>
              <span>Posts</span>
            </Col>
            <Col xs={3} className="pr-2">
              <div>{currentProfile?.followers_count}</div>
              <span>Followers</span>
            </Col>
            <Col xs={3} className="pl-2">
              <div>{currentProfile?.following_count}</div>
              <span>Following</span>
            </Col>
            <Col xs={3} className="pl-4">
              <div>{currentProfile?.saved_count}</div>
              <span>Status</span>
            </Col>
          </Row>
        </Col>
          <Col xs={12} className={`${styles.ProfileText} text-left mt-3`}>
        <div><strong>Name: </strong>{currentProfile?.name}</div>
        <div className="mt-2"><strong>Bio: </strong>{currentProfile?.bio}</div>
        </Col>
      </Row>
      </>
  );

  const mainProfilePosts = (
    <>
      {currentPosts.results.length ? (
        <InfiniteScroll
          children={currentPosts.results.map((post) => (
            <Post key={post.id} {...post} className={appStyles.Content} setCurrentPosts={setCurrentPosts} profilePage />
          ))}
          dataLength={currentPosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!currentPosts.next}
          next={() => fetchMoreData(currentPosts, currentPosts)}
        />
      ) : (
        <div className={`${appStyles.Content}`}>
        <Asset
          message={`${currentProfile?.owner} hasn't posted yet.`}
        />
        </div>
      )}
    </>

  );

  return (
    <Row>
      <Col className="py-2 p-md-1" md={8}>
        <Container >
          {isLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      {!smallScreen && (
        // display popular categories when on desktop
        <Col md={4} className="p-md-2">
          <PopularCategories />
        </Col>
      )}
    </Row>
  );
}

export default ProfilePage;
