import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/AuthForm.module.css";
import bttnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import bird from "../../assets/bird.jpg";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import axios from "axios";

import { useRedirect } from "../../hooks/useRedirect";

// code adapted from Moments lessons
const RegisterForm = () => {
  // redirect when already logged in
  useRedirect('loggedIn')
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({})

  const history = useHistory();

  const handleChange = (e) => {
    // update form fields
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // prevents refresh
    e.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/login");
    } catch (err) {
      // if response isn't defined, it won't throw an error
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className={`${styles.AuthCol} my-auto p-md-2`} md={5}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>Sign up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
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
            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.password1?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.password2?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Button
              className={`${bttnStyles.Button} ${bttnStyles.Wide}`}
              type="submit"
            >
              Register
            </Button>
            {errors?.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" key={idx} className="mt-3">
                    {message}
                </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/login">
            Already have an account? <span>Login</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={7}
        className={`my-auto d-none d-md-block p-2 ${styles.AuthCol}`}
      >
        <Image className={`${styles.Image} ${appStyles.Content}`} src={bird} />
      </Col>
    </Row>
  );
};

export default RegisterForm;
