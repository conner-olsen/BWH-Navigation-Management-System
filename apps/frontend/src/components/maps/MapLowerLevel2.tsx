import React from 'react';
import {useMapLogic,} from './useMapLogicFull';
import {Node} from "common/src/node.ts";
const MapLowerLevel2 = () => {
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
        <div className={"lowerLevel2"}>
            <svg viewBox="0 0 5000 3400" className={"w-screen max-w-full"}>
                <image
                    href={'public/maps/00_thelowerlevel2.png'}
                    x="0"
                    y="0"
                    height="100%"
                    width="100%"
                />
                {graph && path.length > 0 && displayPath(graph, path)}
                {graph && Array.from(graph.nodes.values()).filter(node => node.floor === 'L2').map((node: Node) => (
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
export default MapLowerLevel2;
