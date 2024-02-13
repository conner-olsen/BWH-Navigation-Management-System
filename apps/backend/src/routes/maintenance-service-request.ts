import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";
import {Prisma} from "database";
import ServiceRequestUncheckedCreateInput = Prisma.ServiceRequestUncheckedCreateInput;

const router: Router = express.Router();


router.post("/", async (req: Request, res: Response) => {

  const maintenanceRequestAttempt: Prisma.maintenanceServiceRequestUncheckedCreateInput = req.body;

  const srAttempt: Prisma.ServiceRequestUncheckedCreateInput = req.body as ServiceRequestUncheckedCreateInput;

  console.log(JSON.stringify(srAttempt));

  try {

    // Create the Service Request
    const createdServiceRequest = await PrismaClient.serviceRequest.create({ data: srAttempt });

    // Use the created Service Request's id to set the nodeId in flowerRequestAttempt
    maintenanceRequestAttempt.id = createdServiceRequest.id;

    await PrismaClient.maintenanceServiceRequest.create({data: maintenanceRequestAttempt});

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error populating node data: ${error}`);
    res.sendStatus(500);
  }
});

router.get("/", async function (req: Request, res: Response) {
  try{
    const maintenanceServiceRequestCSV = await PrismaClient.maintenanceServiceRequest.findMany();
    res.send(maintenanceServiceRequestCSV);
  } catch (error){
    console.error(`Error exporting Service Request data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});



export default router;
