import React, { useState, useEffect } from 'react';
import {edge} from "common/interfaces/interfaces.ts";

function GenerateTableRowsEdges(tableData: edge[]): JSX.Element[] {
    return tableData.map((item, index) => (
        <tr key={index}>
            <td>{tableData[index].edgeID}</td>
            <td>{tableData[index].startNodeID}</td>
            <td>{tableData[index].endNodeID}</td>
        </tr>
    ));
}

const TableEdges: React.FC<{ tableData: edge[] }> = ({tableData}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Edge ID</th>
                <th>Start Node ID</th>
                <th>End Node ID</th>
            </tr>
            </thead>
            <tbody>
            {GenerateTableRowsEdges(tableData)}
            </tbody>
        </table>
    );
};


export const GetDataEdges = () => {
    const [data, setData] = useState<edge[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to the API endpoint
                const response = await fetch("/api/edge-populate");

                // Check if the request was successful (status code 2xx)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the JSON response
                const result = await response.json();

                // Set the data in the state
                setData(result);
            } catch (err) {
                // Handle errors
                setError(err.message);
            } finally {
                // Set loading to false, indicating that the request has completed
                setLoading(false);
            }
        };

        fetchData().then();
    }, []); //

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <TableEdges tableData={data}></TableEdges>
        </div>
    );
};

