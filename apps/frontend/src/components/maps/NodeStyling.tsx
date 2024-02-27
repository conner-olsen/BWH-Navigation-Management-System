import React, {ReactNode, useEffect, useState} from 'react';

import "./animation.css";
import {Node} from "common/src/node.ts";
import {NodeVisit} from "common/src/interfaces/interfaces.ts";
import axios from "axios";

export function NodeStyling(props: {
    node: Node,
    iconSize: { width: number; height: number },
    href: string,
    onClick: () => void,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    element: ReactNode
}) {
    const [nodeArray, setNodeArray] = useState<NodeVisit[] | null>(null);
    const [HeatMap, ] = useState<boolean>(false);

    useEffect(() => {
        // Fetch node data from API initially
        fetchData();

        // Fetch node data every 5 seconds
        const intervalId = setInterval(fetchData, 5000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Run once when component mounts

    const fetchData = () => {
        axios.get('/api/heat-map')
            .then(res => {
                setNodeArray(res.data);
            })
            .catch(error => {
                console.error('Error fetching node data:', error);
            });
    };

    // Function to calculate box shadow color based on count
    const getBoxShadowColor = (count: number): string => {
        if (count >= 10) {
            return 'red';
        } else if (count >= 5) {
            return 'orange';
        } else {
            return 'green';
        }
    };

    // Function to get count for the current node from nodeArray
    const getNodeCount = (node: Node): number | undefined => {
        if (nodeArray) {
            const nodeVisit = nodeArray.find(nodeVisit => nodeVisit.nodeId === node.id);
            if (nodeVisit) {
                return nodeVisit.count;
            }
        }
        return undefined;
    };

    const boxShadowColor = getNodeCount(props.node);

    return <g>

        <rect className={HeatMap ? "" : ""}
              x={props.node.xCoord - props.iconSize.width / 2}
              y={props.node.yCoord - props.iconSize.height / 2}
              width={props.iconSize.width}
              height={props.iconSize.height}
              fill={boxShadowColor ? getBoxShadowColor(boxShadowColor) : 'green'}
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

