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
    averageHeatIndex: number;
    nodesList: string[];
}) {
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
        const average = props.averageHeatIndex;
        const distance = Math.abs(count - average);
        const maxDistance = 4*average; // Maximum distance from the average
        const normalizedDistance = Math.min(distance / maxDistance, 1);

        // Interpolate between green (120 degrees) and red (0 degrees) in the HSL color space
        const hue = normalizedDistance * (120 / 360); // 120 degrees for green, 0 degrees for red
        const saturation = 1; // Full saturation
        const lightness = 0.5; // Middle lightness

        // Convert HSL to RGB
        const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
        const x = c * (1 - Math.abs((hue * 6) % 2 - 1));
        const m = lightness - c / 2;
        let r, g, b;
        if (0 <= hue && hue < 1 / 6) {
            [r, g, b] = [c, x, 0];
        } else if (1 / 6 <= hue && hue < 2 / 6) {
            [r, g, b] = [x, c, 0];
        } else if (2 / 6 <= hue && hue < 3 / 6) {
            [r, g, b] = [0, c, x];
        } else if (3 / 6 <= hue && hue < 4 / 6) {
            [r, g, b] = [0, x, c];
        } else if (4 / 6 <= hue && hue < 5 / 6) {
            [r, g, b] = [x, 0, c];
        } else {
            [r, g, b] = [c, 0, x];
        }

        // Adjust RGB values to 0-255 range and return color string
        return `rgb(${Math.floor((r + m) * 255)},${Math.floor((g + m) * 255)},${Math.floor((b + m) * 255)})`;
    };

    return(<g>

        <rect className={props.useHeatMap ? "" : "fill-blue-100 dark:fill-blue-900"}
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
        {props.nodesList.includes(props.node.id)&& (
            <circle
                cx={props.node.xCoord + props.iconSize.width / 2}
                cy={props.node.yCoord - props.iconSize.height / 2}
                r="6"
                fill="red"
            />
        )}
        {props.element}
    </g>);
}

