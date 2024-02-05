import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const LoginButtonAdmin = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <>
            <button onClick={() => loginWithRedirect()}>Log in as Admin</button>
        </>
    );
};

export default LoginButtonAdmin;
