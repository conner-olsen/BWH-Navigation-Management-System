import React, {useEffect, useState} from 'react';
import {Graph, Node} from 'common/src/graph-structure.ts';
import PathfindingRequest from "common/src/PathfindingRequest.ts";
import axios from "axios";

interface MapDisplayProps {
    floorMap: string;
    floor: string;
    startNode?: string;
    endNode?: string;
    sendHoverMapPath: (path: PathfindingRequest) => void;
    pathSent: Node[];
    pathFindingType: string;
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
                        mapChange,
                    }: MapDisplayProps) {
    const [graph, setGraph] = useState<Graph>(new Graph());
    const [startNodeId, setStartNodeId] = useState<string | null>(null);
    const [endNodeId, setEndNodeId] = useState<string | null>(null);
    const [path, setPath] = useState<string[]>([]);

    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });



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
            graph.setPathfindingMethodStringRoute(pathFindingType);

            const pathString = graph.nodesToString(pathSent);
            //graph.runPathfinding(startNode, endNode);
            setPath(pathString);
            setStartNodeId(startNode);
            setEndNodeId(endNode);
        }
    }, [startNode, endNode, sendHoverMapPath, pathFindingType, pathSent, graph]);
    const StrokePath: React.FC<StrokePathProps> = ({ x1, y1, x2, y2, color, style }) => (
        <line className={style}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color} strokeWidth="40"/>
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
                pathElements.push(<circle id={"cf" + stairsCounter} cx={node.xCoord} cy={node.yCoord} r="50"
                                          fill={node.nodeType === "STAI"? 'yellow' : 'blue'} stroke="black" stroke-width="10"/>
                );
                stairsCounter++;
            }
        }
        return pathElements;
    };

    useEffect(() => {
        const element = document.getElementById('cf1');
        if (element) {
            const rect = element.getBoundingClientRect();
            setCoordinates({ x: rect.x, y: rect.y });
            console.log(rect.x + " " + rect.y);
        }
    }, []);

    useEffect(() => {
        const divElement = document.createElement('div');
        divElement.style.position = 'absolute';
        divElement.style.left = `${coordinates.x}px`;
        divElement.style.top = `${coordinates.y}px`;
        divElement.style.width = '100px';
        divElement.style.height = '100px';
        divElement.style.backgroundColor = 'blue';
        divElement.textContent = 'Div with respect to screen';
        document.body.appendChild(divElement);

        return () => {
            document.body.removeChild(divElement);
        };
    }, [coordinates]);

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
                    );
            })
        );
    };


    return (
        <div className={"relative map-rotate"}>
            <svg viewBox="0 0 5000 3400" className={"w-screen max-w-full"}>
                <image href={floorMap} width="5000" height="3400" x="0" y="0"
                       className="opacity-[70%] cursor-pointer" onClick={() => mapChange(floor)}/>
                {graph && path.length > 0 && displayPath(graph, path)}
                {graph && path.length > 0 && displayFloorStart(graph, path)}
                {graph && displayNodePins(graph)}
            </svg>
        </div>
    );
}

export default MapDisplay3D;
