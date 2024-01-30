import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import PathfindingRequest from "common/src/PathfindingRequest.ts";

export function BFSComponent() {
    const [bfsResult, setBFSResult] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request:PathfindingRequest = {
                    startid:"CHALL008L1",
                    endid:"WELEV00LL1"
                };
                const response = await axios.post("/api/bfs-searching",request, {
                    headers: {
                        'Content-Type':"application/json"
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

    return (
        <div>
            <h2>BFS Result:</h2>
            {bfsResult.length != 0 ? (
                <pre>{JSON.stringify(bfsResult, null, 2)}</pre>
            ) : (
                <p>Loading BFS result...</p>
            )}
        </div>
    );
}
