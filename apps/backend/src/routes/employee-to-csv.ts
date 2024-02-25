import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
import { parseCSV } from "common/src/parser.ts";
import { employee } from "common/src/interfaces/interfaces.ts";


const router: Router = express.Router();



function convertToCSV(data: employee[]): string {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map((node) => Object.values(node).join(','));
  return `${headers}\n${rows.join('\n')}`;
}
router.post("/", async function(req: Request, res: Response) {
  try {
    // Get the JSON body from the JSON object
    const employeeCSVData = req.body["csvString"];
    const parsedCSVData = parseCSV(employeeCSVData);

    const transformedEmp: employee[] = parsedCSVData.map((row) => {
      const rowval = Object.values(row);
      return {
        username: rowval[0],
        firstName: rowval[1],
        lastName: rowval[2],
        email: rowval[3],
      };
    });


    // Create records in 'user' table
    await PrismaClient.user.createMany({
      data: transformedEmp.map((self) => {
        return {
          Username: self.username,
        };
      })
    });

    // Create records in 'employee' table
    await PrismaClient.employee.createMany({
      data: transformedEmp.map((self) => {
        return {
          username: self.username,
          firstName: self.firstName,
          lastName: self.lastName,
          email: self.email,
        };
      })
    });

    // Send success response
    res.sendStatus(200);
  } catch (error) {
    console.error(`Error storing data: ${error}`);
    // Send error response
    res.sendStatus(500);
  }
});

router.get("/", async function(req: Request, res: Response) {
  try {
    const employeeCSV = await PrismaClient.employee.findMany();
    const csvEdge: string = convertToCSV(employeeCSV);
    res.send(csvEdge);
  } catch (error) {
    console.error(`Error exporting node data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

export default router;
