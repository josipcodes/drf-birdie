import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

import { useHistory, useParams } from "react-router-dom";
import { axiosResponse } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import bttnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import authStyles from "../../styles/AuthForm.module.css";

import bird from "../../assets/bird.jpg";

// based off of Moments with some adjustments
const EditUsernameForm = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosResponse.put("/dj-rest-auth/user/", {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
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
          <h1 className={authStyles.Header}>Change Username</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Change username</Form.Label>
              <Form.Control
                className={authStyles.Input}
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            {errors?.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="text-right">
              <Button
                className={`${bttnStyles.Button} mr-1`}
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
              <Button className={bttnStyles.Button} type="submit">
                Save
              </Button>
              {errors?.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" key={idx} className="mt-3">
                    {message}
                </Alert>
              ))}
            </div>
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

export default EditUsernameForm;
