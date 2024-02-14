import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";
const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const requestData = req.body;

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

        cleaningServiceRequest: {
          create: {
            type: requestData.type,
            patientName: requestData.patientName
          }
        }
      } });

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error creating service request: ${error}`);
    res.sendStatus(500);
  }
});



router.get("/", async function (req: Request, res: Response) {
  try{
    const internalCSV = await PrismaClient.cleaningServiceRequest.findMany();
    res.send(internalCSV);
  } catch (error){
    console.error(`Error exporting Service Request data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

export default router;
