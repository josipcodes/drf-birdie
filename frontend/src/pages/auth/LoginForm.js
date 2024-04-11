import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/AuthForm.module.css";
import bttnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import bird from "../../assets/bird.jpg";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";
import { useRedirect } from "../../hooks/useRedirect";

// code adapted from Moments lessons
function LoginForm() {
  const setCurrentUser = useSetCurrentUser();
  // redirect when already logged in
  useRedirect('loggedIn')

  const [signInData, setSignInData] = useState({
    username: "",
    password: ""
  });

  const { username, password } = signInData;

  const [errors, setErrors] = useState({})

  const history = useHistory();

  const handleChange = (e) => {
    // update form fields
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    // prevents refresh
    e.preventDefault();
    try {
      const { data } = await axios.post("dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      // extracting exp date from the access token, saves it to user's browser in local storage.
      setTokenTimestamp(data);
      // return to previous page upon logging in
      history.goBack();
    } catch(err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-md-2" md={5}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>Sign in</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
              className={styles.Input}
              type="text"
              placeholder="Enter Username"
              name="username"
              value={username}
              onChange={handleChange}
              />
            </Form.Group>
            {errors?.username?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
              className={styles.Input}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.password?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
            <Button
              type="submit"
              className={`${bttnStyles.Button} ${bttnStyles.Wide}`}
            >
              Login
            </Button>
            {errors?.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" key={idx} className="mt-3">
                    {message}
                </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/register">
            Don't have an account? <span>Register now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={7}
        className={`my-auto d-none d-md-block p-2 ${styles.AuthCol}`}
      >
        <Image
          className={`${styles.Image} ${appStyles.Content}`}
          src={bird}
        />
      </Col>
    </Row>
  );
}


export default LoginForm;
