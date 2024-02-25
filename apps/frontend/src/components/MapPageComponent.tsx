import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import PathfindingRequest from "common/interfaces/pathfinding-request.ts";
import MapDisplay from "./maps/MapDisplay.tsx";
import { parseCSV } from "common/src/parser.ts";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "./ui/hovercard.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select.tsx";
import {NodeServiceRequestComponent} from "./NodeServiceRequestComponent.tsx";
import {Alert, AlertDescription, AlertTitle } from "./ui/alert.tsx";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger
} from "./ui/drawer.tsx";
import {Button} from "./ui/button.tsx";
import {Node} from "common/src/node.ts";
import {Switch} from "./ui/switch.tsx";


export function BFSComponent() {
    const [pathfindingResult, setBFSResult] = useState<Node[]>([]);
    const [startNode, setStartNode] = useState<string>("");
    const [endNode, setEndNode] = useState<string>("");
    const [pathFindingType, setPathFindingType] = useState<string>("A*");
    const [mapKey, setMapKey] = useState<number>(0); // Key for forcing MapDisplay to remount
    const [doDisplayEdges, setDoDisplayEdges] = useState<boolean>(false);
    const [doDisplayNodes, setDoDisplayNodes] = useState<boolean>(true);
    const [doDisplayNames, setDoDisplayNames] = useState<boolean>(false);
    const [currentNode, setCurrentNode] = useState<Node | null>(null);
    const [doAccessible, setDoAccessible] = useState<boolean>(false);

    const collectLongNames = useCallback(() => {
        return pathfindingResult.map(node => node.longName);
    }, [pathfindingResult]);

    const handleSpeakButtonClick = () => {
        const longNames = collectLongNames();
        const speech = new SpeechSynthesisUtterance();
        speech.text = longNames.join(', ');
        window.speechSynthesis.speak(speech);
    };

    const handleAccessibilityToggle = () => {
        setDoAccessible(doAccessible => !doAccessible);
        console.log("do accessible to " + doAccessible);
    };

    const updateCurrentNode = (currentNode: Node) => {
        setHasSeen(true);
        if (activeTab !== 2 || !isExpanded) setHasSeen(false);
        setCurrentNode(currentNode);
    };

    const fetchData = useCallback(async (): Promise<AxiosResponse<Node[]>> => {
        try {
            const request: PathfindingRequest = {
                startId: startNode,
                endId: endNode,
                strategy: pathFindingType,
                doAccessible: doAccessible
            };
            const response: AxiosResponse<Node[]> = await axios.post('/api/pathfinding', request, {
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (response.status === 200) {
                console.log("data received");
                setBFSResult(response.data);
            }

            return response;
        } catch (error) {
            console.error("Error fetching pathFinding result:", (error as AxiosError).message);
            throw error;
        }
    }, [startNode, endNode, pathFindingType, doAccessible]);

    useEffect(() => {
        fetchData()
            .then().catch(error => {
            // Handle error
            console.error("Error:", error.message);
            // Optionally set state or show error message to the user
        });
    }, [fetchData]);

    useEffect(() => {
        // When pathFindingType changes, update mapKey to force remount of MapDisplay
        setMapKey(prevKey => prevKey + 1);
    }, [pathFindingType]);


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

    const sendHoverMapPath = (path: PathfindingRequest) => {
        setStartNode(path.startId);
        setEndNode(path.endId);
    };

    const sendClear = () => {
        setStartNode("");
        setEndNode("");
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

    const nodeFloorToMapFloor = (nodeFloor: string) => {
        if (nodeFloor == "L1") {
            return "lowerLevel1";
        } else if (nodeFloor == "L2") {
            return "lowerLevel2";
        } else if (nodeFloor == "1") {
            return "floor1";
        } else if (nodeFloor == "2") {
            return "floor2";
        } else if (nodeFloor == "3") {
            return "floor3";
        }
        return "lowerLevel1";
    };

    //parse node CSV into array of CSVRows
    const CSVRow = parseCSV(nodeCSVData);
    //make array to be inserted in the html code
    const roomNames: JSX.Element[] = [];
    const currentFloorNames: JSX.Element[] = [];


    //for each CSV row, add an option with the value as id and name as longName into array
    for (let i = 0; i < CSVRow.length; i++) {
        const row = CSVRow[i];
        const rowval = Object.values(row);
        const id = rowval[0];
        // const nodeId = row["nodeId"];
        const longName = row["longName"];
        const nodeType = row["nodeType"];
        const nodeFloor = nodeFloorToMapFloor(row["floor"]);

        if (nodeFloor == map && !(nodeType == "HALL")) {
            currentFloorNames.push(<SelectItem value={id}> {longName} </SelectItem>);
            roomNames.push(<SelectItem value={id}> {longName} </SelectItem>);
        } else if (id == startNode) {
            currentFloorNames.push(<SelectItem value={id}> {longName} </SelectItem>);
        } else if (id == endNode) {
            roomNames.push(<SelectItem value={id}> {longName} </SelectItem>);
        } else if (!(nodeType == "HALL")) {
            roomNames.push(<SelectItem value={id}> {longName} </SelectItem>);
        }
    }

    const handlePhotoChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setMap(event.target.value);
    };
    const [isExpanded, setIsExpanded] = useState(true);
    const [activeTab, setActiveTab] = useState(1);
    const [hasSeen, setHasSeen] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };
    const toggleActiveTab = (tabNumber: number) => {
        if (tabNumber === 2 && isExpanded) setHasSeen(true);
        setActiveTab(tabNumber);
    };

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        //looks to see if theres a floor change w/ stairs
        //shows alert if so
        //const hasStaircase = bfsResult.some(node => node.nodeType === "STAI");
        if(pathfindingResult[0] != undefined) {
            const returnBooleans: boolean[] = [];
            const firstNode = pathfindingResult[0];
            let previousFloor = firstNode.floor;

            for (let i = 0; i < pathfindingResult.length; i++) {
                const node = pathfindingResult[i];
                const currentFloor = node.floor;

                if (!(currentFloor == previousFloor) && node.nodeType === "STAI") {
                    //set current and previous nodes as true in boolean array
                    //update previous floor to be current for next loop
                    returnBooleans[i] = true;
                    returnBooleans[i - 1] = true;
                    previousFloor = currentFloor;
                } else {
                    returnBooleans[i] = false;
                    previousFloor = currentFloor;
                }
            }
            //if there is a stair floor change, show alert
            const hasStaircase = returnBooleans.includes(true);
          //  console.log(returnBooleans);
            setShowAlert(hasStaircase);
        }
        else {
            setShowAlert(false);
        }

    }, [pathfindingResult]);

    //booleans represent whether there is a floor change
    const gatherFloorChange = (): boolean[] => {
        const returnBooleans: boolean[] = [];
        let previousFloor = pathfindingResult[0].floor;

        for(let i = 0; i < pathfindingResult.length; i++) {
            const node = pathfindingResult[i];
            const currentFloor = node.floor;

            if (!(currentFloor == previousFloor)) {
                //set current and previous nodes as true in boolean array
                //update previous floor to be current for next loop
                returnBooleans[i] = true;
                returnBooleans[i - 1] = true;
                previousFloor = currentFloor;
            }
            else {
                returnBooleans[i] = false;
                previousFloor = currentFloor;
            }
        }
        //console.log(returnBooleans);
        return returnBooleans;
    };

    return (
        <div>
            <div className="fixed top-0 left-0 h-screen w-[80px] bg-neutral-500 bg-opacity-30 text-white z-20 px-4 pt-[100px]
                      flex-col hidden sm:flex">
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
                <div>
                    <button
                        className={`mt-4 transition-all duration-200 ${(activeTab === 1 && isExpanded) ? 'bg-blue-400 rounded-full' : ''}`}
                        onClick={() => {
                            toggleActiveTab(1);
                            setIsExpanded(true);
                        }}>
                        <img src="../../public/icon/nav-arrow-icon.png" alt="nav-icon" className="invert"></img>
                    </button>
                    <button className={`mt-4 text-foreground relative transition-all duration-200 
                    ${(activeTab === 2 && isExpanded) ? 'bg-blue-400 rounded-full' : ''}`} onClick={() => {
                        setHasSeen(true);
                        toggleActiveTab(2);
                        setIsExpanded(true);
                    }}>
                        <img src="../../public/icon/info-icon.png" alt="info-icon"></img>

                        {(currentNode && !hasSeen && (!isExpanded || (isExpanded && activeTab !== 2))) ?
                            <span className="absolute flex h-3 w-3 top-[-5px] right-[-10px]">
                                <span
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                            </span> : ''}
                    </button>
                </div>
            </div>
            <div
                className={`fixed top-0 left-0 h-screen sm:w-[400px] bg-background text-foreground z-10 sm:pl-[80px] pt-[90px] sidebar 
                ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'} w-0 pl-0`}>
                {/* Sidebar content */}
                <div className="px-8 pb-2 sm:flex justify-between border-b-[1px] border-neutral-300 hidden">
                    <input type="radio" id="l2" name="floor" value="lowerLevel2" className="hidden"
                           onChange={handlePhotoChange} checked={map == "lowerLevel2"}/>
                    <label htmlFor="l2" className="font-bold hover:text-blue-500 cursor-pointer">L2</label>
                    <input type="radio" id="l1" name="floor" value="lowerLevel1" className="hidden"
                           onChange={handlePhotoChange} checked={map == "lowerLevel1"}/>
                    <label htmlFor="l1" className="font-bold hover:text-blue-500 cursor-pointer">L1</label>
                    <input type="radio" id="f1" name="floor" value="floor1" className="hidden"
                           onChange={handlePhotoChange} checked={map == "floor1"}/>
                    <label htmlFor="f1" className="font-bold hover:text-blue-500 cursor-pointer">1</label>
                    <input type="radio" id="f2" name="floor" value="floor2" className="hidden"
                           onChange={handlePhotoChange} checked={map == "floor2"}/>
                    <label htmlFor="f2" className="font-bold hover:text-blue-500 cursor-pointer">2</label>
                    <input type="radio" id="f3" name="floor" value="floor3" className="hidden"
                           onChange={handlePhotoChange} checked={map == "floor3"}/>
                    <label htmlFor="f3" className="font-bold hover:text-blue-500 cursor-pointer">3</label>
                </div>
                {activeTab === 1 && (
                    <div className="hidden sm:block">
                        <div className="flex pl-2 py-4 border-b-[1px] border-neutral-300">
                            <div className="flex flex-col items-center">
                                <img src="../../public/icon/start.svg" alt="circle"
                                     className="mb-[5px] mt-[11px] dark:invert"/>
                                <img src="../../public/icon/dots.svg" alt="dots" className="my-[10px] dark:invert"/>
                                <img src="../../public/icon/location.svg" alt="pin"/>
                            </div>
                            <div className="flex flex-col grow justify-between pl-[2px] pr-2">
                                <Select value={startNode}
                                        onValueChange={(location: string) => setStartNode(location)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Location"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {currentFloorNames}
                                    </SelectContent>
                                </Select>
                                <Select value={endNode}
                                        onValueChange={(location: string) => setEndNode(location)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Location"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roomNames}
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>
                        <div className="pt-4 pb-2 px-2">
                            <Select value={pathFindingType} defaultValue={"A*"}
                                    onValueChange={(algorithm: string) => setPathFindingType(algorithm)}>
                                <SelectTrigger>
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"A*"}>A* Searching</SelectItem>
                                    <SelectItem value={"BFS"}>BFS Searching</SelectItem>
                                    <SelectItem value={"DFS"}>DFS Searching</SelectItem>
                                    <SelectItem value={"Dijkstra"}>Dijkstra Searching</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="relative h-6 w-32">
                            <div className="absolute inset-y-0 left-1 w-16">
                                <Switch onCheckedChange={handleAccessibilityToggle} defaultChecked={false}>
                                </Switch>
                            </div>
                        </div>

                        <div>
                            <div>
                                <div className="flex items-center justify-center ml-6 mb-3">
                                    <p className="font-bold mb-0">Follow Me</p>
                                    <button onClick={handleSpeakButtonClick}>
                                        <img src="../../public/icon/text-to-speech.svg" alt="text-icon"
                                             className="h-6 w-6 mr-5 ml-2 pd-0 dark:invert"></img>
                                    </button>
                                </div>
                            </div>
                            <ol type="1" className="overflow-y-auto h-80 text-left pl-2">
                                {/* Render the list of long names and node names with icons */}
                                {pathfindingResult.map((node, index) => (
                                    <li key={index}>
                                        {/* Check the node type and render the appropriate icon */}
                                        <span className="flex items-center">
                                            {node.nodeType === "STAI" && (
                                                <img src="../../public/icon/stairs.png" alt="stair-icon"
                                                     className="h-3 w-3 mr-1 dark:invert"/>
                                            )}
                                            {node.nodeType === "ELEV" && (
                                                <img src="../../public/icon/elevator.png" alt="elevator-icon"
                                                     className="w-4 h-4 mr-1 dark:invert"/>
                                            )}
                                            <span
                                                className={gatherFloorChange()[index] ? "text-blue-500" : ""}>
                                                    {node.longName}
                                                </span>
                                            </span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                    </div>
                )}
                {activeTab === 2 && !currentNode && (
                    <div className="hidden sm:block mt-4">
                        <p className="font-bold mb-0">Select a location</p>
                        <p className="font-bold">to display its information</p>
                        <img src="../../public/icon/red-pin.png" alt={"pin"} className="max-w-[200px] m-auto"></img>
                    </div>
                )}
                <div className="px-2 text-left" style={{display: activeTab !== 2 || !currentNode ? 'none' : 'block'}}>
                    <img src={'../../public/room-types/nodeType-' + currentNode?.nodeType + ".png"} alt="patient-room"
                         className="rounded-md pb-3"></img>
                    <p className="text-xl font-bold mb-1">{currentNode?.longName + " (" + currentNode?.shortName + ")"}</p>
                    <p className="text-sm text-muted-foreground">{currentNode?.nodeType + " #" + currentNode?.id}</p>
                    <div className="flex">
                        <img src="../../public/icon/red-pin.png" className="w-[30px]"></img>
                        <p className="mb-0">{"Floor " + currentNode?.floor + ", " + currentNode?.building}</p>
                    </div>
                    <div>
                        {NodeServiceRequestComponent(currentNode)}
                    </div>
                </div>

                <div
                    className={`absolute bottom-[calc(100vh-200px)] right-[-90px] sm:bottom-[10px] flex flex-col bg-background rounded-xl
                                ${isExpanded ? 'sm:right-[-90px]' : 'sm:right-[-170px]'}`}>
                    <HoverCard openDelay={100}>
                        <HoverCardTrigger className="w-[80px] h-[80px] flex justify-center items-center
                                        no-underline text-foreground relative cursor-pointer group">
                            <img src="../../public/icon/gmap-icon-bg.png" alt="map-bg"
                                 className="dark:brightness-75 group-hover:scale-[0.9] transition-all duration-200"></img>
                            <p className="absolute bottom-[5px] text-[12px] font-bold m-0">Display</p>
                        </HoverCardTrigger>
                        <HoverCardContent side="right" className="pb-2">
                            <form className="flex flex-row">
                                <div className="px-1">
                                    <input type="checkbox" id="display-edges-switch" name="display-edges-switch"
                                           className="hidden"
                                           onChange={() => setDoDisplayEdges(!doDisplayEdges)}
                                           checked={doDisplayEdges}/>
                                    <label htmlFor="display-edges-switch"
                                           className="cursor-pointer flex flex-col justify-center">
                                        <img src="../../public/icon/map-edges-icon.png" alt="edge-bg"
                                             className="w-[50px] m-auto dark:brightness-75"></img>
                                        <p className="m-0 text-center text-xs">Edges</p>
                                    </label>
                                </div>
                                <div className="px-1">
                                    <input type="checkbox" id="display-nodes-switch" name="display-nodes-switch"
                                           className="hidden"
                                           onChange={() => setDoDisplayNodes(!doDisplayNodes)}
                                           checked={doDisplayNodes}/>
                                    <label htmlFor="display-nodes-switch"
                                           className="cursor-pointer flex flex-col justify-center">
                                        <img src="../../public/icon/map-nodes-icon.png" alt="edge-bg"
                                             className="w-[50px] m-auto dark:brightness-75"></img>
                                        <p className="m-0 text-center text-xs">Nodes</p>
                                    </label>
                                </div>
                                <div className="px-1">
                                    <input type="checkbox" id="display-names-switch" name="display-names-switch"
                                           className="hidden"
                                           onChange={() => setDoDisplayNames(!doDisplayNames)}
                                           checked={doDisplayNames}/>
                                    <label htmlFor="display-names-switch"
                                           className="cursor-pointer flex flex-col justify-center">
                                        <img src="../../public/icon/map-names-icons.png" alt="edge-bg"
                                             className="w-[50px] m-auto dark:brightness-75"></img>
                                        <p className="m-0 text-center text-xs">Names</p>
                                    </label>
                                </div>
                            </form>
                        </HoverCardContent>
                    </HoverCard>

                </div>
            </div>
            <div className={`absolute bottom-[10px] z-50 right-[10px]`}>
                {showAlert && (
                    <Alert>
                        {/* Replace the Terminal component with an img tag */}
                        <span className="flex items-center">
                <img src="../../public/icon/wheelchair-icon.png" alt="wheelchair-icon"
                     className="h-7 w-7 dark:invert mr-2"/>
                <AlertTitle>Accessibility Alert!</AlertTitle>
            </span>
                        <AlertDescription>
                            This path contains stairs. If this is difficult, please request an accessible route with
                            the accessibility switch.
                        </AlertDescription>
                    </Alert>
                )}
            </div>


            <div className="h-0">
                <Drawer modal={false}>
                    <DrawerTrigger>
                        <div className="absolute w-[36px] h-[36px] left-[10px] top-[80px] bg-background z-40
                        rounded-md shadow-md sm:hidden flex items-center justify-center">
                            <img src="../../public/icon/nav-arrow-icon.png" alt="nav-icon"
                                 className="dark:invert w-[25px]"></img>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent>
                    <div className="overflow-y-auto">
                        <div className="max-w-[400px] m-auto">
                            <div className="px-8 pb-2 flex justify-between border-b-[1px] border-neutral-300">
                                <input type="radio" id="l2" name="floor" value="lowerLevel2" className="hidden"
                                       onChange={handlePhotoChange} checked={map == "lowerLevel2"}/>
                                <label htmlFor="l2" className="font-bold hover:text-blue-500 cursor-pointer">L2</label>
                                <input type="radio" id="l1" name="floor" value="lowerLevel1" className="hidden"
                                       onChange={handlePhotoChange} checked={map == "lowerLevel1"}/>
                                <label htmlFor="l1" className="font-bold hover:text-blue-500 cursor-pointer">L1</label>
                                <input type="radio" id="f1" name="floor" value="floor1" className="hidden"
                                       onChange={handlePhotoChange} checked={map == "floor1"}/>
                                <label htmlFor="f1" className="font-bold hover:text-blue-500 cursor-pointer">1</label>
                                <input type="radio" id="f2" name="floor" value="floor2" className="hidden"
                                       onChange={handlePhotoChange} checked={map == "floor2"}/>
                                <label htmlFor="f2" className="font-bold hover:text-blue-500 cursor-pointer">2</label>
                                <input type="radio" id="f3" name="floor" value="floor3" className="hidden"
                                       onChange={handlePhotoChange} checked={map == "floor3"}/>
                                <label htmlFor="f3" className="font-bold hover:text-blue-500 cursor-pointer">3</label>
                            </div>
                            <div className="flex pl-2 py-4 border-b-[1px] border-neutral-300">
                                <div className="flex flex-col items-center">
                                    <img src="../../public/icon/start.svg" alt="circle"
                                         className="mb-[5px] mt-[11px] dark:invert"/>
                                    <img src="../../public/icon/dots.svg" alt="dots" className="my-[10px] dark:invert"/>
                                    <img src="../../public/icon/location.svg" alt="pin"/>
                                </div>
                                <div className="flex flex-col grow justify-between pl-[2px] pr-2">
                                    <Select value={startNode}
                                            onValueChange={(location: string) => setStartNode(location)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Location"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {currentFloorNames}
                                        </SelectContent>
                                    </Select>
                                    <Select value={endNode}
                                            onValueChange={(location: string) => setEndNode(location)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Location"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roomNames}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="py-4 px-2">
                                <Select value={pathFindingType} defaultValue={"/api/bfsAstar-searching"}
                                        onValueChange={(algorithm: string) => setPathFindingType(algorithm)}>
                                    <SelectTrigger>
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={"/api/bfs-searching"}>BFS Searching</SelectItem>
                                        <SelectItem value={"/api/bfsAstar-searching"}>A* Searching</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <p className="font-bold text-center">Follow me</p>
                                <ol type="1" className={"overflow-y-auto h-[100px] px-2"}>
                                    {collectLongNames().map((longName, index) => (
                                        <li key={index}>{longName}</li>
                                    ))}
                                </ol>
                            </div>

                            <div className="flex justify-center">
                                <DrawerClose>
                                    <div className="mb-4 m-auto">
                                        <Button variant="destructive">Close</Button>
                                    </div>
                                </DrawerClose>
                            </div>
                        </div>
                    </div>
                    </DrawerContent>
                </Drawer>
            </div>
            <div className="h-0">
                <Drawer modal={false}>
                    <DrawerTrigger>
                    <div className="absolute w-[36px] h-[36px] left-[50px] top-[80px] bg-background z-40
                        rounded-md shadow-md sm:hidden flex items-center justify-center">
                            <img src="../../public/icon/info-icon.png" alt="nav-icon"
                                 className="invert dark:invert-0 w-[25px]"></img>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="overflow-y-auto">
                            {!currentNode && (
                                <div className="text-center mt-4">
                                    <p className="font-bold mb-0">Select a location</p>
                                    <p className="font-bold">to display its information</p>
                                    <img src="../../public/icon/red-pin.png" alt={"pin"}
                                         className="max-w-[200px] m-auto"></img>
                                </div>
                            )}
                            <div className="px-2 text-left"
                                 style={{display: !currentNode ? 'none' : 'block'}}>
                                <img src={'../../public/room-types/nodeType-' + currentNode?.nodeType + ".png"}
                                     alt="patient-room"
                                     className="rounded-md pb-3"></img>
                                <p className="text-xl font-bold mb-1">{currentNode?.longName + " (" + currentNode?.shortName + ")"}</p>
                                <p className="text-sm text-muted-foreground">{currentNode?.nodeType + " #" + currentNode?.id}</p>
                                <div className="flex">
                                    <img src="../../public/icon/red-pin.png" className="w-[30px]"></img>
                                    <p className="mb-0">{"Floor " + currentNode?.floor + ", " + currentNode?.building}</p>
                                </div>

                            </div>
                            <div className="flex justify-center">
                                <DrawerClose>
                                    <div className="mb-4 m-auto">
                                        <Button variant="destructive">Close</Button>
                                    </div>
                                </DrawerClose>
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>


            <div className="fixed w-screen max-w-full m-auto">
                <TransformWrapper
                    initialScale={1}
                    initialPositionX={0}
                    initialPositionY={0}
                    wheel={{step: 0.1, smoothStep: 0.01}}
                    centerZoomedOut={true}
                >
                    {({zoomIn, zoomOut, resetTransform}) => (
                        <React.Fragment>
                            <div
                                className="tools flex flex-col absolute right-2 top-2 z-10 rounded-lg">
                                <button onClick={() => zoomIn()}
                                        className="w-8 h-8 rounded-md bg-background flex items-center justify-center
                                        text-2xl shadow-md m-0.5">
                                    <img src="../../public/icon/zoom-in-icon.png" alt="zoom-in"
                                         className="w-[30%] dark:invert"></img>
                                </button>
                                <button onClick={() => zoomOut()}
                                        className="w-8 h-8 rounded-md bg-background flex items-center justify-center
                                        text-2xl shadow-md m-0.5">
                                    <img src="../../public/icon/zoom-out-icon.png" alt="zoom-out"
                                         className="w-[30%] dark:invert"></img>
                                </button>
                                <button onClick={() => resetTransform()}
                                        className="w-8 h-8 rounded-md bg-background flex items-center justify-center
                                        text-2xl shadow-md m-0.5">
                                    <img src="../../public/icon/reset-icon.png" alt="zoom-in"
                                         className="w-[40%] dark:invert"></img>
                                </button>
                            </div>
                            <TransformComponent wrapperClass={"max-h-screen"}>
                                {lowerLevel1ContentVisible &&
                                    <MapDisplay key={mapKey} floorMap={"public/maps/00_thelowerlevel1.png"} floor={"L1"}
                                                startNode={startNode} endNode={endNode}
                                                pathFindingType={pathFindingType} sendHoverMapPath={sendHoverMapPath}
                                                sendClear={sendClear} pathSent={pathfindingResult}
                                                doAccessible={doAccessible}
                                                doDisplayNames={doDisplayNames} doDisplayEdges={doDisplayEdges}
                                                doDisplayNodes={doDisplayNodes} setChosenNode={updateCurrentNode}/>}
                                {lowerLevel2ContentVisible &&
                                    <MapDisplay key={mapKey} floorMap={"public/maps/00_thelowerlevel2.png"} floor={"L2"}
                                                startNode={startNode} endNode={endNode}
                                                pathFindingType={pathFindingType} sendHoverMapPath={sendHoverMapPath}
                                                sendClear={sendClear} pathSent={pathfindingResult}
                                                doAccessible={doAccessible}
                                                doDisplayNames={doDisplayNames} doDisplayEdges={doDisplayEdges}
                                                doDisplayNodes={doDisplayNodes} setChosenNode={updateCurrentNode}/>}
                                {floor1ContentVisible &&
                                    <MapDisplay key={mapKey} floorMap={"public/maps/01_thefirstfloor.png"} floor={"1"}
                                                startNode={startNode} endNode={endNode}
                                                pathFindingType={pathFindingType} sendHoverMapPath={sendHoverMapPath}
                                                sendClear={sendClear} pathSent={pathfindingResult}
                                                doAccessible={doAccessible}
                                                doDisplayNames={doDisplayNames} doDisplayEdges={doDisplayEdges}
                                                doDisplayNodes={doDisplayNodes} setChosenNode={updateCurrentNode}/>}
                                {floor2ContentVisible &&
                                    <MapDisplay key={mapKey} floorMap={"public/maps/02_thesecondfloor.png"} floor={"2"}
                                                startNode={startNode} endNode={endNode}
                                                pathFindingType={pathFindingType} sendHoverMapPath={sendHoverMapPath}
                                                sendClear={sendClear} pathSent={pathfindingResult}
                                                doAccessible={doAccessible}
                                                doDisplayNames={doDisplayNames} doDisplayEdges={doDisplayEdges}
                                                doDisplayNodes={doDisplayNodes} setChosenNode={updateCurrentNode}/>}
                                {floor3ContentVisible &&
                                    <MapDisplay key={mapKey} floorMap={"public/maps/03_thethirdfloor.png"} floor={"3"}
                                                startNode={startNode} endNode={endNode}
                                                pathFindingType={pathFindingType} sendHoverMapPath={sendHoverMapPath}
                                                sendClear={sendClear} pathSent={pathfindingResult}
                                                doAccessible={doAccessible}
                                                doDisplayNames={doDisplayNames} doDisplayEdges={doDisplayEdges}
                                                doDisplayNodes={doDisplayNodes} setChosenNode={updateCurrentNode}/>}
                            </TransformComponent>
                        </React.Fragment>
                    )}
                </TransformWrapper>
            </div>

        </div>

    );
}
