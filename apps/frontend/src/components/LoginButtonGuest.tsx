import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginButtonGuest: React.FC = () => {
    const [isHovered, setHovered] = useState(false);
    const history = useHistory();

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleButtonClick = () => {
        history.push("/Home");
    };

    return (
        <div className="container">
            <button
                className = "LoginButtonGuest"
                onClick={handleButtonClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    color: 'white',
                    backgroundColor: isHovered ? 'lightblue' : 'gray', // Change background color to gray by default
                    transition: 'background-color 0.5s ease', // Add a smooth transition effect
                }}
            >
                GUEST
            </button>
        </div>
    );
};

export default LoginButtonGuest;
