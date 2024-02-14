import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";
import {ServiceRequest} from "common/interfaces/interfaces.ts";
import { FlowerServiceRequest } from "database";
const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const requestData = req.body;

  try {
    const employee = await PrismaClient.employee.findUnique({
      where: { username: requestData.employeeUser }
    });

    if (!employee) {
      console.error(`Error: Employee with username ${requestData.employeeUser} not found`);
      res.sendStatus(400);
      return;
    }

    const serviceRequestData: ServiceRequest = {
      id: '',
      nodeId: requestData.nodeId,
      status: requestData.status,
      employeeUser: requestData.employeeUser,
      priority: requestData.priority,
    };

    const flowerServiceRequestData: FlowerServiceRequest = {
      id: '',
      senderName: requestData.senderName,
      senderEmail: requestData.senderEmail,
      patientName: requestData.patientName,
      flowerType: requestData.flowerType,
      deliveryDate: requestData.deliveryDate,
      note: requestData.note
    };

    // Create the Service Request
    const createdServiceRequest = await PrismaClient.serviceRequest.create({ data: serviceRequestData });

    // Use the created Service Request's id to set the nodeId in flowerRequestAttempt
    flowerServiceRequestData.id = createdServiceRequest.id;

    await PrismaClient.flowerServiceRequest.create({ data: flowerServiceRequestData });

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error creating service request: ${error}`);
    res.sendStatus(500);
  }
});



router.get("/", async function (req: Request, res: Response) {
  try{
    const flowerservicerequestCSV = await PrismaClient.flowerServiceRequest.findMany();
    res.send(flowerservicerequestCSV);
  } catch (error){
    console.error(`Error exporting Service Request data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

// router.patch("/", async (req: Request, res: Response) => {
//   const flowerRequestUpdate: FlowerServiceRequest = req.body;
//
//   try {
//
//     console.log(flowerRequestUpdate);
//
//     await PrismaClient.flowerServiceRequest.update({
//       where: {id: flowerRequestUpdate.id},
//       data: {status: flowerRequestUpdate.status,
//       employee:{
//         connect: {
//             username: flowerRequestUpdate.employeeUser
//         }
//       }
//       }
//     });
//
//     res.sendStatus(200);
//   } catch (error) {
//     console.error(`Error populating node data: ${error}`);
//     res.sendStatus(500);
//   }
// });


export default router;
