//import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import BackButton from "../components/BackButton.tsx"; // Import Bootstrap CSS

const AdminLogin = () => {
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
      <div>
          <BackButton link={"/UserSelection"}></BackButton>

          <div className="container-sm mt-5">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <h3>Admin Login</h3>
          <form>
            <div className="mb-3 testClass">
              <img src="public/icon/user-icon.png" />
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                //value={username}
                //onChange={handleUsernameChange}
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
                //value={password}
                //onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="mb-3 testClass">
              <img src="public/icon/admin-id-icon.png" />
              <input
                type="password"
                className="form-control"
                id="adminID"
                placeholder="Admin ID"
                //value={password}
                //onChange={handlePasswordChange}
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
              <button type="submit" className="btn btn-primary">
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

export default AdminLogin;
