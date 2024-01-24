import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const NavBar: React.FC = () => {
  return (
    <Container fluid>
      <Outlet />
      <Navbar variant="light" expand="lg">
        <Nav
          className="d-flex justify-content-between"
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
