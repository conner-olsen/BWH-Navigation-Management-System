import React, {useEffect, useState} from 'react';
import {Graph} from 'common/src/graph.ts';
import PathfindingRequest from "common/src/PathfindingRequest.ts";
import axios   from "axios";
import "./animation.css";
import {Node} from "common/src/node.ts";
interface MapDisplayProps {
    floorMap: string;
    floor: string;
    startNode?: string;
    endNode?: string;
    sendHoverMapPath: (path: PathfindingRequest) => void;
    sendClear: () => void;
    pathSent: Node[];
    doDisplayEdges: boolean;
    doDisplayNodes: boolean;
    doDisplayNames: boolean;
    pathFindingType: string;
    setChosenNode: (currentNode: Node) => void;
}

interface AnimatedPathProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

function MapDisplay({
                        floorMap,
                        floor,
                        startNode,
                        endNode,
                        sendHoverMapPath,
                        sendClear,
                        pathFindingType,
                        doDisplayEdges,
                        doDisplayNodes,
                        doDisplayNames,
                        pathSent,
                        setChosenNode
                    }: MapDisplayProps) {
    const [graph, setGraph] = useState<Graph>(new Graph());
    const [startNodeId, setStartNodeId] = useState<string | null>(null);
    const [endNodeId, setEndNodeId] = useState<string | null>(null);
    const [path, setPath] = useState<string[]>([]);
    const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);
    const [nodeCount, setCount] = useState<string>("Error");



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

   function getCount(node: Node){
       const fetchData = async () => {
               try {
                   const response = await axios.post("/api/get-stats", node);
                   if (response.status === 200) {
                       setCount(response.data);
                   }
               } catch (error) {
                   console.error("error getting count ", (error));
               }
       };

           fetchData().then();
    }

    const AnimatedPath: React.FC<AnimatedPathProps> = ({ x1, y1, x2, y2 }) => (
        <line
            className="line-animation"
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="red"
            strokeWidth="10"
        />
    );
    const displayPath = (graph: Graph, path: string[]) => {
        const pathElements: React.JSX.Element[] = [];
        for (let i = 0; i < path.length - 1; i++) {
            const node = graph.getNode(path[i]);
            const nextNode = graph.getNode(path[i + 1]);
            if (node && nextNode && node.floor === floor && nextNode.floor === floor) {
                pathElements.push(
                    <AnimatedPath
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


    const handleNodeClick = (node: Node) => {
        setChosenNode(node);

        if (!startNodeId) {
            setStartNodeId(node.id);
            const path: PathfindingRequest = {startid: node.id, endid: ""};
            sendHoverMapPath(path);
        } else if (node.id == startNodeId) {
            clearSelection();
        } else if (!endNodeId) {
            setEndNodeId(node.id);
            if (graph && startNodeId) {
                setStartNodeId(startNodeId);
                setEndNodeId(node.id);
                const path: PathfindingRequest = {startid: startNodeId, endid: node.id};
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
        if (hoverNodeId) {
            setHoverNodeId(null);
        }
    };

    const displayHoverInfo = (node: Node) => {
        getCount(node);
        return (
            <foreignObject x={node.xCoord - 225} y={node.yCoord - 525} width="450" height="500">
                <div
                    className={"h-fit rounded-md border bg-popover p-4 text-2xl text-popover-foreground shadow-md " +
                        "outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 " +
                        "data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
                        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 " +
                        "data-[side=top]:slide-in-from-bottom-2 z-50"}>
                    <g>
                        <img src={'../../../public/room-types/nodeType-' + node.nodeType + ".png"}></img>
                        <div>
                            <p>Type: {node.nodeType}</p>
                        </div>
                        <div>
                            <p>{node.longName}</p>
                        </div>
                        <div>
                            <p>{node.shortName}</p>
                        </div>
                        <div>
                            <p>Service Requests: {nodeCount.toString()}</p>
                        </div>
                    </g>
                </div>
            </foreignObject>
        );
    };
    const clearSelection = () => {
        setStartNodeId(null);
        setEndNodeId(null);
        setPath([]);
        sendClear();
    };
    const displaySelectedNodes = (node: Node, type: 'start' | 'end') => {
        return (
            <>
                <foreignObject x={node.xCoord - 50} y={node.yCoord - 80} width="100" height="100" className="z-50">
                    <g onClick={() => clearSelection()} className="cursor-no-drop">
                        {type === 'start' ?
                            <img src="../../public/icon/red-pin.png" className="scaly-boi w-[100px] h-[100px]"></img> :
                            <img src="../../public/icon/red-pin.png" className="scaly-boi w-[100px] h-[100px]"></img>}
                    </g>
                </foreignObject>

                {/*<foreignObject x={node.xCoord - 5} y={node.yCoord + 20} width="250" height="250" className="z-50">*/}
                {/*    <div*/}
                {/*        className={"w-50 h-50 rounded-3xl border bg-popover p-4 text-md text-popover-foreground shadow-md " +*/}
                {/*            "outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +*/}
                {/*            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"}*/}
                {/*        style={{backgroundColor: 'rgba(122,154,255,0.7)'}}>*/}
                {/*        <g>*/}
                {/*            <div className="font-bold">*/}
                {/*                {type === 'start' ? 'START NODE' : 'END NODE'}*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <text className="text-neutral-700 font-semibold" style={{cursor: 'pointer'}}*/}
                {/*                      onClick={() => clearSelection()}>*/}
                {/*                    Clear*/}
                {/*                </text>*/}
                {/*            </div>*/}
                {/*        </g>*/}
                {/*    </div>*/}
                {/*</foreignObject>*/}
            </>

        );
    };

    const displayName = (node: Node) => {
        if ((doDisplayNames && (node.floor == floor)) && !(node.nodeType == "HALL")) {
            return (
                <text className="font-bold dark:invert" x={node.xCoord - 65} y={node.yCoord - 20} fill="black">
                    {node.shortName}
                </text>
            );
        }
    };

    const displayNodes = (graph: Graph) => {
        return (
            Array.from(graph.nodes.values()).map((node: Node) => {
                if (node.floor == floor && doDisplayNodes) {
                    return (
                        <g key={node.id} >

                            <circle className="dark:fill-white z-20 fill-blue-600" cx={node.xCoord} cy={node.yCoord} r={hoverNodeId === node.id ? "15" : "11"} stroke="black" stroke-width="4"
                                    style={{cursor: 'pointer'}}
                                    // Moved events here so hovering on other components don't affect displayed nodes
                                    onClick={() => handleNodeClick(node)}
                                    onMouseEnter={() => handleNodeHover(node)}
                                    onMouseLeave={() => handleNodeHoverLeave()}/>
                            {displayName(node)}
                        </g>
                    );
                }
            }));
    };

    const displayHoverCards = (graph: Graph) => {
        // Hover cards need to be rendered after nodes to avoid overlapping
        return (
            Array.from(graph.nodes.values()).map((node: Node) => {
                return (
                    <g>
                        {hoverNodeId === node.id && displayHoverInfo(node)}
                    </g>
                );
            })
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

    const displayEdges = (graph: Graph) => {
        if (doDisplayEdges) {
            const edges: React.JSX.Element[] = [];
            for (const [nodeId, node] of graph.nodes) {
                if (node.floor === floor) {
                    node.edges.forEach(edgeNodeId => {
                        const targetNode = graph.getNode(edgeNodeId);
                        if (targetNode && targetNode.floor === floor) {
                            edges.push(
                                <line className="dark:stroke-blue-300"
                                      key={`${nodeId}-${edgeNodeId}`}
                                      x1={node.xCoord} y1={node.yCoord}
                                      x2={targetNode.xCoord} y2={targetNode.yCoord}
                                      stroke="black" strokeWidth="2"
                                />
                            );
                        }
                    });
                }
            }
            return edges;
        }
    };

    return (
        <div className={"relative"}>
            <svg viewBox="0 0 5000 3400" className={"w-screen max-w-full"}>
                <image href={floorMap} width="5000" height="3400" x="0" y="0"/>
                {graph && displayEdges(graph)}
                {graph && path.length > 0 && displayPath(graph, path)}
                {graph && displayNodes(graph)}
                {graph && displayNodePins(graph)}
                {graph && displayHoverCards(graph)}
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
