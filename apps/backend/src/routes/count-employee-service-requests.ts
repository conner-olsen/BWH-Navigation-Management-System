import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();


router.get("/", async function (req: Request, res: Response) {
  try {
    const employees = await PrismaClient.employee.findMany({
      include: {
        serviceRequests: true,
      },
    });

    const employeeServiceRequestCounts = employees.map(employee => ({
      username: employee.username,
      serviceRequestCount: employee.serviceRequests.length,
    }));

    res.status(200).send(employeeServiceRequestCounts);

  } catch (error) {
    console.error(`Error exporting employee data: ${error}`);
    res.sendStatus(500);
  }
});


// getEmployeeServiceRequestCounts()
//   .then(employeeServiceRequestCounts => console.log(employeeServiceRequestCounts))
//   .catch(error => console.error(error))
//   .finally(() => PrismaClient.$disconnect());
//
//

export default router;
