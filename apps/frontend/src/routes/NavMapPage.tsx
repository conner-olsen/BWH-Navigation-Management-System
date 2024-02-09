import {Link} from "react-router-dom";


const NavMapPage = () => {
    return (
        <div className="container flex flex-col relative">
            <div className="flex justify-between items-center z-10
                            hover:mb-[200px] transition-all duration-300">
                <h2>Floor 3</h2>
                <Link to={"/MapPage"} className="contents">
                    <img src={`public/maps/03_thethirdfloor.png`}
                         className="img-rotate"/>
                </Link>
            </div>

            <div className="flex justify-between items-center z-[9] relative bottom-[300px]
                            hover:mt-[200px] hover:mb-[200px] transition-all duration-300">
                <h2>Floor 2</h2>
                <img src={`public/maps/02_thesecondfloor.png`}
                     className="img-rotate"/>
            </div>

            <div className="flex justify-between items-center z-[8] relative bottom-[600px]
                            hover:mt-[200px] hover:mb-[200px] transition-all duration-300">
                <h2>Floor 1</h2>
                <img src={`public/maps/01_thefirstfloor.png`}
                     className="img-rotate"/>
            </div>

            <div className="flex justify-between items-center z-[7] relative bottom-[900px]
                            hover:mt-[200px] hover:mb-[200px] transition-all duration-300">
                <h2>Ground Floor</h2>
                <img src={`public/maps/00_thegroundfloor.png`}
                     className="img-rotate"/>
            </div>

            <div className="flex justify-between items-center z-[6] relative bottom-[1200px]
                            hover:mt-[200px] hover:mb-[200px] transition-all duration-300">
                <h2>Floor L1</h2>
                <img src={`public/maps/00_thelowerlevel1.png`}
                     className="img-rotate"/>
            </div>

            <div className="flex justify-between items-center z-[5] relative bottom-[1500px]
                            hover:mt-[200px] transition-all duration-300">
                <h2>Floor L2</h2>
                <img src={`public/maps/00_thelowerlevel2.png`}
                     className="img-rotate"/>
            </div>
        </div>
    );
};

export default NavMapPage;
