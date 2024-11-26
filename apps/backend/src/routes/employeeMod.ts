import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, ...employeeUpdateData } = req.body;

  try {
    // Create the employee
    await PrismaClient.user.create({
      data: {
        Username: username,
      },
    });

    const employeeData = {
      username: username,
      ...employeeUpdateData,
    };

    await PrismaClient.employee.create({ data: employeeData });

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error populating employee data: ${error}`);
    res.sendStatus(500);
  }
});

router.get("/", async function (req: Request, res: Response) {
  try {
    const employee = await PrismaClient.employee.findMany();
    res.send(employee);
  } catch (error) {
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
    // Update user data associated with the employee
    await PrismaClient.user.update({
      where: { Username: username },
      data: {
        Username: username,
      },
    });

    await PrismaClient.employee.update({
      where: { username },
      data: employeeUpdateData,
    });

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error updating employee and user data: ${error}`);
    res.sendStatus(500);
  }
});
router.delete("/", async function (req: Request, res: Response) {
  try {
    const { username } = req.body; // Destructure username and employee data
    const employee = await PrismaClient.employee.findUnique({
      where: { username },
    });

    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    // delete user data associated with the employee
    await PrismaClient.employee.delete({
      where: { username },
    });

    await PrismaClient.user.delete({
      where: { Username: username },
    });

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error deleting employee and user data: ${error}`);
    res.sendStatus(500);
  }
});

export default router;
