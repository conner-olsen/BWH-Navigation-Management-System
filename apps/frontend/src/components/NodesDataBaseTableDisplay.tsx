import React, { useState, useEffect } from 'react';
import {node} from "common/interfaces/interfaces.ts";


function GenerateTableRowsNodes(tableData: node[]): JSX.Element[] {
    return tableData.map((item, index) => (
        <tr key={index}>
            <td>{tableData[index].nodeId}</td>
            <td>{tableData[index].xcoord}</td>
            <td>{tableData[index].ycoord}</td>
            <td>{tableData[index].floor}</td>
            <td>{tableData[index].building}</td>
            <td>{tableData[index].nodeType}</td>
            <td>{tableData[index].longName}</td>
            <td>{tableData[index].shortName}</td>
        </tr>
    ));
}

const TableNodes: React.FC<{ tableData: node[] }> = ({tableData}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Node ID</th>
                <th>X-Coordinate</th>
                <th>Y-Coordinate</th>
                <th>Floor</th>
                <th>Building</th>
                <th>Node Type</th>
                <th>Long Name</th>
                <th>Short Name</th>
            </tr>
            </thead>
            <tbody>
            {GenerateTableRowsNodes(tableData)}
            </tbody>
        </table>
    );
};


export const GetDataNodes = () => {
    const [data, setData] = useState<node[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to the API endpoint
                const response = await fetch("/api/node-populate");

                // Check if the request was successful (status code 2xx)
                if (!response.ok) {
                    throw new Error(`Please load node data ${response.status}`);
                }

                // Parse the JSON response
                const result = await response.json();

                // Set the data in the state
                setData(result);
            } catch (err) {
                // Handle errors
                console.log(err);
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

    return (
        <div>
            <TableNodes tableData={data}></TableNodes>
        </div>
    );
};

