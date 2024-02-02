import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Global_Header from "./components/Global_Header.tsx";
import Global_Footer from "./components/Global_Footer.tsx";
import { NodeData } from "./routes/NodeData.tsx";
import {EdgeData} from "./routes/EdgeData.tsx";
import UserSelection from "./routes/UserSelection.tsx";
import PatientLogin from "./routes/PatientLogin.tsx";
import HomePage from "./routes/HomePage.tsx";
import AdminLogin from "./routes/AdminLogin.tsx";
import BFSRoute from "./routes/BFSRoute.tsx";
import FlowerServiceRequest from "./routes/ServiceRequests/FlowerServiceRequest.tsx";
import CleaningServiceRequest from "./routes/ServiceRequests/CleaningServiceRequest.tsx";
import ReligiousServiceRequest from "./routes/ServiceRequests/ReligiousServiceRequest.tsx";
import ServiceList from "./routes/ServiceRequests/ServiceList.tsx";
import ServiceLog from "./routes/ServiceRequests/ServiceLog.tsx";
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
          path: "/NodeData",
          element: <NodeData />,
        },
          {
              path: "/EdgeData",
              element: <EdgeData />,
          },
        {
          path: "/Home",
          element: <HomePage />,
        },
        {
          path: "/AdminLogin",
          element: <AdminLogin />,
        },
          {
              path: "/",
              element: <BFSRoute/>
          },
          {
              path: "/FlowerService",
              element: <FlowerServiceRequest/>
          },
          {
              path: "/CleaningService",
              element: <CleaningServiceRequest/>
          },
          {
              path: "/ReligiousService",
              element: <ReligiousServiceRequest/>
          },
          {
              path: "/ServiceList",
              element: <ServiceList/>
          },
          {
              path: "/ServiceLog",
              element: <ServiceLog/>
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
