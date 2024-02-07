import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import BackButton from "../components/BackButton.tsx";
import NavBar from "../components/NavBar.tsx";
// import MapDisplay from "../components/MapDisplay.tsx";
import MapGroundFloor from "../components/MapGroundFloor.tsx";
import MapLowerLevel1 from "../components/MapLowerLevel1.tsx";
import MapLowerLevel2 from "../components/MapLowerLevel2.tsx";
import MapFloor1 from "../components/MapFloor1.tsx";
import MapFloor2 from "../components/MapFloor2.tsx";
import MapFloor3 from "../components/MapFloor3.tsx";

export default function MapPage() {
    // const [selectedPhoto, setSelectedPhoto] = useState("00_thegroundfloor.png");
    const [map, setMap] = useState("Select Map");
    const [floorName, setFloorName] = useState("The Ground Floor");

    const [groundFloorContentVisible, setGroundFloorContentVisible] = useState(false);
    const [lowerLevel1ContentVisible, setLowerLevel1ContentVisible] = useState(false);
    const [lowerLevel2ContentVisible, setLowerLevel2ContentVisible] = useState(false);
    const [floor1ContentVisible, setFloor1ContentVisible] = useState(false);
    const [floor2ContentVisible, setFloor2ContentVisible] = useState(false);
    const [floor3ContentVisible, setFloor3ContentVisible] = useState(false);

    useEffect(() => {
        map === "groundFloor"
            ? setGroundFloorContentVisible(true) : setGroundFloorContentVisible(false);
        map === "lowerLevel1"
            ? setLowerLevel1ContentVisible(true) : setLowerLevel1ContentVisible(false);
        map === "lowerLevel2"
            ? setLowerLevel2ContentVisible(true) : setLowerLevel2ContentVisible(false);
        map === "floor1"
            ? setFloor1ContentVisible(true) : setFloor1ContentVisible(false);
        map === "floor2"
            ? setFloor2ContentVisible(true) : setFloor2ContentVisible(false);
        map === "floor3"
            ? setFloor3ContentVisible(true) : setFloor3ContentVisible(false);
    }, [map]);

    const renderResult = () => {
        let result;
        return result;
    };

    const handlePhotoChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        // setSelectedPhoto(event.target.value);
        setMap(event.target.value);

        switch (event.target.value) {
            case "groundFloor":
                setFloorName("The Ground Floor");
                break;
            case "lowerLevel1":
                setFloorName("The Lower Level 1");
                break;
            case "lowerLevel2":
                setFloorName("The Lower Level 2");
                break;
            case "floor1":
                setFloorName("Floor 1");
                break;
            case "floor2":
                setFloorName("Floor 2");
                break;
            case "floor3":
                setFloorName("Floor 3");
                break;
            default:
                setFloorName("");
        }
    };

    return (
        <div style={{textAlign: "center", marginTop: "20px"}}>
            <NavBar/>
            <div style={{
                position: "absolute",
                top: "40px",  // Adjust the top value to move it higher
                right: "10px",  // Adjust the right value to move it to the right
            }}>
                <BackButton/>
            </div>

            <div style={{marginLeft: "10px", marginBottom: "20px", textAlign: "left"}}>
                <label htmlFor="mapSelector" style={{fontWeight: "bold", display: "block"}}>
                    Select Map:
                </label>
                <select
                    id="mapSelector"
                    value={map}
                    onChange={handlePhotoChange}
                    style={{width: "300px"}}
                >
                    <option value="groundFloor">The Ground Floor</option>
                    <option value="lowerLevel1">The Lower Level 1</option>
                    <option value="lowerLevel2">The Lower Level 2</option>
                    <option value="floor1">Floor 1</option>
                    <option value="floor2">Floor 2</option>
                    <option value="floor3">Floor 3</option>
                </select>
                {groundFloorContentVisible && <MapGroundFloor />}
                {lowerLevel1ContentVisible && <MapLowerLevel1 />}
                {lowerLevel2ContentVisible && <MapLowerLevel2 />}
                {floor1ContentVisible && <MapFloor1 />}
                {floor2ContentVisible && <MapFloor2 />}
                {floor3ContentVisible && <MapFloor3 />}
            </div>

            <div style={{
                background: "linear-gradient(to right, #3498db, #000000)",
                borderRadius: "10px",
                padding: "10px",
                width: "900px",
                marginLeft: "500px",
                marginTop: "20px"

            }}>
                <div style={{
                    color: "white",
                    fontWeight: "bold"
                }}>
                    {floorName && `Floor: ${floorName}`}
                </div>
            </div>

            <div style={{
                display: "inline-block",
                background: "linear-gradient(to right, #3498db, #000000)",
                borderRadius: "10px",
                padding: "20px",
                marginTop: "20px"
            }}>
                {renderResult()}
            </div>

            <Outlet/>
        </div>

    );
}
