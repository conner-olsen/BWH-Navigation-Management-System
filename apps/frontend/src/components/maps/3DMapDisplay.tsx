import React, {useEffect, useState} from 'react';
import {Node} from "common/src/node.ts";
import PathfindingRequest from "common/src/interfaces/pathfinding-request.ts";
import axios from "axios";
import ReactDOM from "react-dom";
import Guideline from "./Guideline.tsx";
import {Graph} from "common/src/graph.ts";

interface MapDisplayProps {
    floorMap: string;
    floor: string;
    startNode?: string;
    endNode?: string;
    sendHoverMapPath: (path: PathfindingRequest) => void;
    pathSent: Node[];
    pathFindingType: string;
    animationOn: boolean;
    mapChange: (mapID: string) => void;
}

interface StrokePathProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color: string;
    style: string; // Tailwind styling
}
function MapDisplay3D({
                        floorMap,
                        floor,
                        startNode,
                        endNode,
                        sendHoverMapPath,
                        pathFindingType,
                        pathSent,
                        animationOn,
                        mapChange,
                    }: MapDisplayProps) {
    const [graph, setGraph] = useState<Graph>(new Graph());
    const [startNodeId, setStartNodeId] = useState<string | null>(null);
    const [endNodeId, setEndNodeId] = useState<string | null>(null);
    const [path, setPath] = useState<string[]>([]);


    useEffect(() => {
        axios.get("/api/graph").then((res) => {
            const populatedGraph = new Graph();
            populatedGraph.populateGraph(res.data.nodes, res.data.edges);
            setGraph(populatedGraph);
        });
    }, []);

    useEffect(() => {
        if (startNode && endNode && graph) {
            //sets pathfinding algorithm to the one that corresponds with the pathFindingType (the api route)
            graph.setPathfindingStrategy(pathFindingType);

            const pathString = graph.nodesToString(pathSent);
            //graph.runPathfinding(startNode, endNode);
            setPath(pathString);
            setStartNodeId(startNode);
            setEndNodeId(endNode);
        }
    }, [startNode, endNode, sendHoverMapPath, pathFindingType, pathSent, graph]);

    function filterDuplicates(paths: Node[]) {
        const uniqueFloor: string[] = [];
        const sortOrder: { [key: string]: number } = { "3": 1, "2": 2, "1": 3, "L1": 4, "L2": 5 };
        paths.forEach(obj => {
            // Check if there's already an object with the same name in uniqueArray
            if (!uniqueFloor.some(item => item === obj.floor)) {
                uniqueFloor.push(obj.floor);
            }
        });
        uniqueFloor.sort((a, b) => (sortOrder[a] || Infinity) - (sortOrder[b] || Infinity));
        return uniqueFloor;
    }

    function extractFloor(id: string) {
        const index_f = id.indexOf('f');
        const index_t = id.indexOf('t');
        const from = id.slice(index_f + 1, index_t);
        const to = id.slice(index_t + 1);
        return [from, to];
    }

    const StrokePath: React.FC<StrokePathProps> = ({ x1, y1, x2, y2, color, style }) => (
        <line className={`${style} ${animationOn? "solid-animation" : ''}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color} strokeWidth="50"/>
    );
    const displayPath = (graph: Graph, path: string[]) => {
        const pathElements: React.JSX.Element[] = [];
        const firstNode = graph.getNode(path[0]); // Path must not be empty
        const lastNode = graph.getNode(path[path.length - 1]);

        for (let i = 0; i < path.length - 1; i++) {
            // Display the path
            const node = graph.getNode(path[i]);
            const nextNode = graph.getNode(path[i + 1]);
            if (node && nextNode && node.floor === floor && nextNode.floor === floor) {
                pathElements.push(
                    <StrokePath key={`${node.id}-${nextNode.id}`}
                        x1={node.xCoord} y1={node.yCoord} x2={nextNode.xCoord} y2={nextNode.yCoord}
                        color={"red"} style={""}
                    />
                );
            }

        }
        // Push first node in the path (white filled)
        if (firstNode && firstNode.floor === floor) pathElements.push(
            <circle cx={firstNode.xCoord} cy={firstNode.yCoord} r="50" fill="white" stroke="black" stroke-width="10"/>);
        // Push last node in the path (green filled, indicate destination)
        if (lastNode && lastNode.floor === floor) pathElements.push(
            <circle cx={lastNode.xCoord} cy={lastNode.yCoord} r="50" fill="lime" stroke="black" stroke-width="10"/>);
        return pathElements;
    };

    const displayFloorStart = (graph: Graph, path: string[]) => {
        // This function displays all the nodes indicating the start of a path on a NEW floor
        let stairsCounter = 1;
        const pathElements: React.JSX.Element[] = [];

        for (let i = 0; i < path.length - 1; i++) {
            const prevNode = graph.getNode(path[i]);
            const node = graph.getNode(path[i + 1]);
            const nextNode = graph.getNode(path[i + 2]);
            if (node && prevNode && nextNode && node.floor === floor && prevNode.floor !== floor
                && nextNode.nodeType !== node.nodeType) {
                pathElements.push(<circle cx={node.xCoord} cy={node.yCoord} r="50"
                                          fill={"black"} stroke="white" stroke-width="10"/>
                );
            }
            if (node && nextNode && node.floor !== nextNode.floor && node.floor === floor) {
                // Yellow indicates stairs, while blue indicates elevator (accessible) to a DIFFERENT floor
                pathElements.push(<circle id={"c" + stairsCounter + "f" + floor + "t" + nextNode.floor} cx={node.xCoord} cy={node.yCoord} r="50"
                                          fill={node.nodeType === "STAI"? 'yellow' : 'blue'} stroke="black" stroke-width="10"/>
                );
                stairsCounter++;
            }
        }
        if (path.length > 0) displayGuidelines();
        return pathElements;
    };

    const displayGuidelines = () => {
        const filteredFloors = filterDuplicates(pathSent);
        let id = 1;
        const coordinateArr: {x: number, y: number, from: string, to: string}[] = [];

        while (id) {
            const element = document.querySelector(`[id^="c${id}f${floor}"]`);
            if (element) {
                const [from, to] = extractFloor(element.id);
                const rect = element.getBoundingClientRect();
                coordinateArr.push({x: rect.x, y: rect.y, from: from, to: to});
                id++;
            } else break;
        }

        for (let i = 0; i < coordinateArr.length; i++) {
            const coordinate = coordinateArr[i];
            const div = document.createElement('div');
            div.id = `d${id}f${floor}`;
            div.style.position = 'absolute';
            div.style.top = `${coordinate.y + 5}px`;
            div.style.left = `${coordinate.x + 8}px`;

            const indexFrom = filteredFloors.indexOf(coordinate.from);
            const indexTo = filteredFloors.indexOf(coordinate.to);
            const goingUp = indexFrom > indexTo;
            const floorsApart = Math.abs(indexFrom - indexTo);
            if (goingUp) div.style.left = `${coordinate.x + 10}px`; // Slightly off

            document.body.appendChild(div); // Append the div to the body
            // Render the MyComponent inside the dynamically created div
            ReactDOM.render(<Guideline goingUp={goingUp} floorsApart={floorsApart} animationOn={animationOn}/>, div);
            // Allow user to scroll once it's finished rendering
            document.body.style.overflow = '';
        }
        return <></>;
    };

    const displaySelectedNodes = (node: Node, type: 'start' | 'end') => {
        return (
            <>
                <foreignObject x={node.xCoord - 300} y={node.yCoord - 320} width="350" height="350" className="z-50">
                    <g>
                        {type === 'start' ?
                            <img src="../../public/icon/red-pin.png" className="scaly-boi w-[350px] h-[350px] cancel-rotate"></img> :
                            <img src="../../public/icon/red-pin.png" className="scaly-boi w-[350px] h-[350px] cancel-rotate"></img>}
                    </g>
                </foreignObject>
            </>
        );
    };

    const displayNodePins = (graph: Graph) => {
        return (
            Array.from(graph.nodes.values()).map((node: Node) => {
                if (node.floor === floor)
                    return (
                        <g>
                            {startNodeId === node.id && displaySelectedNodes(node, 'start')}
                            {endNodeId === node.id && displaySelectedNodes(node, 'end')}
                        </g>
                    );}));
    };

    return (
        <div className={"relative map-rotate"}>
            <svg viewBox="0 0 5000 3400" className={"w-screen max-w-full"}>
                <image href={floorMap} width="5000" height="3400" x="0" y="0"
                       className="opacity-[70%] cursor-pointer dark:invert" onClick={() => mapChange(floor)}/>
                {graph && path.length > 0 && displayPath(graph, path)}
                {graph && path.length > 0 && displayFloorStart(graph, path)}
                {graph && displayNodePins(graph)}
            </svg>
        </div>
    );
}

export default MapDisplay3D;
