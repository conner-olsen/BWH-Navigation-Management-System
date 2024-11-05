import React, { useState, useEffect } from "react";
import { node } from "common/src/interfaces/interfaces.ts";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "./ui/table.tsx";

function GenerateTableRowsNodes(tableData: node[]): JSX.Element[] {
  return tableData.map((item, index) => (
    <TableRow key={index}>
      <TableCell>{tableData[index].nodeId}</TableCell>
      <TableCell>{tableData[index].xcoord}</TableCell>
      <TableCell>{tableData[index].ycoord}</TableCell>
      <TableCell>{tableData[index].floor}</TableCell>
      <TableCell>{tableData[index].building}</TableCell>
      <TableCell>{tableData[index].nodeType}</TableCell>
      <TableCell>{tableData[index].longName}</TableCell>
      <TableCell>{tableData[index].shortName}</TableCell>
    </TableRow>
  ));
}

const TableNodes: React.FC<{ tableData: node[] }> = ({ tableData }) => {
  return (
    <div className={"overflow-y-auto h-80"}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Node ID</TableHead>
            <TableHead>X-Coordinate</TableHead>
            <TableHead>Y-Coordinate</TableHead>
            <TableHead>Floor</TableHead>
            <TableHead>Building</TableHead>
            <TableHead>Node Type</TableHead>
            <TableHead>Long Name</TableHead>
            <TableHead>Short Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{GenerateTableRowsNodes(tableData)}</TableBody>
      </Table>
    </div>
  );
};

export const GetDataNodes = () => {
  const [data, setData] = useState<node[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await fetch("/api/node-populate");

        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
          throw new Error(`Please load node data ${response.status}`);
        }

        // Parse the JSON response
        const result = await response.json();

        // Set the data in the state
        setData(result);
      } catch (err) {
        // Handle errors
        console.log(err);
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

  return (
    <div>
      <TableNodes tableData={data}></TableNodes>
    </div>
  );
};
