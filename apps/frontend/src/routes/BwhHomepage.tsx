import React, { useEffect, useState } from 'react';
import LoginButtonAdmin from "../components/LoginButtonAdmin.tsx";
import LoginButtonPatient from "../components/LoginButtonPatient.tsx";
import { Link } from 'react-router-dom';

const BwhHomepage: React.FC = () => {
    const [fadeIn, setFadeIn] = useState<boolean>(false);
    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    useEffect(() => {
        // Trigger the fade-in effect after a short delay
        const timeoutId = setTimeout(() => {
            setFadeIn(true);
        }, 500);

        // Clear the timeout to avoid triggering the effect multiple times
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="bg-black h-screen flex items-center justify-center">
            <img
                className="absolute top-0 left-0 w-full h-full object-cover opacity-15"
                src={"../public/images/Redesign1_Homepage.png"}
                alt="Background"
            />
            <div className="flex flex-col items-center justify-center h-full text-center text-white">
                <h1
                    className={`text-white transition-opacity ${
                        fadeIn ? 'opacity-100' : 'opacity-0'
                    } duration-1000 ease-in-out`} // figure out how to make this longer and smoother
                >
                    WELCOME TO BRIGHAM & WOMEN'S HOSPITAL
                </h1>

                <div>
                    <LoginButtonAdmin/>
                </div>
                <div>
                    <LoginButtonPatient/>
                    <div className="LoginButtonGuest">
                        <Link
                            to="/NodeData"
                            style={{
                                textDecoration: 'none',
                                color: isHovered ? '#297fb8' : 'white',
                                fontSize: '20px',
                                transition: 'color 0.5s ease',
                            }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            CONTINUE AS GUEST
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BwhHomepage;
