import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import {Node} from "common/src/graph-structure.ts";
import PathfindingRequest from "common/src/PathfindingRequest.ts";
 import {parseCSV} from "common/src/parser.ts";
 import nodeCSVString from "common/dev/nodeCSVString.ts";

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

    //parse node CSV into array of CSVRows
    const CSVRow = parseCSV(nodeCSVString);
    //make array to be inserted in the html code
    const roomNames = [];

    //for each CSV row, add an option with the value as id and name as longName into array
    for(let i = 0; i < CSVRow.length; i++) {
        const row = CSVRow[i];
        const rowval = Object.values(row);
        const id = rowval[0];
        const longName = row["longName"];
        roomNames.push(<option value={id}> {longName} </option>);
    }

    return (
        <div>
            <br/>
            <h1 className={"pageHeader"}>Lower Floor 1 Navigation</h1>

            <br/>
            <h4>Start Location: </h4>
            <select className="idinput" value={startNode}
                    onChange={e => setStartNode(e.target.value)}>
                <option></option>
                {roomNames}
            </select>
            <br/>

            <h4>End Location: </h4>
            <select className="idinput" value={endNode} onChange={e => setEndNode(e.target.value)}>
            <option></option>
                {roomNames}
            </select>
            <br/>

            <br/>
            <p className = "routeheader" > Beginning from your start location, below is the path to take to get to your destination: </p>
            <h2></h2>
            {bfsResult.length > 0 ? (
                <div>
                    <ul>
                        {collectLongNames().map((longName, index) => (
                            <p className = "route" key={index}>{longName} </p>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Please select two locations above</p>
            )}
        </div>
    );
}
