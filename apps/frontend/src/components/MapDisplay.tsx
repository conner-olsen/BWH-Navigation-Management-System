import React, {useEffect, useState} from 'react';
import {Graph, Node} from 'common/src/graph-structure.ts';
import populatedGraph from 'common/dev/populatedGraph.ts';

/**
 * Displays a map with nodes and edges.
 *
 * @constructor
 * @returns {JSX.Element} The map display component.
 */
function MapDisplay() {
    const [graph, setGraph] = useState<Graph | null>(null);

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
    const handleNodeClick = (node: Node) => {
        // click event on a node
        console.log(`Node: ${node.id}, Location: (${node.xCoord}, ${node.yCoord})`);
        // For example, displaying node details
    };

    return (
        <div style={{position: 'relative'}}>
            <svg className="max-w-full max-h-full object-cover" viewBox="0 0 5000 3400">
                <image href="../../public/maps/L1map.png" width="5000" height="3400" x="0" y="0"/>
                {graph && displayEdges(graph)}
                {graph && Array.from(graph.nodes.values()).map((node: Node) => (
                    <circle key={node.id}
                            cx={node.xCoord}
                            cy={node.yCoord}
                            r="5"
                            fill="red"
                            onClick={() => handleNodeClick(node)}
                            style={{cursor: 'pointer'}}/>
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
