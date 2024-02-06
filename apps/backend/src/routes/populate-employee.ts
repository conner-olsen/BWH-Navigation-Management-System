import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";
import { Prisma } from "database";
import path from "path";
import fs from "fs";
import {parseCSV} from "common/src/parser.ts";
import {edge, employee, node, user} from "common/interfaces/interfaces.ts";

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

export default router;
