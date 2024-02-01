import React, { useEffect, useState } from 'react';
import { Graph, Node } from 'common/src/graph-structure.ts';
import populatedGraph from 'common/dev/populatedGraph.ts';

function MapDisplay() {
    const [graph, setGraph] = useState<Graph | null>(null);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);

    useEffect(() => {
        setGraph(populatedGraph);
    }, []);
    const displayEdges = (graph: Graph) => {
        const edges : React.JSX.Element[] = [];
        for (const [nodeId, node] of graph.nodes) {
            node.edges.forEach(edgeNodeId => {
                const targetNode = graph.getNode(edgeNodeId);
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
    const handleNodeClick = (node: Node) => {
        // click event on a node
        setSelectedNode(node);//example
        console.log(`Node: ${node.id}, Location: (${node.xCoord}, ${node.yCoord})`);
        // For example, displaying node details
    };

    return (
        <div style={{ position: 'relative' }}>
            <svg className="max-w-full max-h-full object-cover" viewBox="0 0 5000 3400">
                <image href="../../public/maps/L1map.png" width="5000" height="3400" x="0" y="0"/>
                {graph && displayEdges(graph)}
                {graph && Array.from(graph.nodes.values()).map((node: Node) => (
                    <circle key={node.id}
                            cx={node.xCoord}
                            cy={node.yCoord}
                            r="5"
                            fill="red"
                            onClick={() => handleNodeClick(node)}
                            style={{ cursor: 'pointer' }}/>
                ))}
                {selectedNode && (
                    <div style={{
                        position: 'absolute',
                        left: `${selectedNode.xCoord}px`,
                        top: `${selectedNode.yCoord - 100}px`, // Adjust the size
                        padding: '10px',
                        backgroundColor: 'white',
                        border: '1px solid black',
                        borderRadius: '5px',
                        pointerEvents: 'none',
                    }}>
                        <div><strong>ID:</strong> {selectedNode.id}</div>
                        <div><strong>Location:</strong> ({selectedNode.xCoord}, {selectedNode.yCoord})</div>
                        <div><strong>Floor:</strong> ({selectedNode.floor})</div>
                        <div><strong>Building:</strong> ({selectedNode.building})</div>
                        <div><strong>Type:</strong> ({selectedNode.nodeType})</div>
                    </div>)}
            </svg>
        </div>
    );
}

export default MapDisplay;
