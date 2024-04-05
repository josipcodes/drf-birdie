import React, { useEffect, useState } from "react";


import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import { useHistory, useParams } from "react-router-dom";
import { axiosResponse } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


import bttnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import authStyles from "../../styles/AuthForm.module.css"

import bird from "../../assets/bird.jpg";

// copied from Moments with minor adjustments
const UserEditPasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();


  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;


  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // redirect user if they are not the owner of this profile
      history.push("/");
    }
  }, [currentUser, history, id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosResponse.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };


  return (
    <Row className={authStyles.Row}>
      <Col className="my-auto p-md-2" md={5}>
        <Container className={`${appStyles.Content} p-4`}>
        <h1 className={authStyles.Header}>Change Password</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="new_password1">
              <Form.Label className="d-none">New password</Form.Label>
              <Form.Control
              className={authStyles.Input}
                placeholder="New password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group controlId="new_password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
              className={authStyles.Input}
                placeholder="Confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Button
              className={`${bttnStyles.Button} mr-1`}
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`${bttnStyles.Button}`}
            >
              Save
            </Button>
          </Form>
        </Container>
      </Col>
      <Col
        md={7}
        className={`my-auto d-none d-md-block p-2 ${authStyles.AuthCol}`}
      >
        <Image
          className={`${authStyles.Image} ${appStyles.Content}`}
          src={bird}
        />
      </Col>
    </Row>
  );
};


export default UserEditPasswordForm;
