import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";


const router: Router = express.Router();

router.get("/:serviceType", async function (req: Request, res: Response) {

  let requestType;

  switch(req.params.serviceType){
    case "all":
      requestType = PrismaClient.serviceRequest.count();
      break;
    case "internal-transportation":
      requestType = PrismaClient.internalTransportServiceRequest.count();
      break;
    case "external-transportation":
      requestType = PrismaClient.externalTransportationServiceRequest.count();
      break;
    case "language":
      requestType = PrismaClient.languageInterpreterServiceRequest.count();
      break;
    case "cleaning":
      requestType = PrismaClient.cleaningServiceRequest.count();
      break;
    case "religious":
      requestType = PrismaClient.religiousServiceRequest.count();
      break;
    case "flower":
      requestType = PrismaClient.flowerServiceRequest.count();
      break;
    default:
      res.sendStatus(501);
  }

  try{
    if(requestType){
      const internalCSV = await requestType;

      res.status(200).send(internalCSV);
    }
  }
  catch (error){
    console.error(`Error exporting Service Request data: ${error}`);
    res.sendStatus(500);
  }
});

export default router;
