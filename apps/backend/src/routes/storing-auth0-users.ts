import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";
import { Prisma } from "database";



const router: Router = express.Router();

interface employee {
  username: string,
  firstName: string,
  lastName: string,
  email: string,
}

router.post("/", async (req: Request, res: Response) => {

  const employeeRequestAttempt: Prisma.EmployeeCreateInput = req.body;

  try {

    await PrismaClient.employee.create({data: employeeRequestAttempt});

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error populating employee data: ${error}`);
    res.sendStatus(500);
  }
});

export default router;
