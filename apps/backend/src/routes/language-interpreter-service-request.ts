import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";
import {Prisma} from "database";
import ServiceRequestUncheckedCreateInput = Prisma.ServiceRequestUncheckedCreateInput;


const router: Router = express.Router();


router.post("/", async (req: Request, res: Response) => {

  const languageRequestAttempt: Prisma.languageInterpreterServiceRequestUncheckedCreateInput = req.body;

  const srAttempt: Prisma.ServiceRequestUncheckedCreateInput = req.body as ServiceRequestUncheckedCreateInput;

  console.log(JSON.stringify(srAttempt));

  try {

    // Create the Service Request
    const createdServiceRequest = await PrismaClient.serviceRequest.create({ data: srAttempt });

    // Use the created Service Request's id to set the nodeId in other service request
    languageRequestAttempt.id = createdServiceRequest.id;

    await PrismaClient.languageInterpreterServiceRequest.create({data: languageRequestAttempt});

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error populating node data: ${error}`);
    res.sendStatus(500);
  }
});

router.get("/", async function (req: Request, res: Response) {
  try{
    const languageCSV = await PrismaClient.languageInterpreterServiceRequest.findMany();
    res.send(languageCSV);
  } catch (error){
    console.error(`Error exporting Service Request data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});



export default router;
