/*
import React, { useState } from 'react';
import {Link} from "react-router-dom";

const ServiceRequestsButton: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    return (
        <div className={"btn"}>
            <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                Service requests
            </button>

            {isHovered && (
                <div className="options-container">
                    <Link to="/user-selection" className="option">
                        Option 1
                    </Link>
                    <Link to="/page2" className="option">
                        Option 2
                    </Link>
                    <Link to="/page3" className="option">
                        Option 3
                    </Link>
                    {/!* Add more options as needed *!/}
                </div>
            )}
        </div>
    );
};

export default ServiceRequestsButton;
*/
