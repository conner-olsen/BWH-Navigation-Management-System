import React, {useEffect, useState} from 'react';
import {Graph, Node} from 'common/src/graph-structure.ts';
import PathfindingRequest from "common/src/PathfindingRequest.ts";
import axios from "axios";
// import axios from "axios";


interface MapDisplayProps {
    floorMap: string
    floor: string
    startNode?: string;
    endNode?: string;
    sendHoverMapPath: (path: PathfindingRequest) => void;
    doDisplayEdges: boolean;
    doDisplayNodes: boolean;
    doDisplayNames: boolean;
    pathFindingType: string;

}

function MapDisplay({floorMap, floor, startNode, endNode, sendHoverMapPath, pathFindingType, doDisplayEdges, doDisplayNodes, doDisplayNames}: MapDisplayProps) {
    const [graph, setGraph] = useState<Graph>(new Graph());
    const [startNodeId, setStartNodeId] = useState<string | null>(null);
    const [endNodeId, setEndNodeId] = useState<string | null>(null);
    const [path, setPath] = useState<string[]>([]);
    const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);

    useEffect(() => {
        axios.get("/api/graph").then((res) => {
            const populatedGraph  = new Graph();
            populatedGraph.populateGraph(res.data.nodes,res.data.edges);
            setGraph(populatedGraph);
        });
    }, []);

    useEffect(() => {
        if (startNode && endNode && graph) {
            //sets pathfinding algorithm to the one that corresponds with the pathFindingType (the api route)
            graph.setPathfindingMethodStringRoute(pathFindingType);

            const path = graph.runPathfinding(startNode, endNode);
            setPath(path);
            setStartNodeId(startNode);
            setEndNodeId(endNode);
        }
    }, [startNode, endNode, sendHoverMapPath, pathFindingType, graph]);

    const displayPath = (graph: Graph, path: string[]) => {
        const pathElements: React.JSX.Element[] = [];
        for (let i = 0; i < path.length - 1; i++) {
            const node = graph.getNode(path[i]);
            const nextNode = graph.getNode(path[i + 1]);
            if (node && nextNode) {
                pathElements.push(
                    <line key={`${node.id}-${nextNode.id}`}
                          x1={node.xCoord} y1={node.yCoord}
                          x2={nextNode.xCoord} y2={nextNode.yCoord}
                          stroke="red" strokeWidth="8"/>
                );
            }
        }
        return pathElements;
    };

    const handleNodeClick = (node: Node) => {
        if (!startNodeId) {
            setStartNodeId(node.id);
        }
        else if (node.id == startNodeId) {
            clearSelection();
        }
        else if (!endNodeId) {
            setEndNodeId(node.id);
            if (graph && startNodeId) {
                setStartNodeId(startNodeId);
                setEndNodeId(node.id);
                const path: PathfindingRequest = { startid: startNodeId, endid: node.id };
                sendHoverMapPath(path);
            }
        }
    };

    const handleNodeHover = (node: Node) => {
        if (!hoverNodeId) {
            setHoverNodeId(node.id);
        }
    };

    const handleNodeHoverLeave = () => {
        console.log("hover left");
        if (hoverNodeId) {
            setHoverNodeId(null);
        }
    };

    const displayHoverInfo = (node: Node, type: 'hover') => {
        return (
            <g>
                {type === 'hover'}
                <rect x={node.xCoord - 415} y={node.yCoord - 130} width="315" height="125" fill="lightgrey"/>;
                <text x={node.xCoord - 400} y={node.yCoord - 105} fill="black">
                    Type: {node.nodeType}
                </text>;
                <text x={node.xCoord - 400} y={node.yCoord - 80} fill="black">
                    {node.longName}
                </text>;
                <text x={node.xCoord - 400} y={node.yCoord - 55} fill="black">
                    {node.shortName}
                </text>;
                <text x={node.xCoord - 400} y={node.yCoord - 30} fill="black">
                    Status: -/-
                </text>;
            </g>
        );
    };
    const clearSelection = () => {
        setStartNodeId(null);
        setEndNodeId(null);
        setPath([]);
    };
    const displaySelectedNodes = (node: Node, type: 'start' | 'end') => {
        return (
            <g>
            <rect x={node.xCoord - 100} y={node.yCoord - 50} width="100" height="60" fill="lightgrey"/>
                <text x={node.xCoord - 85} y={node.yCoord - 30} fill="black">
                    {type === 'start' ? 'Start Node' : 'End Node'}
                </text>
                <text x={node.xCoord - 70} y={node.yCoord - 5} fill="blue" style={{cursor: 'pointer'}}
                      onClick={() => clearSelection()}>
                    Clear
                </text>
            </g>
        );
    };

    const displayNodes = (graph: Graph) => {
            return (
            Array.from(graph.nodes.values()).map((node: Node) => {
                if (node.floor == floor && doDisplayNodes){
                    return(
                        <g key={node.id} onClick={() => handleNodeClick(node)}
                           onMouseEnter={() => handleNodeHover(node)}
                           onMouseLeave={() => handleNodeHoverLeave()}>
                            <circle cx={node.xCoord} cy={node.yCoord} r="9" fill="blue"
                                    style={{cursor: 'pointer'}}/>
                            {startNodeId === node.id && displaySelectedNodes(node, 'start')}
                            {endNodeId === node.id && displaySelectedNodes(node, 'end')}
                            {hoverNodeId === node.id && displayHoverInfo(node, 'hover')}
                        </g>
                    );
                }
            }));
    };

    const displayNames = (graph: Graph) => {
        return (
            Array.from(graph.nodes.values()).map((node: Node) => {
                if (node.floor == floor && doDisplayNames) {
                    return (
                        <text x={node.xCoord - 65} y={node.yCoord - 20} fill="black">
                            {node.shortName}
                        </text>
                    );
                }
            }));
    };

    const displayEdges = (graph: Graph) => {
        if(doDisplayEdges) {
            const edges: React.JSX.Element[] = [];
            for (const [nodeId, node] of graph.nodes) {
                node.edges.forEach(edgeNodeId => {
                    const targetNode = graph.getNode(edgeNodeId);
                    if (targetNode && (targetNode.floor == floor && node.floor == floor)) {
                        edges.push(
                            <line key={`${nodeId}-${edgeNodeId}`}
                                  x1={node.xCoord} y1={node.yCoord}
                                  x2={targetNode.xCoord} y2={targetNode.yCoord}
                                  stroke="black" strokeWidth="1"/>
                        );
                    }
                });
            }
            return edges;
        }
    };

    return (
        <div className={"relative"}>
            <svg viewBox="0 0 5000 3400" className={"w-screen max-w-full"}>
                <image href={floorMap} width="5000" height="3400" x="0"
                       y="0"/>
                {graph && displayEdges(graph)}
                {graph && path.length > 0 && displayPath(graph, path)}
                {graph && displayNames(graph)}
                {graph && displayNodes(graph)}
            </svg>
        </div>
    );
}


/**
 * This is the default export of the MapDisplay component.
 *
 * MapDisplay is a functional component in React that displays a map with nodes and edges.
 * It uses the Graph data structure to represent the nodes and edges.
 *
 * The component maintains the state of the graph and updates it using the useState and useEffect hooks.
 * It also defines a function, displayEdges, to create JSX elements for the edges of the graph.
 *
 * The component returns a JSX element that contains an SVG element. The SVG element contains an image element for the map background,
 * and uses the displayEdges function to render the edges of the graph.
 * It also maps over the nodes of the graph and creates a circle element for each node.
 *
 * Each node is clickable and triggers the handleNodeClick function when clicked.
 *
 * @module MapDisplay
 * @example
 * // To use this component in a .tsx file, you can import it and use it as follows:
 * import MapDisplay from './MapDisplay';
 *
 * function App() {
 *   return (
 *     <div className="App">
 *       <MapDisplay />
 *     </div>
 *   );
 * }
 *
 * export default App;
 */

export default MapDisplay;
