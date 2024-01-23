import { Outlet } from "react-router-dom";

const UserSelection = () => {
  return (
    <div>
      <img
        className="hospitalPhoto"
        src="public/hospital.jpeg"
        alt="Hospital Image"
      />
      <Outlet />
      <div className="button_layer">test</div>
    </div>
  );
};

export default UserSelection;
