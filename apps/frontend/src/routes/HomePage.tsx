import NavBar from "../components/NavBar.tsx";

const HomePage: React.FC = () => {
  return (
      <div>
          <NavBar/>
          <img
              className={"pictureOfL1"}
              src="public/maps/L1map.png"
              alt="Lower Level of Hospital (L1)"
              style={{marginTop: "60px"}}
          />
      </div>
  );
};

export default HomePage;
