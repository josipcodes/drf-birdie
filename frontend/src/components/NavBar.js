import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/birdie.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
// import { CurrentUserContext } from "../App";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavBar = () => {
  // const currentUser = useContext(CurrentUserContext);
  const currentUser = useCurrentUser();
  const loggedInOptions = <>{currentUser?.username}</>;

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
            <NavLink
              exact
              to="/"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              Home
            </NavLink>
          </Nav>
          <Nav className="ml-auto text-right">
            {currentUser ? loggedInOptions : loggedOutOptions}
            {/* <NavLink
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
            </NavLink> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
