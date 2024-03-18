import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/birdie.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar
      className={styles.NavBar}
      expand="md"
      fixed="top"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="47px" />
        </Navbar.Brand>
        <Navbar.Brand className={`${styles.Brand} mr-auto text-right`} href="/">
          Birdie
        </Navbar.Brand>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
