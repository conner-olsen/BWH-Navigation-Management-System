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
import {Node} from "common/src/graph-structure.ts";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

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

            <div>
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

                <TransformWrapper
                    initialScale={1}
                    initialPositionX={0}
                    initialPositionY={0}
                    wheel={{step: 0.1, smoothStep: 0.01}}
                >
                    {({zoomIn, zoomOut, resetTransform}) => (
                        <React.Fragment>
                            <div className="tools flex flex-col absolute right-2 top-2 z-10">
                                <button onClick={() => zoomIn()}
                                        className="w-8 h-8 rounded-md bg-background flex items-center justify-center
                                    text-2xl shadow-md m-0.5">+</button>
                                <button onClick={() => zoomOut()}
                                        className="w-8 h-8 rounded-md bg-background flex items-center justify-center
                                    text-2xl shadow-md m-0.5">-</button>
                                <button onClick={() => resetTransform()}
                                        className="w-8 h-8 rounded-md bg-background flex items-center justify-center
                                    text-2xl shadow-md m-0.5">x</button>
                            </div>
                            <TransformComponent>
                                <svg viewBox="0 0 5000 3400" className={"w-[90vw]"}>
                                    <image href="../../public/maps/00_thelowerlevel1.png" width="5000" height="3400" x="0"
                                           y="0"/>
                                    {/*{graph && displayEdges(graph)}*/}
                                    {graph && path.length > 0 && displayPath(graph, path)}
                                    {graph && Array.from(graph.nodes.values()).map((node: Node) => (
                                        <g key={node.id} onClick={() => handleNodeClick(node)}
                                           onMouseEnter={() => handleNodeHover(node)}
                                           onMouseLeave={() => handleNodeHoverLeave()}>
                                            <circle cx={node.xCoord} cy={node.yCoord} r="9" fill="blue"
                                                    style={{cursor: 'pointer'}}/>
                                            {startNodeId === node.id && displaySelectedNodes(node, 'start')}
                                            {endNodeId === node.id && displaySelectedNodes(node, 'end')}
                                            {hoverNodeId === node.id && displayHoverInfo(node, 'hover')}
                                        </g>
                                    ))}
                                </svg>
                            </TransformComponent>
                        </React.Fragment>
                    )}
                </TransformWrapper>
            </div>

        </div>

    );
}
