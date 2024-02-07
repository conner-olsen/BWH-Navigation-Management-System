import React from "react";
import {Button, Dropdown, Nav, NavDropdown} from "react-bootstrap";
import  DarkModeButton  from "./DarkModeButton.tsx";
import { Link } from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";


export default function NavBar() {

    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();

    const lohgoutWithRedirect = () =>
        logout( {
            logoutParams: { returnTo: window.location.origin },
        });

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
                <Link to="/MapPage" className="text-sm no-underline p-2">Map Page</Link>

                {isAuthenticated && (
                <Link to="/NodeData" className="text-sm no-underline p-2">Node Data</Link>
                )}
                {isAuthenticated && (
                <Link to="/EdgeData" className="text-sm no-underline p-2">Edge Data</Link>
                )}
                {isAuthenticated && (
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
                )}

                <DarkModeButton></DarkModeButton>

                {isAuthenticated && (
                    <Dropdown id={"dropdown-button"} className="text-sm no-underline p-2">
                        <Dropdown.Toggle className="dropdown-basic">
                            <img src={user.picture} alt={"Profile"}  className={"UserProfile rounded-full w-8 h-8"}/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Header>{user.name}</Dropdown.Header>
                            <Dropdown.Item onClick={() => lohgoutWithRedirect()}>Log Out</Dropdown.Item>
                        </Dropdown.Menu>


                        </Dropdown>
                )}

                {!isAuthenticated && (
                <Button onClick={() => loginWithRedirect()}>Log in</Button>
                )}

            </Nav>

            <div id="bg-blur" className="h-0 w-screen max-w-full max-h-full absolute
                                        left-0 backdrop-blur-sm
                                        transition-all duration-500"></div>
        </nav>
    );
};
