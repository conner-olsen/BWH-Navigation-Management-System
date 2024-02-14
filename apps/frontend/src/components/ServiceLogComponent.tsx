import React, { useState, useEffect } from 'react';
import { flowerServiceRequest } from 'common/interfaces/interfaces.ts';
import { employee } from 'common/interfaces/interfaces.ts';
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./ui/table.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select.tsx";
function GenerateTableRowsServices(tableData: flowerServiceRequest[], employeeData: employee[], selectedStatus: string): JSX.Element[] {
    //const [status, setStatus] = useState("Assigned");


    const handleStatusChange = (index: number, value: string, tableData: flowerServiceRequest[]) => {
        axios.patch("/api/populate-flower-service-request", {
            id:  tableData[index].id,
            senderName: tableData[index].senderName,
            senderEmail: tableData[index].senderEmail,
            roomLongName: tableData[index].nodeId,
            flowerType: tableData[index].flowerType,
            deliveryDate: tableData[index].deliveryDate,
            note: tableData[index].note,
            status: value,
            employeeUser: tableData[index].employeeUser

        }).then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    const handleAssignmentChange = (index: number, value: string, tableData: flowerServiceRequest[]) => {
        axios.patch("/api/populate-flower-service-request", {
            id:  tableData[index].id,
            senderName: tableData[index].senderName,
            senderEmail: tableData[index].senderEmail,
            roomLongName: tableData[index].nodeId,
            flowerType: tableData[index].flowerType,
            deliveryDate: tableData[index].deliveryDate,
            note: tableData[index].note,
            status: tableData[index].status,
            employeeUser: value

        }).then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return tableData
        .filter(item => selectedStatus === "" || item.status === selectedStatus)
        .map((item, index) => (
            <TableRow key={index}>
                <TableCell>{tableData[index].senderName}</TableCell>
                <TableCell>{tableData[index].senderEmail}</TableCell>
                <TableCell>{tableData[index].nodeId}</TableCell>
                <TableCell>{tableData[index].patientName}</TableCell>
                <TableCell>{tableData[index].flowerType}</TableCell>
                <TableCell>{tableData[index].deliveryDate}</TableCell>
                <TableCell>{tableData[index].note}</TableCell>


                <TableCell>
                    <Select value={tableData[index].status}
                            onValueChange={(status) => handleStatusChange(index, status, tableData)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Unassigned">Assigned</SelectItem>
                            <SelectItem value="Assigned">Assigned</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                    {/*<select value={tableData[index].status}*/}
                    {/*        onChange={(e) => handleStatusChange(index, e.target.value, tableData)}>*/}
                    {/*    <option value="Assigned">Assigned</option>*/}
                    {/*    <option value="In Progress">In Progress</option>*/}
                    {/*    <option value="Completed">Completed</option>*/}
                    {/*</select>*/}
                </TableCell>
                <TableCell>
                    <Select value={tableData[index].employeeUser}
                            onValueChange={(user) => handleAssignmentChange(index, user, tableData)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {employeeData.map((employee, employeeIndex) => (
                                <SelectItem key={employeeIndex} value={employeeData[employeeIndex].username}>
                                    {employeeData[employeeIndex].username}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {/*<select*/}
                    {/*    value={tableData[index].employeeUser}*/}
                    {/*    onChange={(e) => handleAssignmentChange(index, e.target.value, tableData)}>*/}
                    {/*    {employeeData.map((employee, employeeIndex) => (*/}
                    {/*        <option key={employeeIndex} value={employeeData[employeeIndex].username}>*/}
                    {/*            {employeeData[employeeIndex].username}*/}
                    {/*        </option>*/}
                    {/*    ))}*/}
                    {/*</select>*/}
                </TableCell>
            </TableRow>
        ));
}

const TableServices: React.FC<{ tableData: flowerServiceRequest[]; employeeData: employee[]; selectedStatus: string }> = ({tableData, employeeData, selectedStatus}) => {
    return (
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Sender Name</TableHead>
                <TableHead>Sender Email</TableHead>
                <TableHead>Room ID</TableHead>
                <TableHead>Patient's Name</TableHead>
                <TableHead>Flower Type</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignment</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>{GenerateTableRowsServices(tableData, employeeData, selectedStatus)}</TableBody>
        </Table>
    );
};

// GETTING data for service request and
export const ServiceLogComponent = () => {
    const [data, setData] = useState<flowerServiceRequest[]>([]);
    const [employeeData, setEmployeeData] = useState<employee[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to the API endpoint for flower service requests
                const response = await fetch('/api/populate-flower-service-request');
                if (!response.ok) {
                    throw new Error(`Failed to fetch flower service requests: ${response.status}`);
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
            <Container>
                <Row>
                    <Col>
                        <p>Filter by Status:</p>
                        <Select onValueChange={(stat) => setSelectedStatus(stat)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Unassigned">Assigned</SelectItem>
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
