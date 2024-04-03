import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import PopularCategories from "../../components/PopularCategories";
import useScreenWidth from "../../hooks/useScreenWidth";
import { axiosRequest } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { useParams } from "react-router-dom";
import { Image } from "react-bootstrap";

// built following Moments lessons
function ProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  // extracting id from the url to know which profile to fetch
  const { id } = useParams();
  // defining setProfileData so we can use it in try block
  const setProfileData = useSetProfileData();

  // screen width check
  const smallScreen = useScreenWidth();

  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  console.log(profile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [{ data: pageProfile }] = await Promise.all([
          axiosRequest.get(`/profiles/${id}/`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        // setIsLoaded was set to true so the spinner is switched off and we can see the layout
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className="text-center">
        <Col md={2} className=" mt-1 offset-lg-0">
          <Image
            className={`${styles.ProfileAvatar}`}
            roundedCircle
            src={profile?.avatar}
          />
        </Col>
        <Col md={5} className="mt-1 align-content-center">
        <h3 className={styles.ProfileUsername}>{profile?.owner}</h3>
        </Col>
        <Col md={3} className="mt-1 offset-md-2 text-lg-right justify-content-end">
        <p className={`${styles.ProfileText} p-3`}>Follow button</p>
        </Col>

        {/* don't touch */}
        <Col className={`${styles.ProfileText} align-content-center`}>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="mt-2">
              <div>{profile?.posts_count}</div>
              <span>Posts</span>
            </Col>
            <Col xs={3} className="mt-2">
              <div>{profile?.followers_count}</div>
              <span>Followers</span>
            </Col>
            <Col xs={3} className="mt-2">
              <div>{profile?.following_count}</div>
              <span>Following</span>
            </Col>
            <Col xs={3} className="mt-2">
              <div>{profile?.saved_count}</div>
              <span>Saved posts</span>
            </Col>
            {/* don't touch */}
          </Row>
          </Col>
      </Row>
      <Row>
      <Col className="p-3">Profile content</Col>
      </Row>
    </>
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
