import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router-dom";

const PatientLogin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        // Handle form submission with the username and password
        console.log('Username:', username);
        console.log('Password:', password);
        // Hard-coded authentication (will connect to database in the future)

        //let patientID: string = "patient";
        //let patientPassword: string = "patient";

        navigate("/Home");
    };

  return (
      <div>

          <div className="container-sm mt-5">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <h3>Patient Login</h3>
          <form>
            <div className="mb-3 testClass">
              <img src="public/icon/user-icon.png" />
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div className="mb-3 testClass">
              <img src="public/icon/password-icon.png" />
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="mb-3 testClass2">
              <div>
                <input type="checkbox"></input>
                <label>Remember me</label>
              </div>
              <a href="">Forgot password?</a>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
      </div>
  );
};

export default PatientLogin;
