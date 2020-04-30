import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Avatar from "react-avatar";
import "../css/index.css";
import firebase from "firebase";

const Navigation = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <NavLink className="nav-link" to="/">
              <div className="bg-logo" />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavLink className="nav-link" to="/posts/1">
                Posts
              </NavLink>
              <NavLink className="nav-link" to="/admin">
                Create Post
              </NavLink>
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
              <NavDropdown title="Learn" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">ReactJs</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">NextJs</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Firebase</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    firebase.auth().signOut();
                  }}
                >
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className="nav-avatar">
              <NavLink className="nav-link" to="/">
                Welcome
                <span
                  className="welcomeMsg"
                  style={{ padding: "0 0 10px 3px", margin: "0 0 10px 3px" }}
                >
                  {firebase.auth().currentUser?.displayName} !!{" "}
                </span>
                <Avatar
                  facebookId={firebase.auth().currentUser?.providerData[0]?.uid}
                  size="36"
                  round={true}
                  alt="sign out"
                />
              </NavLink>
            </div>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                size="sm"
                className="mr-sm-2"
              />
              <Button size="sm" variant="outline-success">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
