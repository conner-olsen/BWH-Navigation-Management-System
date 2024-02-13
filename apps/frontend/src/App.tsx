import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Global_Footer from "./components/Global_Footer.tsx";
import { NodeEdgeData } from "./routes/NodeEdgeData.tsx";
import HomePage from "./routes/HomePage.tsx";
import BFSRoute from "./routes/BFSRoute.tsx";
import FlowerServiceRequest from "./routes/ServiceRequests/FlowerServiceRequest.tsx";
import CleaningServiceRequest from "./routes/ServiceRequests/CleaningServiceRequest.tsx";
import ReligiousServiceRequest from "./routes/ServiceRequests/ReligiousServiceRequest.tsx";
import ServiceList from "./routes/ServiceRequests/ServiceList.tsx";
import ServiceLog from "./routes/ServiceRequests/ServiceLog.tsx";
import BwhHomepage from "./routes/BwhHomepage.tsx";
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
      <Outlet />
      <Global_Footer />
    </main>
  );
}

export default App;
