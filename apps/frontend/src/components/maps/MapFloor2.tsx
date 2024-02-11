import React, {CSSProperties, useEffect, useState} from 'react';
import {Graph, Node} from 'common/src/graph-structure.ts';
import populatedGraph from 'common/dev/populatedGraph.ts';
import {useMapLogic,} from './useMapLogicFull';
interface MapFloor2Props {
    style?: CSSProperties;
    className?: string;
    startNode?: string;
    endNode?: string;
}
const MapFloor2 = () => {
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
        <div className={"floor2"}>
            <svg viewBox="0 0 5000 3400">
                <img
                    className="pictureOfF2"
                    src={`public/maps/02_thesecondfloor.png`}
                    alt={`Map: Floor 2`}
                    style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: "10px"
                    }}
                />
                {graph && path.length > 0 && displayPath(graph, path)}
                {graph && Array.from(graph.nodes.values()).filter(node => node.floor === '2').map((node: Node) => (
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
export default MapFloor2;
