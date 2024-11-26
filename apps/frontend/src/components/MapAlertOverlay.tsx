import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert.tsx";
import { Terminal } from "lucide-react";

interface MapAlertOverlayProps {
  showAlert: boolean;
}

const MapAlertOverlay: React.FC<MapAlertOverlayProps> = ({ showAlert }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
      {showAlert && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads Up!</AlertTitle>
          <AlertDescription>
            This path contains stairs. If this is difficult, please request an
            accessible route.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default MapAlertOverlay;
