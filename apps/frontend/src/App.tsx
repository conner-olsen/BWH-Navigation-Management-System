import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Global_Header from "./components/Global_Header.tsx";
import { MapRoute } from "./routes/MapRoute.tsx";
import UserSelection from "./routes/UserSelection.tsx";
import Container from "react-bootstrap/Container";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "",
          element: <UserSelection />,
        },
        {
          path: "/map",
          element: <MapRoute />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
  function Root() {
    return (
      <main>
        <Container className={"w-100 h-100"}>
          <Global_Header></Global_Header>
          <Outlet />
        </Container>
      </main>
    );
  }
}

export default App;
