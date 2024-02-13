import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Node } from "common/src/graph-structure.ts";
import PathfindingRequest from "common/src/PathfindingRequest.ts";
import MapDisplay from "./maps/MapDisplay.tsx";
import { parseCSV } from "common/src/parser.ts";
import nodeCSVString from "common/dev/nodeCSVString.ts";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet.tsx";
import { Button } from "./ui/button.tsx";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import MapLowerLevel2 from "../components/maps/MapLowerLevel2.tsx";
import MapFloor1 from "../components/maps/MapFloor1.tsx";
import MapFloor2 from "../components/maps/MapFloor2.tsx";
import MapFloor3 from "../components/maps/MapFloor3.tsx";

export function BFSComponent() {
    const [bfsResult, setBFSResult] = useState<Node[]>([]);
    const [startNode, setStartNode] = useState<string>("Select Start Location");
    const [endNode, setEndNode] = useState<string>("End Location");
    const [pathFindingType, setPathFindingType] = useState<string>("/api/bfsAstar-searching");
    const [mapKey, setMapKey] = useState<number>(0); // Key for forcing MapDisplay to remount

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

    //parse node CSV into array of CSVRows
    const CSVRow = parseCSV(nodeCSVString);
    //make array to be inserted in the html code
    const roomNames = [];


    //for each CSV row, add an option with the value as id and name as longName into array
    for (let i = 0; i < CSVRow.length; i++) {
        const row = CSVRow[i];
        const rowval = Object.values(row);
        const id = rowval[0];
        const longName = row["longName"];
        roomNames.push(<option value={id}> {longName} </option>);
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


    const handlePhotoChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {

        setMap(event.target.value);

    };

    return (
        <div>
            <h1 className="font-roboto font-extrabold italic"
                style={{ marginTop: '5%', fontSize: '60px' }}>Map Page</h1>

            <br />

            <Container>
                <Row>
                    <Col>
                        <p>Starting Location</p>
                        <Form.Select value={startNode} size={"sm"}
                                     onChange={e => setStartNode(e.target.value)}>
                            {roomNames}
                        </Form.Select>
                    </Col>
                    <Col>
                        <p>Destination</p>
                        <Form.Select value={endNode} size={"sm"}
                                     onChange={e => setEndNode(e.target.value)}>
                            {roomNames}
                        </Form.Select>
                    </Col>

                    <Col>
                        <p>Select Search Type</p>
                        <Form.Select value={pathFindingType} size={"sm"} onChange={e => setPathFindingType(e.target.value)}>
                            <option value={"/api/bfs-searching"}>BFS searching</option>
                            <option value={"/api/bfsAstar-searching"}>A-star searching</option>
                        </Form.Select>

                    </Col>

                    <Col>
                        <Form.Select value={map} onChange={handlePhotoChange} size={"sm"}>

                            {/*<option value="groundFloor">The Ground Floor</option>*/}
                            <option value="lowerLevel1">The Lower Level 1</option>
                            <option value="lowerLevel2">The Lower Level 2</option>
                            <option value="floor1">Floor 1</option>
                            <option value="floor2">Floor 2</option>
                            <option value="floor3">Floor 3</option>
                        </Form.Select>
                    </Col>

                    <Col>
                        <p>View Text Route</p>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline">Check Route</Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Route</SheetTitle>
                                    <SheetDescription>
                                        Follow this path to reach your destination
                                    </SheetDescription>
                                    <br />
                                </SheetHeader>
                                <ol type="1">
                                    {collectLongNames().map((longName, index) => (
                                        <li key={index}>{longName}</li>
                                    ))}
                                </ol>
                            </SheetContent>
                        </Sheet>

                    </Col>
                </Row>
            </Container>
            <br />


            <div className="relative w-[90vw] m-auto">
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
                                {lowerLevel1ContentVisible && <MapDisplay key={mapKey} startNode={startNode} endNode={endNode} pathFindingType={pathFindingType} sendHoverMapPath={sendHoverMapPath}/>}
                                {lowerLevel2ContentVisible && <MapLowerLevel2/>}
                                {floor1ContentVisible && <MapFloor1/>}
                                {floor2ContentVisible && <MapFloor2/>}
                                {floor3ContentVisible && <MapFloor3/>}
                            </TransformComponent>
                        </React.Fragment>
                    )}
                </TransformWrapper>
            </div>

        </div>

    );
}
