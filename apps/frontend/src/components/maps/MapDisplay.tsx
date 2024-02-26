import React, {useEffect, useState} from 'react';
import {Graph} from 'common/src/graph.ts';
//import {PathfindingStrategy} from "common/src/pathfinding-strategy.ts";
import axios   from "axios";
import "./animation.css";
import { Node } from "common/src/node.ts";
import PathfindingRequest from "common/src/interfaces/pathfinding-request.ts";

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
  accessibilityRoute: boolean;
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
  accessibilityRoute: doAccessible,
  setChosenNode
}: Readonly<MapDisplayProps>) {
  const [graph, setGraph] = useState<Graph>(new Graph());
  const [startNodeId, setStartNodeId] = useState<string | null>(null);
  const [endNodeId, setEndNodeId] = useState<string | null>(null);
  const [path, setPath] = useState<string[]>([]);
  const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);
  const [nodeCount, setNodeCount] = useState<string>("Error");



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
      setPath(pathString);
      setStartNodeId(startNode);
      setEndNodeId(endNode);
    }
  }, [startNode, endNode, sendHoverMapPath, pathFindingType, pathSent, graph]);

  function getCount(node: Node) {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/get-stats", node);
        if (response.status === 200) {
          setNodeCount(response.data);
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

    const clearGuidelines = () => {
        // THIS WILL DELETE EVERY ELEMENT WITH ID STARTING WITH D
        const elements = document.querySelectorAll('[id^="d"]');
        const elementsArray = Array.from(elements);
        elementsArray.forEach((element) => element.remove());
    };

  const handleNodeClick = (node: Node) => {
    setChosenNode(node);
    clearGuidelines();

    if (!startNodeId) {
      setStartNodeId(node.id);
      const path: PathfindingRequest = { startId: node.id, endId: "", strategy: pathFindingType, accessibilityRoute: doAccessible };
      sendHoverMapPath(path);
    } else if (node.id == startNodeId) {
      clearSelection();
    } else if (!endNodeId) {
      setEndNodeId(node.id);
      if (graph && startNodeId) {
        setStartNodeId(startNodeId);
        setEndNodeId(node.id);
        const path: PathfindingRequest = { startId: startNodeId, endId: node.id, strategy: pathFindingType, accessibilityRoute: doAccessible };
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
      <foreignObject x={node.xCoord - 225} y={node.yCoord - 550} width="450" height="525">
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
      const floorChanges = gatherFloorChangeNodes();
    return (
      Array.from(graph.nodes.values()).map((node: Node) => {
        if (node.floor == floor && doDisplayNodes) {
            //if node is involved in a floor change, display node with diff color
            if(floorChanges.includes(node.id)) {
                return (
                    <g key={node.id} >
                        <circle className="dark:fill-purple-500 z-20 fill-green-800" cx={node.xCoord} cy={node.yCoord} r={hoverNodeId === node.id ? "15" : "11"} stroke="black" stroke-width="4"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleNodeClick(node)}
                                onMouseEnter={() => handleNodeHover(node)}
                                onMouseLeave={() => handleNodeHoverLeave()} />
                        {displayName(node)}
                    </g>
                );
            }
            else {
                return (
                    <g key={node.id} >

                        <circle className="dark:fill-white z-20 fill-blue-600" cx={node.xCoord} cy={node.yCoord} r={hoverNodeId === node.id ? "15" : "11"} stroke="black" stroke-width="4"
                                style={{ cursor: 'pointer' }}
                            // Moved events here so hovering on other components don't affect displayed nodes
                                onClick={() => handleNodeClick(node)}
                                onMouseEnter={() => handleNodeHover(node)}
                                onMouseLeave={() => handleNodeHoverLeave()} />
                        {displayName(node)}
                    </g>
                );
            }

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

    const gatherFloorChangeNodes = (): string[] => {
        const returnNodes: string[] = [];
        if(pathSent.length > 0) {
            let previousFloor = pathSent[0].floor;

            for (let i = 1; i < pathSent.length; i++) {
                const node = pathSent[i];
                const currentFloor = node.floor;

                if (!(currentFloor == previousFloor)) {
                    //set current and previous nodes as true in boolean array
                    //update previous floor to be current for next loop
                    returnNodes.push(pathSent[i].id);
                    returnNodes.push(pathSent[i - 1].id);
                    previousFloor = currentFloor;
                } else {
                    previousFloor = currentFloor;
                }
            }
        }
     //   console.log(returnNodes);
        return returnNodes;
    };
    const gatherFloorChangeStrings = (): string[] => {
        const returnStrings: string[] = [];
        let previousFloor = pathSent[0].floor;

        for(let i = 0; i < pathSent.length; i++) {
            const currentFloor = pathSent[i].floor;

            if (!(currentFloor == previousFloor)) {
                //update previous node in array to have string announcing floor change
                //to current... update previous floor to be current for next loop
                returnStrings[i] = "";
                returnStrings[i - 1] = "Go to floor " + currentFloor;
                previousFloor = currentFloor;
            }
            else {
                returnStrings[i] = "";
                previousFloor = currentFloor;
            }
        };
        return returnStrings;
    };

    const displayFloorChange = () => {
        // console.log("path sent");
        // console.log(pathSent);
        // console.log(path);
        const floorChanges = gatherFloorChangeStrings();

        return (
            Array.from(pathSent.map((node: Node, index: number) => {
                if(node.floor == floor && !(floorChanges[index] == "")) {
                    return (
                        <g>
                            <rect className="dark:fill-white z-20 fill-indigo-400" x={node.xCoord - 64}
                                  y={node.yCoord - 48}
                                  width="125" height="28" rx="1" stroke="black" stroke-width="4">
                                <animate
                                    attributeName="rx"
                                    values="0;13;0"
                                    dur="2s"
                                    repeatCount="indefinite"/>
                            </rect>
                            <text className="font-bold dark:invert" x={node.xCoord - 59}
                                  y={node.yCoord - 28} fill="black">
                                 {floorChanges[index]}
                     </text>
                    </g>
                );
                }
            }))
        );
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
                {graph && path.length > 0 && pathSent.length > 0 && displayFloorChange()}
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
