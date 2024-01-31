import React, { useEffect, useState } from 'react';
import { Graph, Node } from 'common/src/graph-structure.ts';
import populatedGraph from 'common/dev/populatedGraph.ts';

function MapDisplay() {
    const [graph, setGraph] = useState<Graph | null>(null);

    useEffect(() => {
        setGraph(populatedGraph);
    }, []);
    const displayEdges = (graph: Graph) => {
        let edges = [];
        for (let [nodeId, node] of graph.nodes) {
            node.edges.forEach(edgeNodeId => {
                let targetNode = graph.getNode(edgeNodeId);
                if (targetNode) {
                    edges.push(
                        <line key={`${nodeId}-${edgeNodeId}`}
                              x1={node.xCoord} y1={node.yCoord}
                              x2={targetNode.xCoord} y2={targetNode.yCoord}
                              stroke="black" strokeWidth="1"/>
                    );
                }
            });
        }
        return edges;
    };

    return (
        <svg x="0" y="0" viewBox="0 0 5000 3400">
            <image href="../../public/maps/L1map.png" width="5000" height="3400" x="0" y="0"/>
            {graph && displayEdges(graph)}
            {graph && Array.from(graph.nodes.values()).map((node: Node) => (
                <circle key={node.id} cx={node.xCoord} cy={node.yCoord} r="5" fill="red" />
            ))}
        </svg>
    );
}

export default MapDisplay;
