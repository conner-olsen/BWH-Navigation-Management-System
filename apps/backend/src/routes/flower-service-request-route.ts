import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";
import {Prisma} from "database";
import ServiceRequestUncheckedCreateInput = Prisma.ServiceRequestUncheckedCreateInput;

const router: Router = express.Router();


router.post("/", async (req: Request, res: Response) => {

  const flowerRequestAttempt: Prisma.FlowerServiceRequestUncheckedCreateInput = req.body;

  const srAttempt: Prisma.ServiceRequestUncheckedCreateInput = req.body as ServiceRequestUncheckedCreateInput;

  console.log(JSON.stringify(srAttempt));

  try {

    // Create the Service Request
    const createdServiceRequest = await PrismaClient.serviceRequest.create({ data: srAttempt });

    // Use the created Service Request's id to set the nodeId in flowerRequestAttempt
    flowerRequestAttempt.id = createdServiceRequest.id;

    await PrismaClient.flowerServiceRequest.create({data: flowerRequestAttempt});

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error populating node data: ${error}`);
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
