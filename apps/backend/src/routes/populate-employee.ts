import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";
import { Prisma } from "database";
import path from "path";
import fs from "fs";
import {parseCSV} from "common/src/parser.ts";
import {employee, user} from "common/interfaces/interfaces.ts";
import client from "../bin/database-connection.ts";
// import path from "path";
// import fs from "fs";
// import {parseCSV} from "common/src/parser.ts";
// import {edge, employee, node, user} from "common/interfaces/interfaces.ts";

const router: Router = express.Router();


router.post("/", async (req: Request, res: Response) => {

  const employeeRequestAttempt: Prisma.EmployeeUncheckedCreateInput = req.body;

  try {
    // Create the FlowerServiceRequest with the connected room

    await PrismaClient.employee.create({data: employeeRequestAttempt});

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error populating employee data: ${error}`);
    res.sendStatus(500);
  }
});

router.get("/", async function (req: Request, res: Response) {
  try{
    const employeeCSV = await PrismaClient.employee.findMany();
    res.send(employeeCSV);
  } catch (error){
    console.error(`Error exporting employee data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

router.patch("/", async function (req: Request, res: Response) {
  try{
    const relativeNodePath = "../../testData/users.csv";
    const absoluteNodePath = path.join(__dirname, relativeNodePath);
    const csvFileNode = fs.readFileSync(absoluteNodePath, "utf-8");

    console.log(csvFileNode);
    // Parse the CSV string to an array of CSVRow objects
    const rowsNode = parseCSV(csvFileNode);
    const transformedNode:user[] = rowsNode.map((row) => {
      const rowval = Object.values(row);
      return {
        Username:rowval[0]
      };
    });

    await client.user.createMany({data:transformedNode.map((self) => {
        return {
          Username: self.Username
        };}
      )
    });


    const absolutePath = path.join(__dirname, "../../testData/employees.csv");
    const csvFile = fs.readFileSync(absolutePath, "utf-8");

    const rows = parseCSV(csvFile);
    const transformed:employee[] = rows.map((row) => {
      const rowval = Object.values(row);
      return {
        username: rowval[0],
        firstName: rowval[1],
        lastName: rowval[2],
        email: rowval[3]
      };
    });


    await client.employee.createMany({data:transformed.map((self) => {
        return {
          username: self.username,
          firstName: self.firstName,
          lastName: self.lastName,
          email: self.email
        };}
      )
    });
  } catch (error){
    console.error(`Error exporting employee data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

export default router;
