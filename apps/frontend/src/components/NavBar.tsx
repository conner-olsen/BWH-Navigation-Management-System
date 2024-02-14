import React from "react";
import  DarkModeButton  from "./DarkModeButton.tsx";
import {useAuth0} from "@auth0/auth0-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
} from "./ui/dropdown-menu.tsx";

import {Nav} from "react-bootstrap";
import {Link, NavLink, useLocation} from "react-router-dom";
import {NavDropdown} from "react-bootstrap";
import {Button} from "./ui/button.tsx";


export default function NavBar() {


    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();

    const {pathname} = useLocation();
    if(pathname == "/") {
        return null;
    }
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

    <nav className="sticky-top top-0">
        <Nav className="navbarStyling relative filter-none z-50 shadow-md bg-blue-950 space-x-12 items-center">
            <Link to="/"><img src="public/BWH_Logo_Sheild.png" className="max-w-[50px] py-1"></img></Link>
            <Link to="/Home" className="text-lg no-underline p-2 text-white"> <div className={"hover:text-blue-500"}>Home</div></Link>
            <Link to="/EmployeeManager" className="text-lg no-underline p-2 text-white"><div className={"hover:text-blue-500"}>Employee Manager</div></Link>

            {isAuthenticated && (
                <Link to="/DataUpload" className="text-lg no-underline p-2 text-white"><div className={"hover:text-blue-500"}>Data Upload</div></Link>
            )}
            {isAuthenticated && (
                <Link to="/ServiceList" className="group text-center text-lg no-underline p-2 text-white"
                      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <div className={"hover:text-blue-500"}>Service Request</div>
                    <div className="mt-2 h-0 w-screen max-w-full group-hover:h-[20vh] absolute
                                    bg-blue-950 left-0 overflow-hidden flex justify-center
                                    transition-all duration-500">
                        <div>
                            <NavDropdown.Item as={Link} to="/ServiceList"><div className={"hover:text-blue-500"}>All Services</div></NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/FlowerService"><div className={"hover:text-blue-500"}>Flower Request</div></NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/ReligiousService"><div className={"hover:text-blue-500"}>Religious Request</div></NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/CleaningService"><div className={"hover:text-blue-500"}>Cleaning Request</div></NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/ServiceLog"><div className={"hover:text-blue-500"}>Service Log</div></NavDropdown.Item>
                        </div>
                    </div>
                </Link>
                )}


            {isAuthenticated && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"} className={"mt-0.5"}>
                            <img src={user.picture} alt={"Profile"} className={"UserProfile rounded-full w-8 h-8"}/>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <NavLink to="/UserPage" className={"no-underline text-black"}>
                                {user.name}
                                </NavLink>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>

                        <DropdownMenuItem onClick={() => lohgoutWithRedirect()}>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            {!isAuthenticated && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"} className={"mt-0.5"} onClick={() => loginWithRedirect()}>
                            Login
                        </Button>
                    </DropdownMenuTrigger>
                </DropdownMenu>
            )}
            <DarkModeButton/>
        </Nav>

        <div id="bg-blur" className="h-0 w-screen max-w-full absolute
                                        left-0 top-0 backdrop-blur-sm z-40
                                        transition-all duration-500"></div>
    </nav>


);
};
