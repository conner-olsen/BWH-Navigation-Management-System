import React from "react";
import { Navbar, Nav } from "react-bootstrap"; //These components are used to build a responsive navigation bar.
import { Link } from "react-router-dom"; //This is used to create links between different pages in a React application.
import { Outlet } from "react-router-dom"; //The Outlet is a placeholder where child routes will be rendered.
import { Container } from "react-bootstrap"; //This is used to wrap the contents of the navigation bar in a container.
/*The Container component in Bootstrap is designed to constrain and center the content within a fixed-width container,
making it responsive*/
const NavBar: React.FC = () => {
  return (
    <Container fluid>
        {/*
        Begins a Bootstrap container that spans the entire width of the viewport.
        */}
      <Outlet />
      <Navbar variant="light" expand="lg">
        <Nav
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <Nav.Link className={"navUserSelect"} as={Link} to="/UserSelection">
            UserSelection
          </Nav.Link>
          <Nav.Link className={"navMap"} as={Link} to="/map">
            Map
          </Nav.Link>
          <Nav.Link className={"navRandom"} as={Link} to="/random">
            Random
          </Nav.Link>
          <Nav.Link className={"navRandom2"} as={Link} to="/random2">
            Random2
          </Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default NavBar;
