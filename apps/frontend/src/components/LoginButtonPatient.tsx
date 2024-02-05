import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const LoginButtonPatient = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
    <button onClick={() => loginWithRedirect()}>Log as patient</button>
    </>
  );
};

export default LoginButtonPatient;
