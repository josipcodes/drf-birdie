import React from "react";
import bird from "../assets/bird.jpg";
import { Image, Row, Container, Col } from "react-bootstrap";
import styles from "../styles/PageNotFound.module.css";
import authStyles from "../styles/AuthForm.module.css";
import appStyles from ".././App.module.css";

const PageNotFound = () => {
  return (
    <Row className={authStyles.Row}>
      <Col className="my-auto offset-md-2" md={8}>
        <Container className={`${appStyles.Content}`}>
          <h1 className={`${appStyles.Main} ${authStyles.Header}`}>
            This page seems to have flown away
          </h1>
          <Image
            className={`${authStyles.Image} ${styles.NotFound}`}
            src={bird}
          />
          <h2 className={styles.Subheader}>Do you ever feel like a plastic bag</h2>
        </Container>
      </Col>
    </Row>
  );
};

export default PageNotFound;
