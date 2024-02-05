import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const LoginButtonAdmin = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <>
            <button className="LoginButtonAdmin" onClick={() => loginWithRedirect()}>Admin Login</button>
        </>
    );
};

export default LoginButtonAdmin;
