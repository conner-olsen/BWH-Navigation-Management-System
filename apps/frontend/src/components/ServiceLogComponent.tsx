import React, { useState, useEffect } from 'react';
import {flowerServiceRequest} from "common/interfaces/interfaces.ts";

function GenerateTableRowsServices(tableData: flowerServiceRequest[]): JSX.Element[] {
    return tableData.map((item, index) => (
        <tr key={index}>
            <td>{tableData[index].senderName}</td>
            <td>{tableData[index].senderEmail}</td>
            <td>{tableData[index].roomLongName}</td>
            <td>{tableData[index].patientName}</td>
            <td>{tableData[index].flowerType}</td>
            <td>{tableData[index].deliveryDate}</td>
            <td>{tableData[index].note}</td>
        </tr>
    ));
}

const TableServices: React.FC<{ tableData: flowerServiceRequest[] }> = ({tableData}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Sender Name</th>
                <th>Sender Email</th>
                <th>Room Name</th>
                <th>Patient's Name</th>
                <th>Flower Type</th>
                <th>Delivery Date</th>
                <th>Note</th>
            </tr>
            </thead>
            <tbody>
            {GenerateTableRowsServices(tableData)}
            </tbody>
        </table>
    );
};


export const ServiceLogComponent = () => {
    const [data, setData] = useState<flowerServiceRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to the API endpoint
                const response = await fetch("/api/populate-flower-service-request");

                // Check if the request was successful (status code 2xx)
                if (!response.ok) {
                    throw new Error(`Please ensure that node data is populated ${response.status}`);
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
            <TableServices tableData={data}></TableServices>
        </div>
    );
};


