import React, {useState} from "react";
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

import {Link, NavLink, useLocation} from "react-router-dom";
import {Button} from "./ui/button.tsx";
import ChatComponent from "./ChatBot.tsx";


export default function NavBar() {
// Responsive Navbar toggle
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

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
    const logoutWithRedirect = () =>
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

    <nav className="sticky top-0 z-50">
        <div className="navbarStyling relative filter-none z-50 shadow-md bg-blue-950 space-x-12 items-center flex
        justify-between px-4 xl:px-0">
            <Link to="/"><img src="public/BWH_Logo_Sheild.png" className="max-w-[50px] py-1" alt="Logo"></img></Link>

            <Link to="/Home" className="no-underline p-2 text-white hidden xl:block text-[17px]">
                <div className={"hover:text-blue-500"}>Map</div>
            </Link>

            {isAuthenticated && (
                <Link to="/EmployeeManager" className="no-underline p-2 text-white hidden xl:block text-[17px]">
                    <div className={"hover:text-blue-500"}>Data Manager</div>
                </Link>
            )}
            {/*{isAuthenticated && (*/}
            {/*    <Link to="/DataUpload" className="no-underline p-2 text-white hidden xl:block text-[17px]">*/}
            {/*        <div className={"hover:text-blue-500"}>Data Upload</div>*/}
            {/*    </Link>*/}
            {/*)}*/}


            <div className="group text-center no-underline p-2 text-white hidden xl:block text-[17px]"
                 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className={"hover:text-blue-500 cursor-pointer"}>Service Requests</div>
                <div className="mt-2 pt-2 h-0 w-screen max-w-full group-hover:h-[250px] absolute
                                bg-blue-950 left-0 overflow-hidden flex justify-center
                                transition-all duration-500">
                    <div>
                        <Link to="/ServiceList" className="dropdown-item">
                            <div className={"hover:text-blue-500 text-[17px]"}>All Services</div>
                        </Link>
                        <Link to="/FlowerService" className="dropdown-item">
                            <div className={"hover:text-blue-500 text-[17px]"}>Flower Request</div>
                        </Link>
                        <Link to="/ReligiousService" className="dropdown-item">
                            <div className={"hover:text-blue-500 text-[17px]"}>Religious Request</div>
                        </Link>
                        <Link to="/CleaningService" className="dropdown-item">
                            <div className={"hover:text-blue-500 text-[17px]"}>Cleaning Request</div>
                        </Link>
                        <Link to="/InternalTransportation" className="dropdown-item">
                            <div className={"hover:text-blue-500 text-[17px]"}>Internal Transportation</div>
                        </Link>
                        <Link to="/ExternalTransportation" className="dropdown-item">
                            <div className={"hover:text-blue-500 text-[17px]"}>External Transportation</div>
                        </Link>
                        <Link to="/LanguageService" className="dropdown-item">
                            <div className={"hover:text-blue-500 text-[17px]"}>Language Service</div>
                        </Link>
                    </div>
                </div>
            </div>

            {isAuthenticated && (
                <Link to="/ServiceLog" className="no-underline p-2 text-white hidden xl:block text-[17px]">
                    <div className={"hover:text-blue-500"}>Service Log</div>
                </Link>
            )}

            <Link to="/AboutPage" className="no-underline p-2 text-white hidden xl:block ml-2 text-[17px]">
                <div className={"hover:text-blue-500"}>About Us</div>
            </Link>

            <div className="hidden xl:block">
                <DarkModeButton/>
            </div>

            <div>
                <ChatComponent></ChatComponent>
            </div>

            <div className="flex items-center gap-2">
                {isAuthenticated && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>

                            <img src={user?.picture} alt={"Profile"} className={"UserProfile rounded-full w-8 h-8"}/>

                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <NavLink to="/UserPage" className={"no-underline text-foreground"}>
                                        {user?.nickname}
                                    </NavLink>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator/>

                            <DropdownMenuItem onClick={() => logoutWithRedirect()}>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
                {!isAuthenticated && (
                    <div className="hidden xl:block">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"default"} className={"mt-0.5"} onClick={() => loginWithRedirect()}>
                                    Login
                                </Button>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    </div>
                )}
                <div className="-mr-2 flex xl:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-500"
                    >
                        <span className="sr-only">Open main menu</span>
                        {!mobileMenuOpen ? (
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16m-7 6h7"/>
                            </svg>
                        ) : (
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>

        {mobileMenuOpen && (
            <div className={`xl:hidden absolute bg-blue-950 max-w-full w-screen z-50`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                    <Link to="/Home"
                          className="text-white hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium no-underline"
                            onClick={toggleMobileMenu}>
                        <div className={"hover:text-blue-500"}>Map</div></Link>
                    {isAuthenticated && (
                        <>
                            <Link to="/EmployeeManager" onClick={toggleMobileMenu}
                                  className="text-white hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium no-underline">
                                <div className={"hover:text-blue-500"}>Data Manager</div></Link>
                        </>
                    )}
                            <Link to="/ServiceList" onClick={toggleMobileMenu}
                                  className="text-white hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium no-underline">
                                <div className={"hover:text-blue-500"}>Service Requests</div></Link>
                    {isAuthenticated && (
                        <>
                            <Link to="/ServiceLog" onClick={toggleMobileMenu}
                                  className="text-white hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium no-underline">
                                <div className={"hover:text-blue-500"}>Service Log</div></Link>
                        </>
                    )}
                            <Link to="/AboutPage" onClick={toggleMobileMenu}
                                  className="text-white hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium no-underline">
                                <div className={"hover:text-blue-500"}>About Us</div></Link>

                    {!isAuthenticated && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"default"} className={"mt-0.5 mb-2"} onClick={() => loginWithRedirect()}>
                                    Login
                                </Button>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    )}
                    <DarkModeButton/>
                </div>
            </div>
        )}
        {mobileMenuOpen && (<div id="bg-blur" className="h-screen w-screen max-w-full absolute
                                        left-0 top-0 backdrop-blur-sm z-40
                                        transition-all duration-500"></div>)}
        <div id="bg-blur" className="h-0 w-screen max-w-full absolute
                                        left-0 top-0 backdrop-blur-sm z-40
                                        transition-all duration-500"></div>
    </nav>


);
};
