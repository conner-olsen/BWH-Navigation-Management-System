import React, { useState, useEffect } from "react";
import { employee } from "common/src/interfaces/interfaces.ts";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "./ui/table.tsx";

function GenerateTableRowsEmployee(tableData: employee[]): JSX.Element[] {
  return tableData.map((item, index) => (
    <TableRow key={index}>
      <TableCell>{tableData[index].username}</TableCell>
      <TableCell>{tableData[index].firstName}</TableCell>
      <TableCell>{tableData[index].lastName}</TableCell>
      <TableCell>{tableData[index].email}</TableCell>
    </TableRow>
  ));
}

const TableEmployee: React.FC<{ tableData: employee[] }> = ({ tableData }) => {
  return (
    <div className={"overflow-y-auto h-96 mt-4"}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{GenerateTableRowsEmployee(tableData)}</TableBody>
      </Table>
    </div>
  );
};

export const GetDataEmployees = () => {
  const [data, setData] = useState<employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await fetch("/api/employee-mod");

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
      <TableEmployee tableData={data}></TableEmployee>
    </div>
  );
};
