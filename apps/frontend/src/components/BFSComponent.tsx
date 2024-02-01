import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import {Node} from "common/src/graph-structure.ts";
import PathfindingRequest from "common/src/PathfindingRequest.ts";

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

    return (
        <div>
            <p></p>
            <h2>Lower Floor 1 Navigation</h2>
            <p></p>
            <h4>Start Location: </h4>
            <select className="idinput" value={startNode}
                    onChange={e => setStartNode(e.target.value)}>
                <option></option>
                <option value="CCONF001L1"> Anesthesia Conf Floor L1</option>
                <option value="CCONF002L1">Medical Records Conference Room Floor L1</option>
                <option value="CCONF003L1">Abrams Conference Room</option>
                <option value="CDEPT002L1">Day Surgery Family Waiting Floor L1</option>
                <option value="CDEPT003L1">Day Surgery Family Waiting Exit Floor L1</option>
                <option value="CDEPT004L1">Medical Records Film Library Floor L1</option>
                <option value="CHALL001L1">Hallway 1 Floor L1</option>
                <option value="CHALL002L1">Hallway 2 Floor L1</option>
                <option value="CHALL003L1">Hallway 3 Floor L1</option>
                <option value="CHALL004L1">Hallway 4 Floor L1</option>
                <option value="CHALL005L1">Hallway 5 Floor L1</option>
                <option value="CHALL006L1">Hallway 6 Floor L1</option>
                <option value="CHALL007L1">Hallway 7 Floor L1</option>
                <option value="CHALL008L1">Hallway 8 Floor L1</option>
                <option value="CHALL009L1">Hallway 9 Floor L1</option>
                <option value="CHALL010L1">Hallway 10 Floor L1</option>
                <option value="CHALL011L1">Hallway 11 Floor L1</option>
                <option value="CHALL012L1">Hallway 12 Floor L1</option>
                <option value="CHALL013L1">Hallway 13 Floor L1</option>
                <option value="CHALL014L1">Hallway 14 Floor L1</option>
                <option value="CHALL015L1">Hallway 15 Floor L1</option>
                <option value="CLABS001L1">Outpatient Fluoroscopy Floor L1</option>
                <option value="CLABS002L1">Pre-Op PACU Floor L1</option>
                <option value="CLABS003L1">Nuclear Medicine Floor L1</option>
                <option value="CLABS004L1">Ultrasound Floor L1</option>
                <option value="CLABS005L1">CSIR MRI Floor L1</option>
                <option value="CREST001L1">Restroom L Elevator Floor L1</option>
                <option value="CREST002L1">Restroom M Elevator Floor L1</option>
                <option value="CREST003L1">Restroom K Elevator Floor L1</option>
                <option value="CREST004L1">Restroom H Elevator Floor L1</option>
                <option value="CRETL001L1">Vending Machine 1 L1</option>
                <option value="CSERV001L1">Volunteers Floor L1</option>
                <option value="CSERV001L2">Interpreter Services Floor L2</option>
                <option value="GELEV00QL1">Elevator Q MapNode 7 Floor L1</option>
                <option value="GEXIT001L1">Fenwood Road Exit MapNode 1 Floor L1</option>
                <option value="GHALL002L1">Hallway MapNode 2 Floor L1</option>
                <option value="GHALL003L1">Hallway MapNode 3 Floor L1</option>
                <option value="GHALL004L1">Hallway MapNode 4 Floor L1</option>
                <option value="GHALL005L1">Hallway MapNode 5 Floor L1</option>
                <option value="GHALL006L1">Hallway MapNode 6 Floor L1</option>
                <option value="GSTAI008L1">Stairs MapNode 8 Floor L1</option>
                <option value="WELEV00HL1">Elevator H Floor L1</option>
                <option value="WELEV00JL1">Elevator J Floor L1</option>
                <option value="WELEV00KL1">Elevator K Floor L1</option>
                <option value="WELEV00LL1">Elevator L Floor L1</option>
                <option value="WELEV00ML1">Elevator M Floor L1</option>
            </select>
            <p></p>

            <h4>End Location: </h4>
            <select className="idinput" value={endNode} onChange={e => setEndNode(e.target.value)}>
                <option></option>
                <option value="CCONF001L1"> Anesthesia Conf Floor L1</option>
                <option value="CCONF002L1">Medical Records Conference Room Floor L1</option>
                <option value="CCONF003L1">Abrams Conference Room</option>
                <option value="CDEPT002L1">Day Surgery Family Waiting Floor L1</option>
                <option value="CDEPT003L1">Day Surgery Family Waiting Exit Floor L1</option>
                <option value="CDEPT004L1">Medical Records Film Library Floor L1</option>
                <option value="CHALL001L1">Hallway 1 Floor L1</option>
                <option value="CHALL002L1">Hallway 2 Floor L1</option>
                <option value="CHALL003L1">Hallway 3 Floor L1</option>
                <option value="CHALL004L1">Hallway 4 Floor L1</option>
                <option value="CHALL005L1">Hallway 5 Floor L1</option>
                <option value="CHALL006L1">Hallway 6 Floor L1</option>
                <option value="CHALL007L1">Hallway 7 Floor L1</option>
                <option value="CHALL008L1">Hallway 8 Floor L1</option>
                <option value="CHALL009L1">Hallway 9 Floor L1</option>
                <option value="CHALL010L1">Hallway 10 Floor L1</option>
                <option value="CHALL011L1">Hallway 11 Floor L1</option>
                <option value="CHALL012L1">Hallway 12 Floor L1</option>
                <option value="CHALL013L1">Hallway 13 Floor L1</option>
                <option value="CHALL014L1">Hallway 14 Floor L1</option>
                <option value="CHALL015L1">Hallway 15 Floor L1</option>
                <option value="CLABS001L1">Outpatient Fluoroscopy Floor L1</option>
                <option value="CLABS002L1">Pre-Op PACU Floor L1</option>
                <option value="CLABS003L1">Nuclear Medicine Floor L1</option>
                <option value="CLABS004L1">Ultrasound Floor L1</option>
                <option value="CLABS005L1">CSIR MRI Floor L1</option>
                <option value="CREST001L1">Restroom L Elevator Floor L1</option>
                <option value="CREST002L1">Restroom M Elevator Floor L1</option>
                <option value="CREST003L1">Restroom K Elevator Floor L1</option>
                <option value="CREST004L1">Restroom H Elevator Floor L1</option>
                <option value="CRETL001L1">Vending Machine 1 L1</option>
                <option value="CSERV001L1">Volunteers Floor L1</option>
                <option value="CSERV001L2">Interpreter Services Floor L2</option>
                <option value="GELEV00QL1">Elevator Q MapNode 7 Floor L1</option>
                <option value="GEXIT001L1">Fenwood Road Exit MapNode 1 Floor L1</option>
                <option value="GHALL002L1">Hallway MapNode 2 Floor L1</option>
                <option value="GHALL003L1">Hallway MapNode 3 Floor L1</option>
                <option value="GHALL004L1">Hallway MapNode 4 Floor L1</option>
                <option value="GHALL005L1">Hallway MapNode 5 Floor L1</option>
                <option value="GHALL006L1">Hallway MapNode 6 Floor L1</option>
                <option value="GSTAI008L1">Stairs MapNode 8 Floor L1</option>
                <option value="WELEV00HL1">Elevator H Floor L1</option>
                <option value="WELEV00JL1">Elevator J Floor L1</option>
                <option value="WELEV00KL1">Elevator K Floor L1</option>
                <option value="WELEV00LL1">Elevator L Floor L1</option>
                <option value="WELEV00ML1">Elevator M Floor L1</option>
            </select>
            <h1></h1>
            <br/>
            <p className = "routeheader" > Below is the path to take to get to your destination starting from your current location: </p>
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
                <p>No route found...</p>
            )}
        </div>
    );
}
