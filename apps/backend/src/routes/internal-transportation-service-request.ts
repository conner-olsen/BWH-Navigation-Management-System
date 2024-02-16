import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";
const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const requestData = req.body;
  console.log(JSON.stringify(requestData));
  try {

    // Create the Service Request
    await PrismaClient.serviceRequest.create({ data: {
        node: {
          connect:{
            nodeId: requestData.nodeId
          }
        },
        status: requestData.status,
        employee: {
          connect: {
            username: requestData.employeeUser
          }
        },
        priority: requestData.priority,

        internalTransportServiceRequest: {
          create: {
            name: requestData.patientName,
            mode: requestData.mode,
            destination: requestData.destination
          }
        }
      } });

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error creating service request: ${error}`);
    res.sendStatus(500);
  }
});

export default router;
