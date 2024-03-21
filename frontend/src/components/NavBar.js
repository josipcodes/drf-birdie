import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/birdie.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
// import { CurrentUserContext } from "../App";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  // const currentUser = useContext(CurrentUserContext);
  const currentUser = useCurrentUser();
  console.log("currentUser", currentUser)
  const setCurrentUser = useSetCurrentUser();

  const handleLogOut = async () => {
    /* handles logging user out
    nullifies CurrentUser
    tbd if a better process can be implemented before going live */
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };


  const newPost = (
    <NavLink
      to="/posts/create"
      className={styles.NavLink}
      activeClassName={styles.Active}
    >
      New post
    </NavLink>
  );

  const homePage = (
    <NavLink
    exact
    to="/"
    className={styles.NavLink}
    activeClassName={styles.Active}
  >
    Home
  </NavLink>
  )


  const loggedInOptions = (
    // using empty element as JSX can only return a single element
    <>
    <NavLink
      to="/feed"
      className={`${styles.NavLink} ${styles.NavLinkOffset}`}
      activeClassName={styles.Active}
    >
      Feed
    </NavLink>
    <NavLink
      to="/liked"
      className={`${styles.NavLink} ${styles.NavLinkOffset}`}
      activeClassName={styles.Active}
    >
      Liked
    </NavLink>
    <NavLink
      to="/"
      className={`${styles.NavLink} ${styles.NavLinkOffset}`}
      onClick={handleLogOut}
    >
      Log out
    </NavLink>
    <NavLink
      to={`/profiles/${currentUser?.profile_id}`}
      className={styles.NavLink}
      onClick={() => {}}
    >
      <Avatar src={currentUser?.profile_avatar} text={currentUser?.username} height={38} />
    </NavLink>
  </>
  )

  const loggedOutOptions = (
    // using empty element as JSX can only return a single element
    <>
      {" "}
      <NavLink
        to="/login"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Log in
      </NavLink>
      <NavLink
        to="/register"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Register
      </NavLink>
    </>
  );

  return (
    <Navbar
      className={styles.NavBar}
      expand="md"
      fixed="top"
      bg="dark"
      variant="dark"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="47px" />
          </Navbar.Brand>
          <Navbar.Brand className={`${styles.Brand} mr-auto text-right`}>
            Birdie
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto text-right">
          {currentUser ? newPost : homePage}
          </Nav>
          <Nav className="ml-auto text-right">
            {currentUser ? loggedInOptions : loggedOutOptions}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
