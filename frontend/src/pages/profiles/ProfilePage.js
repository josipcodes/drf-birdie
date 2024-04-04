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

// built following Moments lessons
function ProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  // const [refresh, setRefresh] = useState(false);
  // extracting id from the url to know which profile to fetch
  const { id } = useParams();

  const [profileData, setProfileData] = useState({
    userProfiles: { results: [] },
  });

  const [currentProfile, setCurrentProfile] = useState()
  const [currentPosts, setCurrentPosts] = useState({ results: [] })
  const currentUser = useCurrentUser();

  // screen width check
  const smallScreen = useScreenWidth();



  // const is_owner = currentUser?.username === profile?.owner;

  // const handleFollow = async (clickedProfile) => {
  //   console.log(clickedProfile);
  //   try {
  //     // destructuring data property from the response object
  //     const { data } = await axiosResponse.post("/followers/", {
  //       // data sent is what profile user followed
  //       followed: clickedProfile.id,
  //     });
  //     return profile.id === clickedProfile.id
  //       ? // this is the profile user clicked on,
  //         // update its followers count and set its following id
  //         {
  //           ...profile,
  //           followers_count: profile.followers_count + 1,
  //           following_id: data.id,
  //         }
  //       : currentUser.is_owner
  //       ? // This is the profile of the logged in user
  //         // update its following count
  //         { ...currentUser, following_count: currentUser.following_count + 1 }
  //       : // this is not the profile the user clicked on or the profile
  //         // the user owns, so just return it unchanged
  //         profile;
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setRefresh(!refresh)
  // };

  //   const handleUnfollow = async (clickedProfile) => {
  //   console.log(clickedProfile)
  //   try {
  //     await axiosResponse.delete(`/followers/${clickedProfile.following_id}/`);
  //     // setProfileData((prevState) => ({
  //     //   ...prevState.pageProfiles,
  //     //   results: prevState.pageProfiles.results?.map((profile) => {
  //       setRefresh(!refresh)
  //         return profile.id === clickedProfile.id
  //           ? // This is the profile user clicked on,
  //             // update its followers count and remove its following id
  //             {
  //               ...profile,
  //               followers_count: profile.followers_count - 1,
  //               // setting following id to null
  //               following_id: null,
  //             }
  //           : profile.is_owner
  //           ? // This is the profile of the logged in user
  //             // update its following count
  //             { ...profile, following_count: profile.following_count - 1 }
  //           : // this is not the profile the user clicked on or the profile
  //             // the user owns, so just return it unchanged
  //             profile;
  //     //   }),
  //     // }));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const [selectedProfileData, currentUserProfileData] = await Promise.all([
  //         axiosRequest.get(`/profiles/${id}/`),
  //         axiosRequest.get(`/profiles/${currentUser?.profile_id}/`),
  //       ])
  //       if (selectedProfileData && currentUserProfileData) {
  //       setProfileData({
  //         selectedProfile: selectedProfileData.response,
  //         currentUserProfile: currentUserProfileData.response
  //       })}
  //       console.log(profileData)
  //       // setIsLoaded was set to true so the spinner is switched off and we can see the layout
  //       setIsLoaded(true);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchProfile();
  // }, [id]);

  useEffect(() => {
    FetchProfileData();
    // FetchPosts()
    // handleMount();
    setIsLoaded(true)
  }, [id]);

  // const handleMount = async () => {
  //   try {
  //     const { data } = await axiosRequest.get(
  //       // most followed profile will be at the top, but realistically, tbd if we want to change it
  //       "/profiles/"
  //     );
  //     setProfileData((prevState) => ({
  //       ...prevState,
  //       userProfiles: data,
  //     }));
  //     console.log(profileData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const FetchProfileData = async () => {
    try {
      const [profile, posts] = await Promise.all([
        axiosRequest.get(`/profiles/${id}/`),
        axiosRequest.get(`/posts/?.owner__profile=${id}/`)
      ])
      setCurrentProfile(profile.data);
      setCurrentPosts(posts.data);
      console.log(currentProfile);
      console.log(currentPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const mainProfile = (
      <Row noGutters className="text-center">
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
          {currentUser &&
            // !is_owner &&
            (currentProfile?.following_id ? (
              <Button
                className={bttnStyles.Button}
                // onClick={() => handleUnfollow(profile)}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className={bttnStyles.Button}
                // onClick={handleFollow(profile)}
              >
                Follow
              </Button>
            ))
            }
        </Col>
        <Col className={`${styles.ProfileText} align-content-center`}>
          {/* user stats */}
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="mt-2">
              <div>{currentProfile?.posts_count}</div>
              <span>Posts</span>
            </Col>
            <Col xs={3} className="mt-2">
              <div>{currentProfile?.followers_count}</div>
              <span>Followers</span>
            </Col>
            <Col xs={3} className="mt-2">
              <div>{currentProfile?.following_count}</div>
              <span>Following</span>
            </Col>
            <Col xs={3} className="mt-2">
              <div>{currentProfile?.saved_count}</div>
              <span>Saved posts</span>
            </Col>
          </Row>
        </Col>
      </Row>
  );

  const mainProfilePosts = (
    <>
      <p>Owner's posts</p>
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-md-1" md={8}>
        <Container className={`${appStyles.Content}`}>
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
