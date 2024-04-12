import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosRequest } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import bttnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import postFormStyles from "../../styles/PostCreateEditForm.module.css";
import authStyles from "../../styles/AuthForm.module.css";

import useScreenWidth from "../../hooks/useScreenWidth";

// based off of Moments with many adjustments
const EditProfileForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    avatar: "",
  });

  const { name, bio, avatar } = profileData;

  const [errors, setErrors] = useState({});

  // screen width check
  const smallScreen = useScreenWidth();

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosRequest.get(`/profiles/${id}/`);
          const { name, bio, avatar } = data;
          setProfileData({ name, bio, avatar });
        } catch (err) {
          // console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };
    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // prevents refresh
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);

    if (imageFile?.current?.files[0]) {
      formData.append("avatar", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosRequest.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_avatar: data.avatar,
      }));
      // return user to previous page, i.e. profile
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  const avatarField = (
    // avatar section
    <Form.Group>
      {avatar && (
        <figure>
          <Image className={authStyles.Image} src={avatar} fluid />
        </figure>
      )}
      {errors?.avatar?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <div className="mr-auto text-right">
        <Form.Label
          className={`${bttnStyles.Button} btn`}
          htmlFor="image-upload"
        >
          Change the image
        </Form.Label>
      </div>
      <Form.File
        hidden
        id="image-upload"
        ref={imageFile}
        accept="image/*"
        onChange={(e) => {
          if (e.target.files.length) {
            setProfileData({
              ...profileData,
              avatar: URL.createObjectURL(e.target.files[0]),
            });
          }
        }}
      />
    </Form.Group>
  );

  const textFields = (
    // name and bio section
    <>
      <Form.Group>
        <Form.Label>Your name</Form.Label>
        <Form.Control
          as="textarea"
          value={name}
          placeholder="Your name"
          rows={1}
          name="name"
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Your bio</Form.Label>
        <Form.Control
          as="textarea"
          value={bio}
          placeholder="Your bio"
          name="bio"
          rows={4}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.bio?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </>
  );

  const buttonField = (
    // button field
    <div className="text-right">
      <Button
        className={`${bttnStyles.Button} m-2`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${bttnStyles.Button} m-2`} type="submit">
        Post
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        {/* screen width check */}
        {smallScreen ? (
          <Col className="p-0 p-md-2">
            <Container className={appStyles.Content}>
              <div>{textFields}</div>
              <div>{avatarField}</div>
              <div>{buttonField}</div>
            </Container>
          </Col>
        ) : (
          <>
            <Col md={8} className="p-0 p-md-2">
              <Container className={appStyles.Content}>
                <div>{textFields}</div>
                <div>{buttonField}</div>
              </Container>
            </Col>
            <Col className="py-2 p-0 p-md-2" md={4}>
              <Container
                className={`${appStyles.Content} ${postFormStyles.Container}`}
              >
                <div className="p-2">{avatarField}</div>
              </Container>
            </Col>
          </>
        )}
      </Row>
    </Form>
  );
};

export default EditProfileForm;
