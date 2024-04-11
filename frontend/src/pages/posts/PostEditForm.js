import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import bttnStyles from "../../styles/Button.module.css";
import authStyles from "../../styles/AuthForm.module.css";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRequest } from "../../api/axiosDefaults";
import axios from "axios";

import useScreenWidth from "../../hooks/useScreenWidth";

function PostEditForm() {
  const [errors, setErrors] = useState({});

  const [categories, setCategories] = useState("");

  const [postData, setPostData] = useState({
    content: "",
    image: "",
    category: "",
  });

  const { content, image, category } = postData;

  // We use this useRef hook to maintain a reference to the form file upload element.
  // Note it has a ref prop where we give it this hook below.
  const imageInput = useRef(null);

  // We use this useHistory hook to redirect the user.
  const history = useHistory();

  // using post id
  const { id } = useParams();

  // screen width check
  const smallScreen = useScreenWidth();

  useEffect(() => {
    // fetching categories
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/categories/");
        setCategories(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // fetching the post
    const fetchPost = async () => {
      try {
        const { data } = await axiosRequest.get(`/posts/${id}/`);
        // const { content, image, is_owner } = data;
        const { content, image, category, is_owner } = data;
        console.log(data);
        // if user is owner, prepopulate the post, else redirect
        is_owner
          ? setPostData({ content, image, category })
          : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
    // dependency array takes history and id.
  }, [history, id]);

  const handleChangePost = (e) => {
    // post change handler
    setPostData({
      ...postData,
      content: e.target.value,
    });
  };

  // copied from Moments lessons
  const handleChangeImage = (e) => {
    // image change handler
    // checking if there is a file
    console.log(e.target.files.length);
    if (e.target.files.length) {
      // revokeObjectURL is used to clear browser's reference to the previous file
      // used in cases when user decides to use a different image after upload
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleChangeCategory = (e) => {
    // category change handler
    setPostData({
      ...postData,
      category: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // prevents refresh
    e.preventDefault();
    const formData = new FormData();

    formData.append("content", content);
    // check if there is a file to be appended
    if (imageInput.current.files.length !== 0) {
      formData.append("image", imageInput.current.files[0]);
    }
    formData.append("category", category);

    // copied from Moments lessons
    // because we're sending image as well as text to our API,
    // we need to refresh our user's access token before making the request
    try {
      const { data } = await axiosRequest.put(`/posts/${id}/`, formData);
      console.log(data);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const categoryField = (
    // categorry field
    <div className="text-center">
      <Form.Group>
        <Form.Label htmlFor="category">Category</Form.Label>
        <Form.Control
          as="select"
          aria-label="tbd"
          id="category"
          onChange={handleChangeCategory}
        >
          <option disabled>Category</option>
          {categories.results?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}: {category.description}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {errors.category?.map((idx) => (
        <Alert variant="warning" key={idx}>
          You need to choose a category.
        </Alert>
      ))}
    </div>
  );

  const textField = (
    // text field
    <div className="text-center">
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="content"
          placeholder="Type your post"
          value={content}
          onChange={handleChangePost}
        />
      </Form.Group>
      {errors.content?.map((idx) => (
        <Alert variant="warning" key={idx}>
          Post has to contain at least some text.
        </Alert>
      ))}
    </div>
  );

  const imageField = (
    // image field
    <div>
      <Form.Group>
        {image ? (
          <>
            <figure>
              <Image className={authStyles.Image} src={image} rounded />
            </figure>
            <div className="mr-auto text-right">
              <Form.Label
                className={`${bttnStyles.Button} btn`}
                htmlFor="image-upload"
              >
                Change the image
              </Form.Label>
            </div>
          </>
        ) : (
          <Form.Label
            className={`${bttnStyles.Button} text-center ${
              smallScreen ? styles.ButtonRight : bttnStyles.Wide
            }`}
            htmlFor="image-upload"
          >
            <Asset buttonMessage="Click or tap to upload an image" />
          </Form.Label>
        )}
        <Form.File
          id="image-upload"
          accept="image/*"
          onChange={handleChangeImage}
          ref={imageInput}
          hidden
        />
      </Form.Group>
      {errors.image?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </div>
  );

  const buttonField = (
    // buttons field
    <div className="text-right">
      <Button
        className={`${bttnStyles.Button} m-2`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${bttnStyles.Button} m-2`} type="submit">
        Update
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        {/* display based on screen width */}
        {smallScreen ? (
          <>
            <Col className="p-0 p-md-2">
              <Container className={appStyles.Content}>
                <div>{textField}</div>
                <div>{categoryField}</div>
                <div className="p-2">{imageField}</div>
                <div>{buttonField}</div>
              </Container>
            </Col>
          </>
        ) : (
          <>
            <Col md={8} className="p-0 p-md-2">
              <Container className={appStyles.Content}>
                <div>{textField}</div>
                <div>{categoryField}</div>
                <div>{buttonField}</div>
              </Container>
            </Col>
            <Col className="py-2 p-0 p-md-2" md={4}>
              <Container className={`${appStyles.Content} ${styles.Container}`}>
                <div className="p-2">{imageField}</div>
              </Container>
            </Col>
          </>
        )}
      </Row>
    </Form>
  );
}

export default PostEditForm;
