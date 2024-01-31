import React, { useEffect, useState } from 'react';
import { Graph, Node } from 'common/src/graph-structure.ts';
import populatedGraph from 'common/dev/populatedGraph.ts';

function MapDisplay() {
    const [graph, setGraph] = useState<Graph | null>(null);

    useEffect(() => {
        setGraph(populatedGraph);
    }, []);

    return (
        <svg x="0" y="0" viewBox="0 0 5000 3400">
            <image href="../../public/maps/L1map.png" width="5000" height="3400" x="0" y="0"/>
            {graph && Array.from(graph.nodes.values()).map((node: Node) => (
                <circle key={node.id} cx={node.xCoord} cy={node.yCoord} r="5" fill="red" />
            ))}
        </svg>
    );
}

export default MapDisplay;
