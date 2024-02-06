import React from "react";
import {Nav, NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {

    return (
        <div >
            <Nav className={"navbarStyling"}
            >
                <Nav.Link as={Link} to="/Home">
                        Pathfinding
                </Nav.Link>
                <Nav.Link as={Link} to="/NodeData">
                        Node Data
                </Nav.Link>
                <Nav.Link as={Link} to="/EdgeData">
                    Edge Data
                </Nav.Link>
                <NavDropdown
                    title="Service Requests"
                    id="basic-nav-dropdown">
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
                    <NavDropdown.Item as={Link} to="/ServiceLog">
                        Service Log
                    </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="More" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/Home">
                        Home
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/">
                        Login
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/NodeData">
                        Node Data
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/EdgeData">
                        Edge Data
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/ServiceList">
                        Services
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/MapPage">
                        Map Page
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <div className="Spacer"></div>
        </div>
    );
};
