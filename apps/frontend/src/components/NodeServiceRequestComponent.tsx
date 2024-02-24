import React, {useEffect, useState} from "react";
import axios, { AxiosResponse } from "axios";
import {Node} from "common/src/graph-structure.ts";
import {
    ServiceRequest
} from "common/interfaces/interfaces.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./ui/table.tsx";
import {Container} from "react-bootstrap";


function processServiceRequest(serviceRequest: ServiceRequest) {
    // Check if it includes a flower service request
    if (serviceRequest.flowerServiceRequests) {
        // Process the flower service request
        return("Flower Service Request");
    }

    // Check if it includes a cleaning service request
    if (serviceRequest.cleaningServiceRequest) {
        // Process the cleaning service request
        return("Cleaning Service Request");
    }

    // Check if it includes an external transportation service request
    if (serviceRequest.externalTransportationServiceRequest) {
        // Process the external transportation service request
        return("External Transportation Service Request");
    }

    // Check if it includes an internal transport service request
    if (serviceRequest.internalTransportServiceRequest) {
        // Process the internal transport service request
        return("Internal Transport Service Request");
    }

    // Check if it includes a language interpreter service request
    if (serviceRequest.languageInterpreterServiceRequest) {
        // Process the language interpreter service request
        return("Language Interpreter Service Request");
    }

    // Check if it includes a religious service request
    if (serviceRequest.religiousServiceRequest) {
        // Process the religious service request
        return("Religious Service Request");
    }
    else{
        return("error");
    }
}

function GenerateTableRowsServices(tableData: ServiceRequest[]): JSX.Element[] {
    return tableData
        .map((item, index) => (
            <TableRow key={index}>
                <TableCell>{item.priority}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.employeeUser}</TableCell>
                <TableCell>{processServiceRequest(item)}</TableCell>
            </TableRow>

        ));
}
const TableServices: React.FC<{ tableData: ServiceRequest[]}> = ({tableData}) => {
    return (
        <div className={"overflow-y-auto h-80"}>
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
        </div>
    );
};
export function NodeServiceRequestComponent(node: Node | null): JSX.Element {

    const initialServiceArray: ServiceRequest[] = [];
    const [serviceArray, setServiceArray] = useState<ServiceRequest[]>(initialServiceArray);

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
                console.error("error getting Service Request data", (error));
            }
        };

        fetchData().then();
    }, [node]);

    if (!node) {
        return <div></div>;
    }

    return(
        <div>
            <Container>
                <TableServices tableData={serviceArray}/>
            </Container>
        </div>
    );

}


