import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
//import Select from "react-select";
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
    edges: Record<string, unknown>;
}

export function BFSComponent() {
    const [bfsResult, setBFSResult] = useState<Node[]>([]);
    const [startNode, setStartNode] = useState<string>("");
    const [endNode, setEndNode] = useState<string>("");

    const fetchData = useCallback(async (): Promise<AxiosResponse<Node[]>> => {
        try {
            const request: PathfindingRequest = {
                startid: startNode,
                endid: endNode
            };
            const response: AxiosResponse<Node[]> = await axios.post("/api/bfs-searching", request, {
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (response.status === 200) {
                setBFSResult(response.data);
            }

            return response;
        } catch (error) {
            console.error("Error fetching BFS result:", (error as AxiosError).message);
            throw error;
        }
    }, [startNode, endNode]);

    useEffect(() => {
        fetchData()
            .then(response => {
                // Handle success
                console.log(response.data);
            })
            .catch(error => {
                // Handle error
                console.error("Error:", error.message);
                // Optionally set state or show error message to the user
            });
    }, [fetchData]);

    const collectLongNames = () => {
        return bfsResult.map(node => node.longName);
    };

    // const options = [
    //     {value: 'CCONF001L1', label: 'Anesthesia Conf Floor L1'},
    //     {value: 'CCONF002L1', label: 'Medical Records Conference Room Floor L1'},
    //     {value: 'CCONF003L1', label: 'Abrams Conference Room'},
    // ];

    return (
        <div>
            <h2>Lower Floor 1 Navigation</h2>
            <form>
                <label>
                    Start Location:
                    <input type="text" value={startNode} onChange={(e) => setStartNode(e.target.value)}/>
                </label>
                <p></p>
                <label>
                    End Location:
                    <input type="text" value={endNode} onChange={(e) => setEndNode(e.target.value)}/>
                </label>
            </form>
            <p></p>
            <h6> Below is the path to take to get to your destination starting from your current location: </h6>
            <p></p>

            {bfsResult.length > 0 ? (
                <div>
                    <ul>
                        {collectLongNames().map((longName, index) => (
                            <li key={index}>{longName} </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading Route...</p>
            )}
        </div>
    );
}
