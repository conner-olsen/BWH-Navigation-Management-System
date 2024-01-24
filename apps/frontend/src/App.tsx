import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Global_Header from "./components/Global_Header.tsx";
import { MapRoute } from "./routes/MapRoute.tsx";
import UserSelection from "./routes/UserSelection.tsx";
import PatientLogin from "./routes/PatientLogin.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <h1>Page not found</h1>,
      element: <Root />,
      children: [
        {
          path: "/UserSelection",
          element: <UserSelection />,
        },
        {
          path: "/PatientLogin",
          element: <PatientLogin />,
        },
        {
          path: "/map",
          element: <MapRoute />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <main>
      <Global_Header></Global_Header>
      <Outlet />
    </main>
  );
}

export default App;
