import React from 'react';
import {Node} from 'common/src/graph-structure.ts';
import {useMapLogic,} from './useMapLogicFull';
const MapFloor3 = () => {
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
        <div className={"floor3"}>
            <svg viewBox="0 0 5000 3400">
                <img
                    className="pictureOfF3"
                    src={`public/maps/03_thethirdfloor.png`}
                    alt={`Map: Floor 3`}
                    style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: "10px"
                    }}
                />
                {graph && path.length > 0 && displayPath(graph, path)}
                {graph && Array.from(graph.nodes.values()).filter(node => node.floor === '3').map((node: Node) => (
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
};
export default MapFloor3;