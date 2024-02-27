// NodeComponent.tsx
import React from 'react';
import { Node } from "common/src/node.ts";


interface NodeComponentProps {
    node: Node;
    hoverNodeId: string | null;
    iconPaths: { [key: string]: string };
    handleNodeClick: (node: Node) => void;
    handleNodeHover: (node: Node) => void;
    handleNodeHoverLeave: () => void;
    doDisplayNames: boolean;
    floor: string;
}

export const NodeComponent: React.FC<NodeComponentProps> = ({
    node,
    hoverNodeId,
    iconPaths,
    handleNodeClick,
    handleNodeHover,
    handleNodeHoverLeave,
    doDisplayNames,
    floor
}) => {
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

            <circle
                cx={node.xCoord + iconSize.width / 2}
                cy={node.yCoord - iconSize.height / 2}
                r="6"
                fill="red"
                style={{cursor: 'pointer'}}
            />
            {displayName(node)}
        </g>
    );
};
