import React, { useState, useEffect } from 'react';
import { flowerServiceRequest } from 'common/interfaces/interfaces.ts';
import { employee } from 'common/interfaces/interfaces.ts';
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
function GenerateTableRowsServicesFlower(tableData: flowerServiceRequest[], employeeData: employee[], selectedStatus: string): JSX.Element[] {


    const handleStatusChange = (index: number, value: string, tableData: flowerServiceRequest[]) => {
        axios.patch("/api/service-request", {
            id:  tableData[index].ServiceRequest.id,
            senderName: tableData[index].senderName,
            senderEmail: tableData[index].senderEmail,
            roomLongName: tableData[index].ServiceRequest.nodeId,
            flowerType: tableData[index].flowerType,
            deliveryDate: tableData[index].deliveryDate,
            note: tableData[index].note,
            status: value,
            employeeUser: tableData[index].ServiceRequest.employeeUser

        }).then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    const handleAssignmentChange = (index: number, value: string, tableData: flowerServiceRequest[]) => {
        axios.patch("/api/service-request", {
            id:  tableData[index].ServiceRequest.id,
            senderName: tableData[index].senderName,
            senderEmail: tableData[index].senderEmail,
            roomLongName: tableData[index].ServiceRequest.nodeId,
            flowerType: tableData[index].flowerType,
            deliveryDate: tableData[index].deliveryDate,
            note: tableData[index].note,
            status: tableData[index].ServiceRequest.status,
            employeeUser: value

        }).then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return tableData
        .filter(item => selectedStatus === "" || item.ServiceRequest.status === selectedStatus)
        .map((item, index) => (
            <TableRow key={index}>
                <TableCell>{item.ServiceRequest.status}</TableCell>
                <TableCell>{item.ServiceRequest.nodeId}</TableCell>
                <TableCell>{item.ServiceRequest.priority}</TableCell>
                <TableCell>{item.senderName}</TableCell>
                <TableCell>{item.senderEmail}</TableCell>
                <TableCell>{item.patientName}</TableCell>
                <TableCell>{item.flowerType}</TableCell>
                <TableCell>{item.deliveryDate}</TableCell>
                <TableCell>{item.note}</TableCell>


                <TableCell>
                    <Select value={item.ServiceRequest.status}
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
                    <Select value={item.ServiceRequest.employeeUser}
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

const TableServicesFlower: React.FC<{ tableData: flowerServiceRequest[]; employeeData: employee[]; selectedStatus: string }> = ({tableData, employeeData, selectedStatus}) => {
    return (
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>debug</TableHead>

                <TableHead>Room ID</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Sender Name</TableHead>
                <TableHead>Sender Email</TableHead>
                <TableHead>Patient's Name</TableHead>
                <TableHead>Flower Type</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignment</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>{GenerateTableRowsServicesFlower(tableData, employeeData, selectedStatus)}</TableBody>
        </Table>
    );
};

// GETTING data for service request and
export const FlowerServiceLogComponent = () => {
    const [data, setData] = useState<flowerServiceRequest[]>([]);
    const [employeeData, setEmployeeData] = useState<employee[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to the API endpoint for flower service requests
                const response = await fetch('/api/service-request/flower');
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
                                    {/*<SelectItem value="">Any</SelectItem>*/}
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

                <TableServicesFlower tableData={data} employeeData={employeeData} selectedStatus={selectedStatus}/>

        </div>
    );
};
