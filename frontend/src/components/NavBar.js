import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/birdie.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import { removeTokenTimestamp } from "../utils/utils";
import useScreenWidth from "../hooks/useScreenWidth";
import PopularCategories from "./PopularCategories";
import useNavBarToggle from "../hooks/useNavBarToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // used to toggle navbar appearance
  const { expanded, setExpanded, ref } = useNavBarToggle();

  // screen width check
  const smallScreen = useScreenWidth();

  const handleLogOut = async () => {
    /* handles logging user out
    nullifies CurrentUser */
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  const newPost = (
    <NavLink
      to="/posts/create"
      className={styles.NavLink}
      activeClassName={styles.Active}
    >
      <i className="fa-solid fa-plus mr-2"></i>
      Post
    </NavLink>
  );

  const homePage = (
    <NavLink
      exact
      to="/"
      className={styles.NavLink}
      activeClassName={styles.Active}
    >
      Feed
    </NavLink>
  );

  const avatarDisplay = (
    <NavLink
      to={`/profiles/${currentUser?.profile_id}`}
      className={styles.NavLink}
    >
      {/* hiding username if too long, this matches mobile user's experience */}
      <Avatar
        src={currentUser?.profile_avatar}
        text={currentUser?.username.length <= 9 && currentUser?.username }
        height={38}
      />
    </NavLink>
  );

  const loggedInOptions = (
    <>
      <NavLink
        to="/feed"
        className={`${styles.NavLink} ${styles.NavLinkOffset}`}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-user-group mr-2"></i>
        Subscribed
      </NavLink>
      <NavLink
        to="/liked"
        className={`${styles.NavLink} ${styles.NavLinkOffset}`}
        activeClassName={styles.Active}
      >
        <i className="fas fa-heart mr-2"></i>
        Liked
      </NavLink>
      <NavLink
        to="/saved"
        className={`${styles.NavLink} ${styles.NavLinkOffset} ${
          smallScreen ? "mb-2" : ""
        }`}
        activeClassName={styles.Active}
      >
        <i className="fa-brands fa-earlybirds mr-2"></i>
        Saved
      </NavLink>
      {smallScreen && (
        // display popular categories when on smaller screens
        <PopularCategories className="text-right" />
      )}
      <NavLink
        to="/"
        className={`${styles.NavLink} ${styles.NavLinkOffset}`}
        onClick={handleLogOut}
      >
        Log out
      </NavLink>
    </>
  );

  const loggedOutOptions = (
    // using empty element as JSX can only return a single element
    <>
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
      {smallScreen && (
        // display popular categories when on smaller screens
        <PopularCategories className="text-right" />
      )}
    </>
  );

  return (
    <Navbar
      className={styles.NavBar}
      expand="md"
      fixed="top"
      bg="dark"
      variant="dark"
      expanded={expanded}
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
        <Nav className="mr-auto text-right">
          {currentUser ? newPost : homePage}
        </Nav>
        <Nav className="ml-auto text-left">
          {currentUser && smallScreen && avatarDisplay}
        </Nav>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          ref={ref}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            {currentUser ? (
              <>
                {loggedInOptions}
                {!smallScreen && avatarDisplay}
              </>
            ) : (
              loggedOutOptions
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
