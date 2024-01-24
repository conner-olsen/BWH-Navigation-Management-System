import { Outlet } from "react-router-dom";

export function MapRoute() {
  return (
    <div>
      map page
      <Outlet></Outlet>
    </div>
  );
}
