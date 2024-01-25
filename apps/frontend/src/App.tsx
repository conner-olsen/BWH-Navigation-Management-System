import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Global_Header from "./components/Global_Header.tsx";
import Global_Footer from "./components/Global_Footer.tsx";
import { MapRoute } from "./routes/MapRoute.tsx";
import UserSelection from "./routes/UserSelection.tsx";
import PatientLogin from "./routes/PatientLogin.tsx";
import HomePage from "./routes/HomePage.tsx";
import AdminLogin from "./routes/AdminLogin.tsx";
import BFSRoute from "./routes/BFSRoute.tsx";

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
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/AdminLogin",
          element: <AdminLogin />,
        },
          {
              path: "/bfs",
              element: <BFSRoute/>
          }
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
      <Global_Footer></Global_Footer>
    </main>
  );
}

export default App;
