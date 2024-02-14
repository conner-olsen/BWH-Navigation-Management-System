import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Node } from "common/src/graph-structure.ts";
import PathfindingRequest from "common/src/PathfindingRequest.ts";
import MapDisplay from "./maps/MapDisplay.tsx";
import { parseCSV } from "common/src/parser.ts";
import Form from "react-bootstrap/Form";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select.tsx";
// import MapLowerLevel2 from "../components/maps/MapLowerLevel2.tsx";
// import MapFloor1 from "../components/maps/MapFloor1.tsx";
// import MapFloor2 from "../components/maps/MapFloor2.tsx";
// import MapFloor3 from "../components/maps/MapFloor3.tsx";

export function BFSComponent() {
    const [bfsResult, setBFSResult] = useState<Node[]>([]);
    const [startNode, setStartNode] = useState<string>("Select Start Location");
    const [endNode, setEndNode] = useState<string>("End Location");
    const [pathFindingType, setPathFindingType] = useState<string>("/api/bfsAstar-searching");
    const [mapKey, setMapKey] = useState<number>(0); // Key for forcing MapDisplay to remount
    const [doDisplayEdges, setDoDisplayEdges] = useState<boolean>(false);
    const [doDisplayNodes, setDoDisplayNodes] = useState<boolean>(true);
    const [doDisplayNames, setDoDisplayNames] = useState<boolean>(false);

    const fetchData = useCallback(async (): Promise<AxiosResponse<Node[]>> => {
        try {
            const request: PathfindingRequest = {
                startid: startNode,
                endid: endNode
            };
            const response: AxiosResponse<Node[]> = await axios.post(pathFindingType, request, {
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (response.status === 200) {
                setBFSResult(response.data);
            }

            return response;
        } catch (error) {
            console.error("Error fetching BFS result:", (error as AxiosError).message);
            throw error;
        }
    }, [startNode, endNode, pathFindingType]);

    useEffect(() => {
        fetchData()
            .then(response => {
                // Handle success
                console.log(response.data);
            })
            .catch(error => {
                // Handle error
                console.error("Error:", error.message);
                // Optionally set state or show error message to the user
            });
    }, [fetchData]);

    useEffect(() => {
        // When pathFindingType changes, update mapKey to force remount of MapDisplay
        setMapKey(prevKey => prevKey + 1);
    }, [pathFindingType]);

    const collectLongNames = () => {
        return bfsResult.map(node => node.longName);
    };

    const [nodeCSVData, setNodeCSVData] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to the API endpoint
                const res = await fetch("/api/download-node-csv");

                // Check if the request was successful (status code 2xx)
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }


                const result = await res.text();
                // Set the data in the state
                setNodeCSVData(result);
            } catch (err) {
                // Handle errors
                console.log("Failed");
            }
        };

        fetchData().then();
    }, []); //





    //parse node CSV into array of CSVRows
    const CSVRow = parseCSV(nodeCSVData);
    //make array to be inserted in the html code
    const roomNames = [];


    //for each CSV row, add an option with the value as id and name as longName into array
    for (let i = 0; i < CSVRow.length; i++) {
        const row = CSVRow[i];
        const rowval = Object.values(row);
        const id = rowval[0];
        const nodeId = row["nodeId"];
        const longName = row["longName"];
        roomNames.push(<option value={id}> {nodeId + " " + "(" + longName + ")"} </option>);
    }

    const sendHoverMapPath = (path: PathfindingRequest) => {
        setStartNode(path.startid);
        setEndNode(path.endid);
    };

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


    // const handlePhotoChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    //
    //     setMap(event.target.value);
    //
    // };
    const handlePhotoChange = (map: string) => {
        setMap(map);
    };
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <div className="fixed top-0 left-0 h-screen w-[80px] bg-neutral-500 text-white z-20 px-4 pt-[100px]
                      flex flex-col">
                <button onClick={toggleSidebar} className="text-xl text-white focus:outline-none">
                    {isExpanded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    )}
                </button>
            </div>
            <div
                className={`fixed top-0 left-0 h-screen w-[400px] bg-background text-foreground z-10 pl-[96px] pt-[100px] sidebar 
      ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
                {/* Sidebar content */}
                <div className="relative w-full">
                    <h2 className="text-xl font-semibold mb-4">Map Page</h2>
                    <div>
                        <p>Display Options</p>
                        <Form.Check
                            inline
                            type="switch"
                            id="display-edges-switch"
                            label="Display Edges"
                            checked={doDisplayEdges}
                            onChange={() => setDoDisplayEdges(!doDisplayEdges)}
                        />
                        <Form.Check
                            inline
                            type="switch"
                            id="display-nodes-switch"
                            label="Display Nodes"
                            checked={doDisplayNodes}
                            onChange={() => setDoDisplayNodes(!doDisplayNodes)}
                        />
                        <Form.Check
                            inline
                            type="switch"
                            id="display-names-switch"
                            label="Display Names"
                            checked={doDisplayNames}
                            onChange={() => setDoDisplayNames(!doDisplayNames)}
                        />

                </div>
                    <div>
                        <p>Starting Location</p>
                        <Form.Select value={startNode} size={"sm"}
                                     onChange={e => setStartNode(e.target.value)}>
                            {roomNames}
                        </Form.Select>
                    </div>
                    <div>
                        <p>Destination</p>
                        <Form.Select value={endNode} size={"sm"}
                                     onChange={e => setEndNode(e.target.value)}>
                            {roomNames}
                        </Form.Select>
                    </div>
                    <div>
                        <p>Select Search Type</p>
                        <Form.Select value={pathFindingType} size={"sm"}
                                     onChange={e => setPathFindingType(e.target.value)}>
                            <option value={"/api/bfs-searching"}>BFS searching</option>
                            <option value={"/api/bfsAstar-searching"}>A-star searching</option>
                        </Form.Select>
                    </div>
                    <div>
                        <p>Select da floor bro</p>
                        <Select defaultValue={"floor1"} onValueChange={handlePhotoChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="lowerLevel1">The Lower Level 1</SelectItem>
                                <SelectItem value="lowerLevel2">The Lower Level 2</SelectItem>
                                <SelectItem value="floor1">Floor 1</SelectItem>
                            </SelectContent>
                        </Select>

                        {/*<Form.Select value={map} onChange={handlePhotoChange} size={"sm"}>*/}

                        {/*    /!*<option value="groundFloor">The Ground Floor</option>*!/*/}
                        {/*    <option value="lowerLevel1">The Lower Level 1</option>*/}
                        {/*    <option value="lowerLevel2">The Lower Level 2</option>*/}
                        {/*    <option value="floor1">Floor 1</option>*/}
                        {/*    <option value="floor2">Floor 2</option>*/}
                        {/*    <option value="floor3">Floor 3</option>*/}
                        {/*</Form.Select>*/}
                    </div>
                    <div>
                        <p className="font-bold">Follow me</p>
                        <ol type="1" className={"overflow-scroll h-96"}>
                            {collectLongNames().map((longName, index) => (
                                <li key={index}>{longName}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
            <div className="relative w-screen max-w-full m-auto">
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
                            <TransformComponent wrapperClass={"max-h-screen"}>
                                {lowerLevel1ContentVisible && <MapDisplay key={mapKey} floorMap={"public/maps/00_thelowerlevel1.png"} floor={"L1"} startNode={startNode} endNode={endNode} pathFindingType={pathFindingType} sendHoverMapPath={sendHoverMapPath}
                                                                          doDisplayNames={doDisplayNames} doDisplayEdges={doDisplayEdges} doDisplayNodes={doDisplayNodes}   />}
                                {lowerLevel2ContentVisible && <MapDisplay key={mapKey} floorMap={"public/maps/00_thelowerlevel2.png"} floor={"L2"} startNode={startNode} endNode={endNode} pathFindingType={pathFindingType} sendHoverMapPath={sendHoverMapPath}
                                                                          doDisplayNames={doDisplayNames} doDisplayEdges={doDisplayEdges} doDisplayNodes={doDisplayNodes}   />}
                                {floor1ContentVisible && <MapDisplay key={mapKey} floorMap={"public/maps/01_thefirstfloor.png"} floor={"1"} startNode={startNode} endNode={endNode} pathFindingType={pathFindingType} sendHoverMapPath={sendHoverMapPath}
                                                                     doDisplayNames={doDisplayNames} doDisplayEdges={doDisplayEdges} doDisplayNodes={doDisplayNodes}   />}
                                {floor2ContentVisible && <MapDisplay key={mapKey} floorMap={"public/maps/02_thesecondfloor.png"} floor={"2"} startNode={startNode} endNode={endNode} pathFindingType={pathFindingType} sendHoverMapPath={sendHoverMapPath}
                                                                     doDisplayNames={doDisplayNames} doDisplayEdges={doDisplayEdges} doDisplayNodes={doDisplayNodes}   />}
                                {floor3ContentVisible && <MapDisplay key={mapKey} floorMap={"public/maps/03_thethirdfloor.png"} floor={"3"} startNode={startNode} endNode={endNode} pathFindingType={pathFindingType} sendHoverMapPath={sendHoverMapPath}
                                                                     doDisplayNames={doDisplayNames} doDisplayEdges={doDisplayEdges} doDisplayNodes={doDisplayNodes}   />}
                            </TransformComponent>
                        </React.Fragment>
                    )}
                </TransformWrapper>
            </div>

        </div>

    );
}

