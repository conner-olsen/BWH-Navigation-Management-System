// NodeComponent.tsx
import React, {useEffect, useState} from 'react';
import { Node } from "common/src/node.ts";
import axios from "axios";
import {iconPaths} from "./IconPath.tsx";


interface NodeComponentProps {
    node: Node;
    hoverNodeId: string | null;
    handleNodeClick: (node: Node) => void;
    handleNodeHover: (node: Node) => void;
    handleNodeHoverLeave: () => void;
    doDisplayNames: boolean;
    floor: string;
}

export const NodeComponent: React.FC<NodeComponentProps> = ({
    node,
    hoverNodeId,
    handleNodeClick,
    handleNodeHover,
    handleNodeHoverLeave,
    doDisplayNames,
    floor
}) => {
    const [showServiceIndicator, setShowServiceIndicator] = useState(false);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await axios.post("/api/get-stats", node); // Pass the entire node object
                if (response.status === 200 && response.data > 0) {
                    setShowServiceIndicator(true);
                } else {
                    setShowServiceIndicator(false);
                }
            } catch (error) {
                console.error("error getting count", error);
                setShowServiceIndicator(false);
            }
        };

        fetchServiceData();
    }, [node]);

    let iconPath = iconPaths[node.nodeType] || "../../public/icon/Hall.png";
    const iconSize = hoverNodeId === node.id ? { width: 25, height: 25} : { width: 20, height: 20 };
    const color = document.body.classList.contains('dark') ? "black" : "white";

    const displayName = (node: Node) => {
        if ((doDisplayNames && (node.floor == floor)) && !(node.nodeType == "HALL")) {
            return (
                <text className="font-bold dark:invert" x={node.xCoord - 65} y={node.yCoord - 20} fill="black">
                    {node.shortName}
                </text>
            );
        }
    };

    return (
        <g key={node.id}>
            <rect
                x={node.xCoord - iconSize.width / 2}
                y={node.yCoord - iconSize.height / 2}
                width={iconSize.width}
                height={iconSize.height}
                style={{cursor: 'pointer'}}
                fill={color}
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
                onMouseLeave={handleNodeHoverLeave}
            />

            {showServiceIndicator && (
                <circle
                    cx={node.xCoord + iconSize.width / 2}
                    cy={node.yCoord - iconSize.height / 2}
                    r="6"
                    fill="red"
                />
            )}
            {displayName(node)}
        </g>
    );
};
