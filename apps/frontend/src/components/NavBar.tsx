import React from "react";
import {Nav, NavDropdown} from "react-bootstrap";
import  DarkModeButton  from "./DarkModeButton.tsx";
import { Link } from "react-router-dom";


export default function NavBar() {

    const handleMouseEnter = () => {
        const customElement = document.getElementById('bg-blur');
        if (customElement) {
            customElement.classList.remove('h-0');
            customElement.classList.add('h-screen');
        }
    };

    const handleMouseLeave = () => {
        const customElement = document.getElementById('bg-blur');
        if (customElement) {
            customElement.classList.remove('h-screen');
            customElement.classList.add('h-0');
        }
    };


    return (
        <nav>
            <Nav className="navbarStyling relative filter-none z-10
                            shadow-md">
                <Link to="/Home" className="text-sm no-underline p-2">Home</Link>
                <Link to="/NodeData" className="text-sm no-underline p-2">Node Data</Link>
                <Link to="/EdgeData" className="text-sm no-underline p-2">Edge Data</Link>
                <Link to="/ServiceList" className="group text-center text-sm no-underline p-2"
                          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    Service Request
                    <div className="mt-7 h-0 w-screen max-w-full group-hover:h-[20vh] absolute
                                    bg-white left-0 overflow-hidden flex justify-center
                                    transition-all duration-500">
                        <div>
                            <NavDropdown.Item as={Link} to="/ServiceList">All Services</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/FlowerService">Send Flowers</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/ReligiousService">Religious Services</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/CleaningService">Cleaning Services</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/ServiceLog">Service Log</NavDropdown.Item>
                        </div>

                    </div>

                </Link>
                <Link to="/Home" className="group text-center text-sm no-underline p-2"
                          onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>More
                    <div className="mt-7 h-0 w-screen max-w-full group-hover:h-[20vh] absolute
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

                </Link>
                <DarkModeButton></DarkModeButton>
            </Nav>

            <div id="bg-blur" className="h-0 w-screen max-w-full max-h-full absolute
                                        left-0 backdrop-blur-sm
                                        transition-all duration-500"></div>
        </nav>
    );
};
