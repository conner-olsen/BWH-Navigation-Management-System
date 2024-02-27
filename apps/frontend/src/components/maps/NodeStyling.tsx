import React, {useEffect, useState} from 'react';
import {Graph} from 'common/src/graph.ts';
//import {PathfindingStrategy} from "common/src/pathfinding-strategy.ts";
import axios   from "axios";
import "./animation.css";
import { Node } from "common/src/node.ts";
import PathfindingRequest from "common/src/interfaces/pathfinding-request.ts";
import {iconPaths} from "./IconPath.tsx";

export default function nodeStyling({}){

    return (
        <g key={node.id}>
        <rect
            x={node.xCoord - iconSize.width / 2}
            y={node.yCoord - iconSize.height / 2}
            width={iconSize.width}
            height={iconSize.height}
            fill="white"
            style={{cursor: 'pointer'}}
        />
        <image
            href={iconPath}
            x={node.xCoord - iconSize.width / 2}
            y={node.yCoord - iconSize.height / 2}
            width={iconSize.width}
            height={iconSize.height}
            style={{cursor: 'pointer'}}
            onClick={() => handleNodeClick(node)}
            onMouseEnter={() => handleNodeHover(node)}
            onMouseLeave={() => handleNodeHoverLeave()}
        />
        {displayName(node)}
    </g>);

};

