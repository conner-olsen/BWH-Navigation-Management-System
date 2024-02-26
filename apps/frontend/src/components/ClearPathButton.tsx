import React, { useState } from "react";

interface ClearPathButtonProps {
    sendClear: () => void;
}
const ClearPathButton = ({sendClear}: Readonly<ClearPathButtonProps>) => {
    const [isHovered, setHovered] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div className="container">
            <button
                className={"ClearPathButton"}
                onClick={() => sendClear()}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    color: 'white',
                    backgroundColor: isHovered ? 'rgb(59 130 246)'  : 'rgba(176,171,171,0.75)', // Change background color to gray by default
                    transition: 'background-color 0.5s ease', // Add a smooth transition effect
                }}
            >
                Clear Path
            </button>
        </div>
    );
};

export default ClearPathButton;
