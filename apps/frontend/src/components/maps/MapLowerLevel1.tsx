import React from 'react';
import {Node} from 'common/src/graph-structure.ts';
import {useMapLogic} from "./useMapLogicFull.tsx";


function MapLowerLevel1() {
    const {
        graph,
        startNodeId,
        endNodeId,
        path,
        hoverNodeId,
        displayPath,
        handleNodeClick,
        handleNodeHover,
        handleNodeHoverLeave,
        displaySelectedNodes,
        displayHoverInfo
    } = useMapLogic();

    return (
        <div className={'floor L1'}>
            <svg viewBox="0 0 5000 3400">
                <img
                    className="pictureOfL1"
                    src={`public/maps/00_thelowerlevel1.png`}
                    alt={`Map: The Lower Level 1`}
                    style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: "10px"
                    }}
                />
                {graph && path.length > 0 && displayPath(graph, path)}
                {graph && Array.from(graph.nodes.values()).filter(node => node.floor === 'L1').map((node: Node) => (
                    <g key={node.id} onClick={() => handleNodeClick(node)} onMouseEnter={() => handleNodeHover(node)}
                       onMouseLeave={() => handleNodeHoverLeave()}>
                        <circle cx={node.xCoord} cy={node.yCoord} r="9" fill="blue" style={{cursor: 'pointer'}}/>
                        {startNodeId === node.id && displaySelectedNodes(node, 'start')}
                        {endNodeId === node.id && displaySelectedNodes(node, 'end')}
                        {hoverNodeId === node.id && displayHoverInfo(node, 'hover')}
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
export default MapLowerLevel1;
