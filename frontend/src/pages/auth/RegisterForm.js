import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/AuthForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import bird from "../../assets/bird.jpg";

import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";

import axios from "axios";

// code adapted from Moments lessons
const RegisterForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({})

  // from router
  const history = useHistory();

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      // this creates a key:value pair
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
              className={`${btnStyles.Button} ${btnStyles.Wide}`}
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
