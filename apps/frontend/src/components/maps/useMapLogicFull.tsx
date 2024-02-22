
import { useState, useEffect } from 'react';
import { Graph, Node } from "common/src/graph-structure";
import populatedGraph from "common/dev/populatedGraph";
import React from "react";
import 'animation.css';

interface UseMapLogicReturn {
  graph: Graph | null;
  startNodeId: string | null;
  endNodeId: string | null;
  path: string[];
  hoverNodeId: string | null;
  handleNodeClick: (node: Node) => void;
  handleNodeHover: (node: Node) => void;
  handleNodeHoverLeave: () => void;
  displayHoverInfo: (node: Node, type: string) => JSX.Element;
  clearSelection: () => void;
  displaySelectedNodes: (node: Node, type: string) => JSX.Element;
  displayPath: (graph: Graph, path: string[]) => JSX.Element[];
}
interface AnimatedPathProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export const useMapLogic = (startNode?: string, endNode?: string): UseMapLogicReturn => {
  const [graph, setGraph] = useState<Graph | null>(null);
  const [startNodeId, setStartNodeId] = useState<string | null>(startNode || null);
  const [endNodeId, setEndNodeId] = useState<string | null>(endNode || null);
  const [path, setPath] = useState<string[]>([]);
  const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);

    useEffect(() => {
        setGraph(populatedGraph);
        if (startNode && endNode && graph) {
            const path = graph.bfsAstar(startNode, endNode);
            setPath(path);
            setStartNodeId(startNode);
            setEndNodeId(endNode);
        }
    }, [startNode, endNode, graph]);

    const AnimatedPath: React.FC<AnimatedPathProps> = ({ x1, y1, x2, y2 }) => (
        <line
            className="line-animation"
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="red"
            strokeWidth="3"
        />
    );
    const displayPath = (graph: Graph, path: string[]) => {
        const pathElements: React.JSX.Element[] = [];
        for (let i = 0; i < path.length - 1; i++) {
            const node = graph.getNode(path[i]);
            const nextNode = graph.getNode(path[i + 1]);
            if (node && nextNode) {
                pathElements.push(
                    <AnimatedPath
                        key={`${node.id}-${nextNode.id}`}
                        x1={node.xCoord}
                        y1={node.yCoord}
                        x2={nextNode.xCoord}
                        y2={nextNode.yCoord}
                    />
                );
            }
        }
        return pathElements;
    };

    const handleNodeClick = (node: Node) => {
        if (!startNodeId) {
            setStartNodeId(node.id);
        }
        else if (node.id == startNodeId) {
            clearSelection();
        }
        else if (!endNodeId) {
            setEndNodeId(node.id);
            if (graph && startNodeId) {
                const path = graph.bfs(startNodeId, node.id);
                setPath(path);
            }
        }
    };

    const handleNodeHover = (node: Node) => {
        if (!hoverNodeId) {
            setHoverNodeId(node.id);
        }
    };

    const handleNodeHoverLeave = () => {
        console.log("hover left");
        if (hoverNodeId) {
            setHoverNodeId(null);
        }
    };

    const displayHoverInfo = (node: Node, type: string) => {
        return (
            <g>
                {type === 'hover'}
                <rect x={node.xCoord - 415} y={node.yCoord - 130} width="315" height="125" fill="lightgrey"/>;
                <text x={node.xCoord - 400} y={node.yCoord - 105} fill="black">
                    Type: {node.nodeType}
                </text>;
                <text x={node.xCoord - 400} y={node.yCoord - 80} fill="black">
                    {node.longName}
                </text>;
                <text x={node.xCoord - 400} y={node.yCoord - 55} fill="black">
                    {node.shortName}
                </text>;
                <text x={node.xCoord - 400} y={node.yCoord - 30} fill="black">
                    Status: -/-
                </text>;
            </g>
        );
    };
    const clearSelection = () => {
        setStartNodeId(null);
        setEndNodeId(null);
        setPath([]);
    };
    const displaySelectedNodes = (node: Node, type: string) => {
        return (
            <g>
                <rect x={node.xCoord - 100} y={node.yCoord - 50} width="100" height="60" fill="lightgrey"/>
                <text x={node.xCoord - 85} y={node.yCoord - 30} fill="black">
                    {type === 'start' ? 'Start Node' : 'End Node'}
                </text>
                <text x={node.xCoord - 70} y={node.yCoord - 5} fill="blue" style={{cursor: 'pointer'}}
                      onClick={() => clearSelection()}>
                    Clear
                </text>
            </g>
        );
    };

  return { 
    graph, 
    startNodeId, 
    endNodeId, 
    path, 
    hoverNodeId, 
    handleNodeClick,
    handleNodeHover,
    handleNodeHoverLeave,
    displayHoverInfo,
    clearSelection,
    displaySelectedNodes,
    displayPath
  };
};
