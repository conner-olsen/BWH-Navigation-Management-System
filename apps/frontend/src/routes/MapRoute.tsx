import { Outlet } from "react-router-dom";
import BackButton from "../components/BackButton.tsx";

export function MapRoute() {
  return (
    <div>
      <BackButton></BackButton>
      <img
        className={"pictureOfL1"}
        src="public/icon/00_thelowerlevel1 (2).png"
        alt="Lower Level of Hospital (L1)"
        style={{ marginTop: "60px" }}
      />
      <Outlet></Outlet>
    </div>
  );
}
