import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";
import { Prisma } from "database";


const router: Router = express.Router();


router.post("/", async (req: Request, res: Response) => {

  const employeeRequestAttempt: Prisma.EmployeeUncheckedCreateInput = req.body;

  try {
    // Create the employee

    await PrismaClient.employee.create({data: employeeRequestAttempt});

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error populating employee data: ${error}`);
    res.sendStatus(500);
  }
});

router.get("/", async function (req: Request, res: Response) {
  try{
    const employee = await PrismaClient.employee.findMany();
    res.send(employee);
  } catch (error){
    console.error(`Error exporting employee data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

router.patch("/", async function (req: Request, res: Response) {
  try {
    const { username, ...employeeUpdateData } = req.body; // Destructure username and employee data
    const employee = await PrismaClient.employee.findUnique({
      where: { username },
    });

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    await PrismaClient.employee.update({
      where: { username },
      data: employeeUpdateData,
    });

    // Update user data associated with the employee
    await PrismaClient.user.update({
      where: { Username: username },
      data: {
        Username: username
      },
    });

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error updating employee and user data: ${error}`);
    res.sendStatus(500);
  }
});


export default router;
