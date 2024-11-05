import React, { useState, useEffect } from "react";
import { edge } from "common/src/interfaces/interfaces.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table.tsx";

function GenerateTableRowsEdges(tableData: edge[]): JSX.Element[] {
  return tableData.map((item, index) => (
    <TableRow key={index}>
      <TableCell>{tableData[index].edgeID}</TableCell>
      <TableCell>{tableData[index].startNodeID}</TableCell>
      <TableCell>{tableData[index].endNodeID}</TableCell>
    </TableRow>
  ));
}

const TableEdges: React.FC<{ tableData: edge[] }> = ({ tableData }) => {
  return (
    <div className={"overflow-y-auto h-80"}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Edge ID</TableHead>
            <TableHead>Start Node ID</TableHead>
            <TableHead>End Node ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{GenerateTableRowsEdges(tableData)}</TableBody>
      </Table>
    </div>
  );
};

export const GetDataEdges = () => {
  const [data, setData] = useState<edge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await fetch("/api/edge-populate");

        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
          throw new Error(
            `Please load edge data and ensure that node data is already populated ${response.status}`,
          );
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
      <TableEdges tableData={data}></TableEdges>
    </div>
  );
};
