import React from "react";
import { Routes, Route } from "react-router-dom";
import { NodeEdgeData } from "./routes/NodeEdgeData.tsx";
import MapPage from "./routes/MapPage.tsx";
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
import InternalTransportation from "./routes/ServiceRequests/InternalTransportation.tsx";
import LanguageService from "./routes/ServiceRequests/LanguageService.tsx";
import AboutPage from "./routes/AboutPage.tsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<BwhHomepage />} />
        <Route path="/BwhHomepage" element={<BwhHomepage />} />
        <Route path="/DataUpload" element={<NodeEdgeData />} />
        <Route path="/Home" element={<MapPage />} />
        <Route path="/FlowerService" element={<FlowerServiceRequest />} />
        <Route path="/CleaningService" element={<CleaningServiceRequest />} />
        <Route path="/ReligiousService" element={<ReligiousServiceRequest />} />
        <Route path="/LanguageService" element={<LanguageService />} />
        <Route
          path="/ExternalTransportation"
          element={<ExternalTransportation />}
        />
        <Route
          path="/InternalTransportation"
          element={<InternalTransportation />}
        />
        <Route path="/ServiceList" element={<ServiceList />} />
        <Route path="/ServiceLog" element={<ServiceLog />} />
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/DataManager" element={<EmployeeManager />} />
        <Route path="/AboutPage" element={<AboutPage />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
