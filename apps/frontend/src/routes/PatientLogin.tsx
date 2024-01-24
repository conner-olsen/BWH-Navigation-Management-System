//import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const PatientLogin = () => {
  /* IMPLEMENT SOON */

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  //
  // const handleUsernameChange = (event: string) => {
  //     setUsername(event);
  // };
  //
  // const handlePasswordChange = (event:string) => {
  //     setPassword(event);
  // };
  //
  // const handleSubmit = () => {
  //     // Handle form submission with the username and password
  //     console.log('Username:', username);
  //     console.log('Password:', password);
  //     // You can perform further actions like authentication here
  // };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Patient Login</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    <img src="public/icon/user-icon.png" />
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    //value={username}
                    //onChange={handleUsernameChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <img src="public/icon/password-icon.png" />
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    //value={password}
                    //onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
