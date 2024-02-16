import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";
import {ServiceRequest} from "common/interfaces/interfaces.ts";
const router: Router = express.Router();


router.post("/:serviceType", async (req: Request, res: Response) => {

  let requestType;
  const { nodeId,employeeUser, status, priority,id, ...specificData } = req.body;

  try {

    switch(req.params.serviceType){
      case "internal-transportation":
        requestType = {internalTransportServiceRequest: {create: specificData}};
        break;
      case "external-transportation":
        requestType = {externalTransportServiceRequest: {create: specificData}};
        break;
      case "language":
        requestType = {languageInterpreterServiceRequest: {create: specificData}};
        break;
      case "cleaning":
        requestType = {cleaningServiceRequest: {create: specificData}};
        break;
      case "religious":
        requestType = {religiousServiceRequest: {create: specificData}};
        break;
      case "flower":
        requestType = {flowerServiceRequests: {create: specificData}};
        break;
      default:
        res.sendStatus(501);
    }

    // Create the Service Request
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await PrismaClient.serviceRequest.create({ data: {
        node: {
          connect:{
            nodeId: nodeId
          }
        },
        status: status,
        employee: {
          connect: {
            username: employeeUser
          }
        },
        priority: priority,
        ...requestType
      } });

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error creating service request: ${error}`);
    res.sendStatus(500);
  }
});

router.get("/:serviceType", async (req: Request, res: Response) => {

  let requestType;
  switch(req.params.serviceType){
    case "internal-transportation":
      requestType = PrismaClient.internalTransportServiceRequest.findMany({include: {ServiceRequest: true}});
      break;
    case "external-transportation":
      requestType = PrismaClient.externalTransportationServiceRequest.findMany({include: {ServiceRequest: true}});
      break;
    case "language":
      requestType = PrismaClient.languageInterpreterServiceRequest.findMany({include: {ServiceRequest: true}});
      break;
    case "cleaning":
      requestType = PrismaClient.cleaningServiceRequest.findMany({include: {ServiceRequest: true}});
      break;
    case "religious":
      requestType = PrismaClient.religiousServiceRequest.findMany({include: {ServiceRequest: true}});
      break;
    case "flower":
      requestType = PrismaClient.flowerServiceRequest.findMany({include: {ServiceRequest: true}});
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

router.patch("/", async (req: Request, res: Response) => {

  const srUpdate: ServiceRequest = req.body;


  try {
    res.send(srUpdate);
    const updatedRequest = await PrismaClient.serviceRequest.update({
      where: {id: srUpdate.id  },
      data: {
        status: srUpdate.status,
        employeeUser: srUpdate.employeeUser
      }
    });

    res.status(200).send(updatedRequest);
  } catch (error) {
    console.error(`Error updating ServiceRequest fields: ${error}`);
    res.sendStatus(500);
  }

});


export default router;
