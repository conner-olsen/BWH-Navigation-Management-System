import React from "react";
import  DarkModeButton  from "./DarkModeButton.tsx";
//import { Link } from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    //DropdownMenuShortcut,
    DropdownMenuGroup,
    //DropdownMenuPortal,
    //DropdownMenuSub,
    //DropdownMenuSubContent,
    //DropdownMenuSubTrigger,
} from "./ui/dropdown-menu.tsx";

import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import {NavDropdown} from "react-bootstrap";
import {Button} from "./ui/button.tsx";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "./ui/navigation-menu.tsx";


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
        <Nav className="navbarStyling relative filter-none z-50 shadow-md bg-blue-950 space-x-12">
            <Link to="/Home" className="text-lg no-underline p-2 text-white"> <div className={"hover:text-blue-500"}>Home</div></Link>
            <Link to="/MapPage" className="text-lg no-underline p-2 text-white"><div className={"hover:text-blue-500"}>Map Page</div></Link>

            {isAuthenticated && (
                <Link to="/NodeData" className="text-lg no-underline p-2 text-white"><div className={"hover:text-blue-500"}>Node Data</div></Link>
            )}
            {isAuthenticated && (
                <Link to="/EdgeData" className="text-lg no-underline p-2 text-white"><div className={"hover:text-blue-500"}>Edge Data</div></Link>
            )}
            {isAuthenticated && (
                <Link to="/ServiceList" className="group text-center text-lg no-underline p-2 text-white">
                    <div className={"hover:text-blue-500"}>Service Request</div>
                    <div className="mt-2 h-0 w-screen max-w-full group-hover:h-[20vh] absolute
                                    bg-blue-950 left-0 overflow-hidden flex justify-center
                                    transition-all duration-500" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
                                {user.name}
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

        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>Link</NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

        <div id="bg-blur" className="h-0 w-screen max-w-full max-h-full absolute
                                        left-0 backdrop-blur-sm
                                        transition-all duration-500"></div>
    </nav>


);
};
