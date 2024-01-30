import React from "react";
import {Nav, NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {

    return (
        <div>
            <Nav
                className="generalNavBar"
            >
                <Nav.Link className={"navMap"} as={Link} to="/">
                        Home
                </Nav.Link>
                <Nav.Link className={"navMap"} as={Link} to="/UserSelection">
                        Login
                </Nav.Link>
                <Nav.Link className={"navMap"} as={Link} to="/map">
                        Map
                </Nav.Link>
                <Nav.Link className={"navMap"} as={Link} to="/bfs">
                        Breadth-First Search
                </Nav.Link>
                <NavDropdown title="Service Requests" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/ServiceList">
                        All Services
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/FlowerService">
                        Send Flowers
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/ReligiousService">
                        Religious Services
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/CleaningService">
                        Cleaning Services
                    </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="More" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/">
                        Home
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/UserSelection">
                        Login
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/UserSelection">
                        All Services
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/map">
                        Map
                    </NavDropdown.Item>
                </NavDropdown>


            </Nav>
            <div className="Spacer"></div>
        </div>

    );
};
