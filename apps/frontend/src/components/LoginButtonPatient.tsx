import React, {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";


const LoginButtonPatient = () => {
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
                className="LoginButtonPatient"
                onClick={() => loginWithRedirect()}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    color: isHovered ? '#your-hover-color' : '#your-default-color',
                    transition: 'color 0.5s ease', // smooth color fade in
                }}
            >
                PATIENT
            </button>
        </div>
    );
};

export default LoginButtonPatient;
