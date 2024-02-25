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
                onClick={() => sendClear()}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    color: 'white',
                    backgroundColor: isHovered ? '#83B5D1'  : 'gray', // Change background color to gray by default
                    transition: 'background-color 0.5s ease', // Add a smooth transition effect
                }}
            >
                Clear Path
            </button>
        </div>
    );
};

export default ClearPathButton;
