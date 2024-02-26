import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap App component with BrowserRouter */}
      <Auth0Provider
          domain="dev-xexd0ia0muba7gyb.us.auth0.com"
          clientId="ptpUYhrQjqUCRdKIFStYFWDcCI2mv6IL"
          authorizationParams={{
              redirect_uri: "http://localhost:3000/Home"
          }}
      >
          <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
