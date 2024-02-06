import React, {CSSProperties, useEffect, useState} from 'react';
import {Graph, Node} from 'common/src/graph-structure.ts';
import populatedGraph from 'common/dev/populatedGraph.ts';

interface MapDisplayProps {
    style?: CSSProperties;
    className?: string;
}

function MapDisplay({style, className}: MapDisplayProps) {
    const [graph, setGraph] = useState<Graph | null>(null);
    const [startNodeId, setStartNodeId] = useState<string | null>(null);
    const [endNodeId, setEndNodeId] = useState<string | null>(null);
    const [path, setPath] = useState<string[]>([]);

    useEffect(() => {
        setGraph(populatedGraph);
    }, []);

    const displayEdges = (graph: Graph) => {
        const edges: React.JSX.Element[] = [];
        for (const [nodeId, node] of graph.nodes) {
            node.edges.forEach(edgeNodeId => {
                const targetNode = graph.getNode(edgeNodeId);
                if (targetNode) {
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
    };
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
                          stroke="red" strokeWidth="2"/>
                );
            }
        }
        return pathElements;
    };

    const handleNodeClick = (node: Node) => {
        if (!startNodeId) {
            setStartNodeId(node.id);
        } else if (!endNodeId) {
            setEndNodeId(node.id);
            if (graph && startNodeId) {
                const path = graph.bfs(startNodeId, node.id);
                setPath(path);
            }
        }
        return (
        <text>
            this is
            node.nodeType;
            node.longName;
            node.shortName;
            /*status*/
        </text>
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
                <rect x={node.xCoord - 415} y={node.yCoord - 150} width="315" height="125" fill="lightgrey"/>
                <text x={node.xCoord - 400} y={node.yCoord - 125} fill="black">
                    Type: {node.nodeType}
                </text>
                <text x={node.xCoord - 400} y={node.yCoord - 100} fill="black">
                    {node.longName}
                </text>
                <text x={node.xCoord - 400} y={node.yCoord - 75} fill="black">
                    {node.shortName}
                </text>
                <text x={node.xCoord - 400} y={node.yCoord - 50} fill="black">
                    Status: (not implemented yet)
                </text>
            </g>
        );
    };

    return (
        <div className={className} style={{position: 'relative', ...style}}>
            <svg viewBox="0 0 5000 3400">
                <image href="../../public/maps/L1map.png" width="5000" height="3400" x="0" y="0"/>
                {graph && displayEdges(graph)}
                {graph && path.length > 0 && displayPath(graph, path)}
                {graph && Array.from(graph.nodes.values()).map((node: Node) => (
                    <g key={node.id} onClick={() => handleNodeClick(node)}>
                        <circle cx={node.xCoord} cy={node.yCoord} r="5" fill="red" style={{cursor: 'pointer'}}/>
                        {startNodeId === node.id && displaySelectedNodes(node, 'start')}
                        {endNodeId === node.id && displaySelectedNodes(node, 'end')}
                    </g>
                ))}
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
