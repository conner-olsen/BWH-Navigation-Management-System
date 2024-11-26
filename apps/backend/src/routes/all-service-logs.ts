import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  try {
    const serviceRequests = await PrismaClient.serviceRequest.findMany({
      include: {
        flowerServiceRequests: true,
        cleaningServiceRequest: true,
        languageInterpreterServiceRequest: true,
        religiousServiceRequest: true,
        internalTransportServiceRequest: true,
        externalTransportationServiceRequest: true,
      },
    });
    res.send(serviceRequests);
  } catch (error) {
    console.error(`Error exporting Service Request data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

export default router;
