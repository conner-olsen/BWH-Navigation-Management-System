import React, {CSSProperties, useEffect, useState} from 'react';
import {Graph, Node} from 'common/src/graph-structure.ts';
import populatedGraph from 'common/dev/populatedGraph.ts';
import {useMapLogic,} from './useMapLogicFull';
interface MapFloor3Props {
    style?: CSSProperties;
    className?: string;
    startNode?: string;
    endNode?: string;
}
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
        <div className ={"floor3"}>
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
        </div>
    );
};
export default MapFloor3;
