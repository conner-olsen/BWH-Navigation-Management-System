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
}

interface StrokePathProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
function MapDisplay3D({
                        floorMap,
                        floor,
                        startNode,
                        endNode,
                        sendHoverMapPath,
                        pathFindingType,
                        pathSent,
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
            graph.setPathfindingMethodStringRoute(pathFindingType);

            const pathString = graph.nodesToString(pathSent);
            //graph.runPathfinding(startNode, endNode);
            setPath(pathString);
            setStartNodeId(startNode);
            setEndNodeId(endNode);
        }
    }, [startNode, endNode, sendHoverMapPath, pathFindingType, pathSent, graph]);
    const StrokePath: React.FC<StrokePathProps> = ({ x1, y1, x2, y2 }) => (
        <line className=""
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="red" strokeWidth="40"/>
    );
    const displayPath = (graph: Graph, path: string[]) => {
        const pathElements: React.JSX.Element[] = [];
        for (let i = 0; i < path.length - 1; i++) {
            const node = graph.getNode(path[i]);
            const nextNode = graph.getNode(path[i + 1]);
            if (node && nextNode && node.floor === floor && nextNode.floor === floor) {
                pathElements.push(
                    <StrokePath
                        key={`${node.id}-${nextNode.id}`}
                        x1={node.xCoord}
                        y1={node.yCoord}
                        x2={nextNode.xCoord}
                        y2={nextNode.yCoord}
                    />
                );
            }
        }
        return pathElements;
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
                    );
            })
        );
    };


    return (
        <div className={"relative map-rotate"}>
            <svg viewBox="0 0 5000 3400" className={"w-screen max-w-full"}>
                <image href={floorMap} width="5000" height="3400" x="0" y="0"
                       className="opacity-[70%]"/>
                {graph && path.length > 0 && displayPath(graph, path)}
                {graph && displayNodePins(graph)}
            </svg>

        </div>
    );
}
export default MapDisplay3D;
