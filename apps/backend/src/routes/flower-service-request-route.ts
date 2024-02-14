import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";
import {Prisma} from "database";
import ServiceRequestUncheckedCreateInput = Prisma.ServiceRequestUncheckedCreateInput;

const router: Router = express.Router();


router.post("/", async (req: Request, res: Response) => {
  const requestData = req.body;
  const serviceRequestData: ServiceRequestUncheckedCreateInput = {
    nodeId: requestData.nodeId,
    status: requestData.status,
    employeeUser: requestData.employeeUser,
    priority: requestData.priority,
  };

  const flowerServiceRequestData: Prisma.FlowerServiceRequestUncheckedCreateInput = {
    ...requestData,
    id: undefined, // Ensure id is not set to prevent conflicts
  };

  try {
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
