import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";


const router: Router = express.Router();

interface employeeData {
  username: string,
  firstName: string,
  lastName: string,
  email: string,
}

function convertToCSV(data: employeeData[]): string {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map((node) => Object.values(node).join(','));
  return `${headers}\n${rows.join('\n')}`;
}

router.get("/", async function (req: Request, res: Response) {
  try{
    const employeeCSV = await PrismaClient.employee.findMany();
    const csvEdge: string = convertToCSV(employeeCSV);
    res.send(csvEdge);
  } catch (error){
    console.error(`Error exporting node data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

export default router;

