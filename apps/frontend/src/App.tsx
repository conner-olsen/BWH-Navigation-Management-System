import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { NodeEdgeData } from "./routes/NodeEdgeData.tsx";
import HomePage from "./routes/HomePage.tsx";
import BFSRoute from "./routes/BFSRoute.tsx";
import FlowerServiceRequest from "./routes/ServiceRequests/FlowerServiceRequest.tsx";
import CleaningServiceRequest from "./routes/ServiceRequests/CleaningServiceRequest.tsx";
import ReligiousServiceRequest from "./routes/ServiceRequests/ReligiousServiceRequest.tsx";
import ServiceList from "./routes/ServiceRequests/ServiceList.tsx";
import ServiceLog from "./routes/ServiceRequests/ServiceLog.tsx";
import BwhHomepage from "./routes/BwhHomepage.tsx";
import UserPage from "./routes/UserPage.tsx";
import EmployeeManager from "./routes/EmployeeManagement.tsx";
import NavBar from "./components/NavBar.tsx";
import ExternalTransportation from "./routes/ServiceRequests/ExternalTransportation.tsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <h1>Page not found</h1>,
      element: <Root />,
      children: [
        {
          path: "/",
          element: <BwhHomepage />,
        },
          {
              path: "/BwhHomepage",
              element: <BwhHomepage />,
          },
        {
          path: "/DataUpload",
          element: <NodeEdgeData />,
        },
        {
          path: "/HomeOUTDATED",
          element: <HomePage />,
        },
          {
              path: "/Home",
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
              path: "/ExternalTransportation",
              element: <ExternalTransportation/>
          },
          {
              path: "/ServiceList",
              element: <ServiceList/>
          },
          {
              path: "/ServiceLog",
              element: <ServiceLog/>
          },
          {
              path: "/UserPage",
              element: <UserPage/>
          },
          {
              path: "/EmployeeManager",
              element: <EmployeeManager/>
          }

      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <main>
        <NavBar></NavBar>

        <Outlet />
    </main>
  );
}

export default App;
