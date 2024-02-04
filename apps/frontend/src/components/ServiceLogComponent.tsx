import React, { useState, useEffect } from 'react';
import {flowerServiceRequest} from "common/interfaces/interfaces.ts";
import {employee} from "common/interfaces/interfaces.ts";

function GenerateTableRowsServices(tableData: flowerServiceRequest[], employeeData: employee[]): JSX.Element[] {

    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedAssignment, setSelectedAssignment] = useState("");

    const handleStatusChange = (value: string) => {
        setSelectedStatus(value);
    };

    const handleAssignmentChange = (index: number, value: string) => {
        tableData[index].employeeID = value;
    };

    return tableData.map((item, index) => (
        <tr key={index}>
            <td>{tableData[index].senderName}</td>
            <td>{tableData[index].senderEmail}</td>
            <td>{tableData[index].roomLongName}</td>
            <td>{tableData[index].patientName}</td>
            <td>{tableData[index].flowerType}</td>
            <td>{tableData[index].deliveryDate}</td>
            <td>{tableData[index].note}</td>
            <td>
                <select value={tableData[index].status} onChange={(e) => handleStatusChange(e.target.value)}>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </td>
            <td>
                    <select value={tableData[index].employeeID} onChange={(e) => handleAssignmentChange(index, e.target.value)}>
                        {/* Dynamically populate options from the employeeList */}
                        {employeeData.map((employee, employeeIndex) => (
                            <option key={employeeIndex} value={employeeData[employeeIndex].username}>
                                {employeeData[employeeIndex].username}
                            </option>
                        ))}
                    </select>
            </td>
        </tr>
    ));
}

const TableServices: React.FC<{ tableData: flowerServiceRequest[], employeeData: employee[] }> = ({tableData, employeeData}) => {
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
                <th>Status</th>
                <th>Assignment</th>
            </tr>
            </thead>
            <tbody>
            {GenerateTableRowsServices(tableData, employeeData)}
            </tbody>
        </table>
    );
};


export const ServiceLogComponent = () => {
    const [data, setData] = useState<flowerServiceRequest[]>([]);
    const [employeeData, setEmployeeData] = useState<employee[]>([]);


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
                console.log(err);
            }
        };

        fetchData().then();
    }, []);

    const fetchEmployeeData = async () => {
        try {
            // Make a GET request to the API endpoint
            const response = await fetch("/api/populate-employees");

            // Check if the request was successful (status code 2xx)
            if (!response.ok) {
                throw new Error(`Ensure that employee data is populated ${response.status}`);
            }

            // Parse the JSON response
            const result = await response.json();

            // Set the data in the state
            setData(result);
        } catch (err) {
            // Handle errors
            console.log(err);
        }
    };

    fetchEmployeeData().then();
}, []);

    return (
        <div>
            <TableServices tableData={data}></TableServices>
        </div>
    );
};


