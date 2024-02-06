import React from "react";
import {Nav, NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {
    const [, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        const customElement = document.getElementById('bg-blur');
        if (customElement) {
            customElement.classList.remove('h-0');
            customElement.classList.add('h-screen');
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        const customElement = document.getElementById('bg-blur');
        if (customElement) {
            customElement.classList.remove('h-screen');
            customElement.classList.add('h-0');
        }
    };


    return (
        <nav>
            <Nav className="navbarStyling relative filter-none z-10">
                <Nav.Link as={Link} to="/Home">Home</Nav.Link>
                <Nav.Link as={Link} to="/NodeData">Node Data</Nav.Link>
                <Nav.Link as={Link} to="/EdgeData">Edge Data</Nav.Link>
                <Nav.Link as={Link} to="/ServiceList" className="group text-center"
                          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    Service Request
                    <div className="h-0 w-screen max-w-full group-hover:h-28 absolute
                                    bg-white left-0 overflow-hidden
                                    transition-all duration-500">
                        <NavDropdown.Item as={Link} to="/ServiceList">All Services</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/FlowerService">Send Flowers</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/ReligiousService">Religious Services</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/CleaningService">Cleaning Services</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/ServiceLog">Service Log</NavDropdown.Item>
                    </div>

                </Nav.Link>
                <Nav.Link as={Link} to="/Home" className="group text-center"
                          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>More
                    <div className="h-0 w-screen max-w-full group-hover:h-28 absolute
                                    bg-white left-0 overflow-hidden
                                    transition-all duration-500">
                        <NavDropdown.Item as={Link} to="/Home" className="nav-drop-down-link">Home</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/" className="nav-drop-down-link">Login</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/NodeData" className="nav-drop-down-link">Node
                            Data</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/EdgeData" className="nav-drop-down-link">Edge
                            Data</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/ServiceList"
                                          className="nav-drop-down-link">Services</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/MapPage" className="nav-drop-down-link">Map
                            Page</NavDropdown.Item>
                    </div>

                </Nav.Link>
            </Nav>
            <div id="bg-blur" className="h-0 w-screen max-w-full max-h-full absolute
                                        left-0 backdrop-blur-sm
                                        transition-all duration-500"></div>
        </nav>
    );
};
