interface MapProps {
  onImageClick: (info: string) => void;
}

const NavMapPage: React.FC<MapProps> = ({ onImageClick }) => {
  const handleMapChange = (mapID: string) => {
    onImageClick(mapID);
  };

  return (
    <div className="flex flex-col relative m-auto max-w-[600px] max-h-screen overflow-y-hidden pt-[100px]">
      <div
        className="flex justify-center gap-5 items-center z-[9]
                            hover:mb-[75px] transition-all duration-300"
      >
        <h2>Floor 3</h2>
        <img
          src={`public/maps/03_thethirdfloor.png`}
          className="img-rotate cursor-pointer"
          onClick={() => handleMapChange("floor3")}
        />
      </div>

      <div
        className="flex justify-center gap-5 items-center z-[8] relative bottom-[100px]
                            hover:mt-[75px] hover:mb-[75px] transition-all duration-300"
      >
        <h2>Floor 2</h2>
        <img
          src={`public/maps/02_thesecondfloor.png`}
          className="img-rotate cursor-pointer"
          onClick={() => handleMapChange("floor2")}
        />
      </div>

      <div
        className="flex justify-center gap-5 items-center z-[7] relative bottom-[200px]
                            hover:mt-[75px] hover:mb-[75px] transition-all duration-300"
      >
        <h2>Floor 1</h2>
        <img
          src={`public/maps/01_thefirstfloor.png`}
          className="img-rotate cursor-pointer"
          onClick={() => handleMapChange("floor1")}
        />
      </div>

      {/*<div className="flex justify-center gap-5 items-center z-[7] relative bottom-[900px]*/}
      {/*                hover:mt-[200px] hover:mb-[200px] transition-all duration-300">*/}
      {/*    <h2>Ground Floor</h2>*/}
      {/*    <Link to={"/MapPage"} className="contents">*/}
      {/*        <img src={`public/maps/00_thegroundfloor.png`}*/}
      {/*             className="img-rotate"/>*/}
      {/*    </Link>*/}
      {/*</div>*/}

      <div
        className="flex justify-center gap-5 items-center z-[6] relative bottom-[300px]
                            hover:mt-[75px] hover:mb-[75px] transition-all duration-300"
      >
        <h2>Floor L1</h2>
        <img
          src={`public/maps/00_thelowerlevel1.png`}
          className="img-rotate cursor-pointer"
          onClick={() => handleMapChange("lowerLevel1")}
        />
      </div>

      <div
        className="flex justify-center gap-5 items-center z-[5] relative bottom-[400px]
                            hover:mt-[75px] transition-all duration-300"
      >
        <h2>Floor L2</h2>
        <img
          src={`public/maps/00_thelowerlevel2.png`}
          className="img-rotate cursor-pointer"
          onClick={() => handleMapChange("lowerLevel2")}
        />
      </div>
    </div>
  );
};

export default NavMapPage;
