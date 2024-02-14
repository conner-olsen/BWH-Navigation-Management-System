import React, { useState, useEffect } from 'react';
import { externalTransportationServiceRequest } from 'common/interfaces/interfaces.ts';
import { employee } from 'common/interfaces/interfaces.ts';
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./ui/table.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select.tsx";
function GenerateTableRowsServices(tableData: externalTransportationServiceRequest[], employeeData: employee[], selectedStatus: string): JSX.Element[] {


    const handleStatusChange = (index: number, value: string, tableData: externalTransportationServiceRequest[]) => {
        axios.patch("/api/", {
            nodeId: tableData[index].node,
            priority: tableData[index].priority,
            name:  tableData[index].name,
            date: tableData[index].date,
            destination: tableData[index].destination,
            description: tableData[index].description,
            status: value,
            employeeUser: tableData[index].employeeUser

        }).then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    const handleAssignmentChange = (index: number, value: string, tableData: externalTransportationServiceRequest[]) => {
        axios.patch("/api/", {
            nodeId: tableData[index].nodeId,
            priority: tableData[index].priority,
            name:  tableData[index].name,
            date: tableData[index].date,
            transportation: tableData[index].transportation,
            destination: tableData[index].destination,
            description: tableData[index].description,
            status: tableData[index].status,
            employeeUser: value,

        }).then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return tableData
        .filter(item => selectedStatus === "" || item.status === selectedStatus)
        .map((item, index) => (
            <TableRow key={index}>
                <TableCell>{tableData[index].nodeId}</TableCell>
                <TableCell>{tableData[index].name}</TableCell>
                <TableCell>{tableData[index].priority}</TableCell>
                <TableCell>{tableData[index].transportation}</TableCell>
                <TableCell>{tableData[index].destination}</TableCell>
                <TableCell>{tableData[index].description}</TableCell>
                <TableCell>{tableData[index].date}</TableCell>



                <TableCell>
                    <Select value={tableData[index].status}
                            onValueChange={(status) => handleStatusChange(index, status, tableData)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Unassigned" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Unassigned">Unassigned</SelectItem>
                            <SelectItem value="Assigned">Assigned</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>

                </TableCell>
                <TableCell>
                    <Select value={tableData[index].employeeUser}
                            onValueChange={(user) => handleAssignmentChange(index, user, tableData)}>
                        <SelectTrigger>
                            <SelectValue placeholder="None" />
                        </SelectTrigger>
                        <SelectContent>
                            {employeeData.map((employee, employeeIndex) => (
                                <SelectItem key={employeeIndex} value={employeeData[employeeIndex].username}>
                                    {employeeData[employeeIndex].username}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </TableCell>
            </TableRow>
        ));
}

const TableServices: React.FC<{ tableData: religiousServiceRequest[]; employeeData: employee[]; selectedStatus: string }> = ({tableData, employeeData, selectedStatus}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Room Location</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Transportation</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignment</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>{GenerateTableRowsServices(tableData, employeeData, selectedStatus)}</TableBody>
        </Table>
    );
};

// GETTING data for service request and
export const ExternalTransportServiceLogComponent = () => {
    const [data, setData] = useState<religiousServiceRequest[]>([]);
    const [employeeData, setEmployeeData] = useState<employee[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to the API endpoint for flower service requests
                const response = await fetch('/api/external-transport');
                if (!response.ok) {
                    throw new Error(`Failed to fetch religion service requests: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching flower service requests:', err);
            }
        };

        const fetchEmployeeData = async () => {
            try {
                // Make a GET request to the API endpoint for employees
                const response = await fetch('/api/populate-employee');
                if (!response.ok) {
                    throw new Error(`Failed to fetch employees: ${response.status}`);
                }
                const result = await response.json();
                setEmployeeData(result);
            } catch (err) {
                console.error('Error fetching employees:', err);
            }
        };

        fetchData().then();
        fetchEmployeeData().then();
    }, []); // Empty dependency array to run only once on mount

    return (
        <div>
            {/*<TabsContent value={"Flower Request"}>*/}
            <Container>
                <Row>
                    <Col>
                        <p>Filter by Status:</p>
                        <Select onValueChange={(stat) => setSelectedStatus(stat)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Unassigned">Unassigned</SelectItem>
                                <SelectItem value="Assigned">Assigned</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </Col>
                </Row>
            </Container>

            <br/>

            <TableServices tableData={data} employeeData={employeeData} selectedStatus={selectedStatus}/>

        </div>
    );
};
