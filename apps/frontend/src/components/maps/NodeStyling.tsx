import React, {ReactNode, useEffect, useState} from 'react';

import "./animation.css";
import {Node} from "common/src/node.ts";
import {NodeVisit} from "common/src/interfaces/interfaces.ts";

export function NodeStyling(props: {
    node: Node,
    iconSize: { width: number; height: number },
    href: string,
    onClick: () => void,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    element: ReactNode,
    heatmap: NodeVisit[]
    useHeatMap: boolean;
}) {
    const [HeatMap ] = useState<boolean>(false);
    const [nodeVisit, setNodeVisit] = useState<number>();

    useEffect(() => {
        const nodeVisitCount = props.heatmap.find(nodeVisit => nodeVisit.nodeId === props.node.id);
        if (nodeVisitCount) {
            setNodeVisit(nodeVisitCount.count);
        } else
            setNodeVisit(0);

    }, [props.heatmap, props.node.id]); // Run once when component mounts

    // Function to calculate box shadow color based on count
    const getBoxShadowColor = (count: number): string => {
        if (count >= 100) {
            return 'red';
        } else if (count >= 80) {
            return 'lightcoral';
        } else if (count >= 60){
            return 'orange';
        } else if (count >= 40){
            return 'lightsalmon';
        } else if (count >= 20){
            return 'green';
        } else {
            return 'lightgreen';
        }
    };

    return <g>

        <rect className={HeatMap ? "" : ""}
              x={props.node.xCoord - props.iconSize.width / 2}
              y={props.node.yCoord - props.iconSize.height / 2}
              width={props.iconSize.width}
              height={props.iconSize.height}
              fill={nodeVisit ? getBoxShadowColor(nodeVisit) : 'green'}
              rx="3"
              style={{cursor: "pointer"}}
        />
        <image
            href={props.href}
            x={props.node.xCoord - props.iconSize.width / 2}
            y={props.node.yCoord - props.iconSize.height / 2}
            width={props.iconSize.width}
            height={props.iconSize.height}
            style={{cursor: "pointer"}}
            onClick={props.onClick}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        />
        {props.element}
    </g>;
}

