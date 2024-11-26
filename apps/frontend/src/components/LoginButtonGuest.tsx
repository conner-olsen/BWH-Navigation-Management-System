import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginButtonGuest: React.FC = () => {
  const [isHovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleButtonClick = () => {
    navigate("/Home");
  };

  return (
    <div className="container">
      <button
        className="LoginButtonGuest"
        onClick={handleButtonClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          color: "white",
          backgroundColor: isHovered ? "#83B5D1" : "gray", // Change background color to gray by default
          transition: "background-color 0.5s ease", // Add a smooth transition effect
        }}
      >
        GUEST
      </button>
    </div>
  );
};

export default LoginButtonGuest;
