import React, {useEffect, useState} from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import {Node} from "common/src/graph-structure.ts";
import {
    ServiceRequest
} from "../../../../packages/common/interfaces/interfaces.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./ui/table.tsx";
import {Container} from "react-bootstrap";

function seperateSpecific(item: ServiceRequest): string{

    const { nodeId,employeeUser, status, priority,id, ...specificData } = item;

    console.log(specificData);
    return(JSON.stringify(specificData));
}

function GenerateTableRowsServices(tableData: ServiceRequest[]): JSX.Element[] {
    return tableData
        .map((item, index) => (
            <TableRow key={index}>
                <TableCell>{item.priority}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.employeeUser}</TableCell>
                <TableCell>{seperateSpecific(item)}</TableCell>
            </TableRow>

        ));
}
const TableServices: React.FC<{ tableData: ServiceRequest[]}> = ({tableData}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Type</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>{GenerateTableRowsServices(tableData)}</TableBody>
        </Table>
    );
};
export function NodeServiceRequestComponent(node: Node) {
    const [serviceArray, setServiceArray] = useState<ServiceRequest[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse<ServiceRequest[]> = await axios.patch("/api/node-populate", node, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                if (response.status === 200) {
                    setServiceArray(response.data);
                }
            } catch (error) {
                console.error("error getting Service Request data", (error as AxiosError).message);
                throw error;
            }
        };

        fetchData().then();
    }, [node]);


    return(
        <div>
            <Container>
                <TableServices tableData={(serviceArray as ServiceRequest[])}/>
            </Container>
        </div>
    );

};


