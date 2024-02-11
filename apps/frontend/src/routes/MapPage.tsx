import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.tsx";
// import MapGroundFloor from "../components/MapGroundFloor.tsx";
import MapLowerLevel1 from "../components/maps/MapLowerLevel1.tsx";
import MapLowerLevel2 from "../components/maps/MapLowerLevel2.tsx";
import MapFloor1 from "../components/maps/MapFloor1.tsx";
import MapFloor2 from "../components/maps/MapFloor2.tsx";
import MapFloor3 from "../components/maps/MapFloor3.tsx";
import Form from "react-bootstrap/Form";
import {Container} from "react-bootstrap";
import MapSidebar from "../components/MapSidebar.tsx";

export default function MapPage() {
    const [map, setMap] = useState("lowerLevel1");

    // const [groundFloorContentVisible, setGroundFloorContentVisible] = useState(false);
    const [lowerLevel1ContentVisible, setLowerLevel1ContentVisible] = useState(false);
    const [lowerLevel2ContentVisible, setLowerLevel2ContentVisible] = useState(false);
    const [floor1ContentVisible, setFloor1ContentVisible] = useState(false);
    const [floor2ContentVisible, setFloor2ContentVisible] = useState(false);
    const [floor3ContentVisible, setFloor3ContentVisible] = useState(false);

    useEffect(() => {
        // map === "groundFloor"
        //     ? setGroundFloorContentVisible(true) : setGroundFloorContentVisible(false);
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


    const handlePhotoChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {

        setMap(event.target.value);

    };

    return (
        <div>
            <Outlet/>
            <NavBar/>
            <MapSidebar/>
            <Container className="hidden">
                <br/>

                <Form.Select value={map} onChange={handlePhotoChange} size={"sm"}>

                    {/*<option value="groundFloor">The Ground Floor</option>*/}
                    <option value="lowerLevel1">The Lower Level 1</option>
                    <option value="lowerLevel2">The Lower Level 2</option>
                    <option value="floor1">Floor 1</option>
                    <option value="floor2">Floor 2</option>
                    <option value="floor3">Floor 3</option>
                </Form.Select>


                <br/>

                {/*{groundFloorContentVisible && <MapGroundFloor/>}*/}
                {lowerLevel1ContentVisible && <MapLowerLevel1/>}
                {lowerLevel2ContentVisible && <MapLowerLevel2/>}
                {floor1ContentVisible && <MapFloor1/>}
                {floor2ContentVisible && <MapFloor2/>}
                {floor3ContentVisible && <MapFloor3/>}
            </Container>

        </div>

    );
}
