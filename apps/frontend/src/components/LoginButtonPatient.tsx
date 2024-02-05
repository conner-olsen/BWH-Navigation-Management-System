import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const LoginButtonPatient = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
    <button className="LoginButtonPatient" onClick={() => loginWithRedirect()}>Patient Login</button>
    </>
  );
};

export default LoginButtonPatient;
