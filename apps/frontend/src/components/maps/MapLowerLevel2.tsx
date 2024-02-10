import React, {CSSProperties, useEffect, useState} from 'react';
import {Graph, Node} from 'common/src/graph-structure.ts';
import populatedGraph from 'common/dev/populatedGraph.ts';
import {useMapLogic,} from './useMapLogicFull';
const MapLowerLevel2 = () => {
    return (
        <div className ={"lowerLevel2"}>
            <img
                className="pictureOfL2"
                src={`public/maps/00_thelowerlevel2.png`}
                alt={`Map: The Lower Level 2`}
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
export default MapLowerLevel2;
