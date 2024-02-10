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
        <div className ={"floor2"}>
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
        </div>
    );
};
export default MapFloor2;
