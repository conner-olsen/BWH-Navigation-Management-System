import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButtonAdmin = () => {
  const { loginWithRedirect } = useAuth0();
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
        className="LoginButtonAdmin"
        onClick={() => loginWithRedirect()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          color: "white",
          backgroundColor: isHovered ? "#83B5D1" : "gray", // Change background color to gray by default
          transition: "background-color 0.5s ease", // Add a smooth transition effect
        }}
      >
        ADMIN
      </button>
    </div>
  );
};

export default LoginButtonAdmin;
