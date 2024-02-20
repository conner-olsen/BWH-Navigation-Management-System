import React, {useEffect, useState} from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import {Node} from "common/src/graph-structure.ts";
import {
    ServiceRequest
} from "../../../../packages/common/interfaces/interfaces.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./ui/table.tsx";
import {Container} from "react-bootstrap";


function processServiceRequest(serviceRequest: ServiceRequest) {
    // Check if it includes a flower service request
    if (serviceRequest.flowerServiceRequests) {
        // Process the flower service request
        return("flowerServiceRequest");
    }

    // Check if it includes a cleaning service request
    if (serviceRequest.cleaningServiceRequest) {
        // Process the cleaning service request
        return("cleaningServiceRequest");
    }

    // Check if it includes an external transportation service request
    if (serviceRequest.externalTransportationServiceRequest) {
        // Process the external transportation service request
        return("externalTransportationServiceRequest");
    }

    // Check if it includes an internal transport service request
    if (serviceRequest.internalTransportServiceRequest) {
        // Process the internal transport service request
        return("internalTransportServiceRequest");
    }

    // Check if it includes a language interpreter service request
    if (serviceRequest.languageInterpreterServiceRequest) {
        // Process the language interpreter service request
        return("languageInterpreterServiceRequest");
    }

    // Check if it includes a religious service request
    if (serviceRequest.religiousServiceRequest) {
        // Process the religious service request
        return("religiousServiceRequest");
    }
    else{

        return("");
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


