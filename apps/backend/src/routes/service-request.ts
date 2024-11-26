import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
import { ServiceRequest } from "common/src/interfaces/interfaces.ts";
const router: Router = express.Router();

router.post("/:serviceType", async (req: Request, res: Response) => {
  let requestType;
  //DO NOT REMOVE THE ID IN THE BELOW LINE IT WILL BREAK EVERYTHING, IT'S A FAKE ERROR
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { nodeId, employeeUser, status, priority, id, ...specificData } =
    req.body;

  try {
    switch (req.params.serviceType) {
      case "internal-transportation":
        requestType = {
          internalTransportServiceRequest: { create: specificData },
        };
        break;
      case "external-transportation":
        requestType = {
          externalTransportationServiceRequest: { create: specificData },
        };
        break;
      case "language":
        requestType = {
          languageInterpreterServiceRequest: { create: specificData },
        };
        break;
      case "cleaning":
        requestType = { cleaningServiceRequest: { create: specificData } };
        break;
      case "religious":
        requestType = { religiousServiceRequest: { create: specificData } };
        break;
      case "flower":
        requestType = { flowerServiceRequests: { create: specificData } };
        break;
      default:
        return res.sendStatus(501); // Ensure function exits after sending response in default case
    }

    await PrismaClient.serviceRequest.create({
      data: {
        node: {
          connect: {
            nodeId: nodeId,
          },
        },
        status: status,
        employee: {
          connect: {
            username: employeeUser,
          },
        },
        priority: priority,
        ...requestType,
      },
    });

    return res.sendStatus(200); // Exit function after sending response
  } catch (error) {
    console.error(`Error creating service request: ${error}`);
    return res.sendStatus(500); // Ensure function exits after sending response on error
  }
});

router.get("/:serviceType", async (req: Request, res: Response) => {
  let requestType;
  switch (req.params.serviceType) {
    case "internal-transportation":
      requestType = PrismaClient.internalTransportServiceRequest.findMany({
        include: { ServiceRequest: true },
      });
      break;
    case "external-transportation":
      requestType = PrismaClient.externalTransportationServiceRequest.findMany({
        include: { ServiceRequest: true },
      });
      break;
    case "language":
      requestType = PrismaClient.languageInterpreterServiceRequest.findMany({
        include: { ServiceRequest: true },
      });
      break;
    case "cleaning":
      requestType = PrismaClient.cleaningServiceRequest.findMany({
        include: { ServiceRequest: true },
      });
      break;
    case "religious":
      requestType = PrismaClient.religiousServiceRequest.findMany({
        include: { ServiceRequest: true },
      });
      break;
    case "flower":
      requestType = PrismaClient.flowerServiceRequest.findMany({
        include: { ServiceRequest: true },
      });
      break;
    case "all":
      requestType = PrismaClient.serviceRequest.findMany();
      break;
    default:
      return res.sendStatus(501); // Ensure function exits after sending response in default case
  }

  try {
    if (requestType) {
      const internalCSV = await requestType;

      return res.status(200).send(internalCSV); // Exit function after sending response
    }
  } catch (error) {
    console.error(`Error exporting Service Request data: ${error}`);
    return res.sendStatus(500); // Ensure function exits after sending response on error
  }
});

router.patch("/", async (req: Request, res: Response) => {
  const srUpdate: ServiceRequest = req.body;

  try {
    const updatedRequest = await PrismaClient.serviceRequest.update({
      where: { id: srUpdate.id },
      data: {
        status: srUpdate.status,
        employeeUser: srUpdate.employeeUser,
      },
    });

    return res.status(200).send(updatedRequest); // Exit function after sending response
  } catch (error) {
    console.error(`Error updating ServiceRequest fields: ${error}`);
    return res.sendStatus(500); // Ensure function exits after sending response on error
  }
});

export default router;
