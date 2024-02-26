import React, { useState, useEffect } from 'react';
import { religiousServiceRequest } from 'common/src/interfaces/interfaces.ts';
import { employee } from 'common/src/interfaces/interfaces.ts';
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select.tsx";
// import {TabsContent, TabsList, TabsTrigger} from "./ui/tabs.tsx";
function GenerateTableRowsServices({ tableData, employeeData, selectedStatus, selectedEmployeeUser, onUpdate }: { tableData: religiousServiceRequest[], employeeData: employee[], selectedStatus: string, selectedEmployeeUser: string, onUpdate: (data: religiousServiceRequest[]) => void }): JSX.Element[] {
  const [statusMap, setStatusMap] = useState<{ [key: number]: string }>({});
  const [employeeMap, setEmployeeMap] = useState<{ [key: number]: string }>({});;


  const handleStatusChange = (index: number, value: string, tableData: religiousServiceRequest[]) => {
    axios.patch("/api/service-request", {
      id: tableData[index].ServiceRequest.id,
      nodeId: tableData[index].ServiceRequest.nodeId,
      priority: tableData[index].ServiceRequest.priority,
      status: value,
      employeeUser: employeeMap[index] || tableData[index].ServiceRequest.employeeUser

    }).then(response => console.log(response.data))
      .catch(error => console.error(error));
    setStatusMap({ ...statusMap, [index]: value });
    const updatedTableData = [...tableData];
    updatedTableData[index].ServiceRequest.status = value;
    onUpdate(updatedTableData);
  };

  const handleAssignmentChange = (index: number, value: string, tableData: religiousServiceRequest[]) => {
    axios.patch("/api/service-request", {
      id: tableData[index].ServiceRequest.id,
      nodeId: tableData[index].ServiceRequest.nodeId,
      priority: tableData[index].ServiceRequest.priority,
      status: statusMap[index] || tableData[index].ServiceRequest.status,
      employeeUser: value,

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
        <TableCell>{item.patientName}</TableCell>
        <TableCell>{item.religion}</TableCell>
        <TableCell>{item.note}</TableCell>


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
          <Select value={item.ServiceRequest.employeeUser} onValueChange={(user) => handleAssignmentChange(index, user, tableData)}>
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

const TableServices: React.FC<{ tableData: religiousServiceRequest[]; employeeData: employee[]; selectedStatus: string; selectedEmployeeUser: string; onUpdate: (data: religiousServiceRequest[]) => void }> = ({ tableData, employeeData, selectedStatus, selectedEmployeeUser, onUpdate }) => {
  return (
    <div className={"overflow-y-auto h-80"}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room ID</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Religion</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assignment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <GenerateTableRowsServices tableData={tableData} employeeData={employeeData} selectedStatus={selectedStatus} selectedEmployeeUser={selectedEmployeeUser} onUpdate={onUpdate}></GenerateTableRowsServices>
        </TableBody>
      </Table>
    </div>
  );
};

// GETTING data for service request and
export const ReligiousServiceLogComponent = () => {
  const [data, setData] = useState<religiousServiceRequest[]>([]);
  const [employeeData, setEmployeeData] = useState<employee[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedEmployeeUser, setSelectedEmployeeUser] = useState<string>("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint for flower service requests
        const response = await fetch('/api/service-request/religious');
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
        <Container className="mx-auto bg-background border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">
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

        <Container className="mx-auto bg-background border-2 border-blue-600 dark:border-blue-400 rounded-lg px-8 pt-6 pb-8 mb-4">

        <TableServices tableData={data} employeeData={employeeData} selectedStatus={selectedStatus} selectedEmployeeUser={selectedEmployeeUser} onUpdate={(cleaningData) => {
        setData(cleaningData);
      }} />
        </Container>
    </div>
  );
};
