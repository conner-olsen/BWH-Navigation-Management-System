import React from "react";
import {Nav, NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {

    return (
        <div>
            <Nav className="navbarStyling
                            relative">
                <Nav.Link as={Link} to="/Home">Home</Nav.Link>
                <Nav.Link as={Link} to="/NodeData">Node Data</Nav.Link>
                <Nav.Link as={Link} to="/EdgeData">Edge Data</Nav.Link>
                <Nav.Link as={Link} to="/ServiceList"
                          className="group">
                    Service Request
                    <div className="h-0 w-screen group-hover:h-28 absolute
                                    bg-amber-200 left-0 overflow-hidden z-10
                                    transition-all duration-500">
                        <NavDropdown.Item as={Link} to="/ServiceList">All Services</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/FlowerService">Send Flowers</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/ReligiousService">Religious Services</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/CleaningService">Cleaning Services</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/ServiceLog">Service Log</NavDropdown.Item>
                    </div>

                </Nav.Link>
                <Nav.Link as={Link} to="/Home"
                          className="group">More
                    <div className="h-0 w-screen group-hover:h-28 absolute
                                    bg-amber-200 left-0 overflow-hidden z-10
                                    transition-all duration-500">
                        <NavDropdown.Item as={Link} to="/Home">Home</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/">Login</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/NodeData">Node Data</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/EdgeData">Edge Data</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/ServiceList">Services</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/MapPage">Map Page</NavDropdown.Item>
                    </div>
                    <div className="h-0 w-screen group-hover:h-screen absolute
                                    left-0 backdrop-blur-none group-hover:backdrop-blur-sm
                                    transition-all duration-200"></div>
                </Nav.Link>
            </Nav>
            <div className="Spacer"></div>
        </div>
    );
};
