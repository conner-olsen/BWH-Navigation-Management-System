import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ExampleRoute from "./routes/ExampleRoute.tsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "",
          element: <ExampleRoute />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
  function Root() {
    return (
      <div className="w-100 h-100 d-flex flex-column overflow-auto">
        <h1>Welcome to your starter code.</h1>
        <Outlet />
      </div>
    );
  }
}

export default App;
