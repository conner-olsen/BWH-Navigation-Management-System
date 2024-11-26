import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
import { Prisma } from "database";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const employeeRequestAttempt: Prisma.EmployeeUncheckedCreateInput = req.body;

  try {
    // Create the FlowerServiceRequest with the connected room
    await PrismaClient.employee.create({ data: employeeRequestAttempt });

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error populating node data: ${error}`);
    res.sendStatus(500);
  }
});

router.get("/", async function (req: Request, res: Response) {
  try {
    const employeeRequest = await PrismaClient.employee.findMany();
    res.send(employeeRequest);
  } catch (error) {
    console.error(`Error exporting Service Request data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

export default router;
