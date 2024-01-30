import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import PathfindingRequest from "common/src/PathfindingRequest.ts";

interface Node {
    id: string;
    xCoord: number;
    yCoord: number;
    floor: string;
    building: string;
    nodeType: string;
    longName: string;
    shortName: string;
    edges: Record<string, unknown>; // Adjust the type of edges as needed
}

export function BFSComponent() {
    const [bfsResult, setBFSResult] = useState<Node[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request: PathfindingRequest = {
                    startid: "CCONF003L1",
                    endid: "CSERV001L1"
                };
                const response = await axios.post("/api/bfs-searching", request, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });

                if (response.status === 200) {
                    setBFSResult(response.data);
                }
            } catch (error) {
                console.error("Error fetching BFS result:", (error as AxiosError).message);
            }
        };

        fetchData().then();
    }, []); // Empty dependency array ensures the effect runs once on mount

    // Function to collect long names from bfsResult
    const collectLongNames = () => {
        return bfsResult.map(node => node.longName);
    };

    return (
        <div>
            <h2>Lower Floor 1 Navigation:</h2>
            {bfsResult.length !== 0 ? (
                <div>

                    <ul>
                        {collectLongNames().map((longName, index) => (
                            <li key={index}>{longName}</li>
                        ))}
                    </ul>
                    <h2>BFS Result:</h2>
                    {bfsResult.length != 0 ? (
                        <pre>{JSON.stringify(bfsResult, null, 2)}</pre>
                    ) : (
                        <p>Loading BFS result...</p>
                    )}
                </div>
            ) : (
                <p>Loading BFS result...</p>
            )}
        </div>
    );
}
