import React, { useState, useEffect } from 'react';
import {cleaningServiceRequest} from 'common/interfaces/interfaces.ts';
import { employee } from 'common/interfaces/interfaces.ts';
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
// import {TabsContent, TabsList, TabsTrigger} from "./ui/tabs.tsx";
function GenerateTableRowsServices({tableData,employeeData,selectedStatus,selectedEmployeeUser,onUpdate}:{tableData: cleaningServiceRequest[], employeeData: employee[], selectedStatus: string, selectedEmployeeUser: string,onUpdate:(data:cleaningServiceRequest[])=>void}): JSX.Element[] {
    const [statusMap, setStatusMap] = useState<{ [key: number]: string }>({});
    const [employeeMap, setEmployeeMap] = useState<{ [key: number]: string }>({});
    const handleStatusChange = (index: number, value: string, tableData: cleaningServiceRequest[]) => {
        axios.patch("/api/service-request", {
            id: tableData[index].ServiceRequest.id,
            priority: tableData[index].ServiceRequest.priority,
            status:  value,
            employeeUser: employeeMap[index] || tableData[index].ServiceRequest.employeeUser,
            type: tableData[index].type,
            patientName: tableData[index].patientName,

        }).then(response => console.log(response.data))
            .catch(error => console.error(error));
        setStatusMap({ ...statusMap, [index]: value });
        const updatedTableData = [...tableData];
        updatedTableData[index].ServiceRequest.status = value;
        onUpdate(updatedTableData);
    };

    const handleAssignmentChange = (index: number, value: string, tableData: cleaningServiceRequest[]) => {
        axios.patch("/api/service-request", {
            id: tableData[index].ServiceRequest.id,
            priority: tableData[index].ServiceRequest.priority,
            status:   statusMap[index] || tableData[index].ServiceRequest.status,
            employeeUser: value,
            type: tableData[index].type,
            patientName: tableData[index].patientName,

        }).then(response => console.log(response.data))
            .catch(error => console.error(error));
        setEmployeeMap({ ...employeeMap, [index]: value });

        const updatedTableData = [...tableData];
        updatedTableData[index].ServiceRequest.employeeUser = value;
        onUpdate(updatedTableData);
    };

    return tableData
        .filter(item => (selectedStatus === "" || item.ServiceRequest.status === selectedStatus) &&
            (selectedEmployeeUser === "" || item.ServiceRequest.employeeUser === selectedEmployeeUser))
        .map((item, index) => (
            <TableRow key={index}>
                <TableCell>{item.ServiceRequest.nodeId}</TableCell>
                <TableCell>{item.ServiceRequest.priority}</TableCell>
                <TableCell>{item.patientName}</TableCell> {/* Access patientName directly */}
                <TableCell>{item.type}</TableCell> {/* Access type directly */}
                <TableCell>
                    <Select value={item.ServiceRequest.status} onValueChange={(status) => handleStatusChange(index, status, tableData)}>
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
                    <Select  value={item.ServiceRequest.employeeUser} onValueChange={(user) => handleAssignmentChange(index, user, tableData)}>
                        <SelectTrigger>
                            <SelectValue placeholder="None" />
                        </SelectTrigger>
                        <SelectContent>
                            {employeeData.map((employee, employeeIndex) => (
                                <SelectItem key={employeeIndex} value={employee.username}>
                                    {employee.username}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </TableCell>
            </TableRow>

        ));
}

const TableServices: React.FC<{ tableData: cleaningServiceRequest[]; employeeData: employee[]; selectedStatus: string; selectedEmployeeUser: string;onUpdate:(data:cleaningServiceRequest[])=>void}> = ({tableData, employeeData, selectedStatus, selectedEmployeeUser,onUpdate}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Room ID</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignment</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <GenerateTableRowsServices tableData={tableData} employeeData={employeeData} selectedStatus={selectedStatus} selectedEmployeeUser={selectedEmployeeUser} onUpdate={onUpdate}></GenerateTableRowsServices>
            </TableBody>
        </Table>
    );
};

// GETTING data for service request and
export const CleaningServiceLogComponent = () => {
    const [data, setData] = useState<cleaningServiceRequest[]>([]);
    const [employeeData, setEmployeeData] = useState<employee[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [selectedEmployeeUser, setSelectedEmployeeUser] = useState<string>("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to the API endpoint for flower service requests
                const response = await fetch('/api/service-request/cleaning');
                if (!response.ok) {
                    throw new Error(`Failed to fetch cleaning service requests: ${response.status}`);
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
                    <Col>
                        <p>Filter by Employee:</p>
                        <Select onValueChange={(user) => setSelectedEmployeeUser(user)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Employee" />
                            </SelectTrigger>
                            <SelectContent>
                                {employeeData.map((employee, employeeIndex) => (
                                    <SelectItem key={employeeIndex} value={employee.username}>
                                        {employee.username}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Col>
                </Row>
            </Container>

            <br/>

            <TableServices tableData={data} employeeData={employeeData} selectedStatus={selectedStatus} selectedEmployeeUser={selectedEmployeeUser} onUpdate={(cleaningData) => {
                setData(cleaningData);
            }}/>

        </div>
    );
};
