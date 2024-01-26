import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const NavBar: React.FC = () => {
    async function populate() {
        const res = await fetch("/api/csv-to-json",{
            method:"POST",
            headers: {
                "Content-type":"Application/json"
            }
        });
        console.log(res);
    }
  return (
    <Container fluid>
      <Navbar variant="light" expand="lg">
        <Nav
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <Nav.Link className={"navUserSelect"} as={Link} to="/UserSelection">
            Login
          </Nav.Link>
          <Nav.Link className={"navMap"} as={Link} to="/map">
            Map
          </Nav.Link>
          <Nav.Link className={"navMap"} as={Link} to="/nonfunctional">
            About Us
          </Nav.Link>
          <Nav.Link className={"navMap"} as={Link} to="/nonfunctional">
            Appointments
          </Nav.Link>
            <button onClick={populate}></button>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default NavBar;
