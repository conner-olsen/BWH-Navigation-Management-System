import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";
import { Prisma } from "database";

const router: Router = express.Router();


router.post("/", async (req: Request, res: Response) => {
  const flowerRequestAttempt: Prisma.FlowerServiceRequestCreateInput = req.body;
  try {
    // Assuming that 'roomLongName' is the unique identifier for a room
    const existingNode = await PrismaClient.node.findUnique({
      where: {
        longName: req.body.roomLongName,
      },
    });

    if (existingNode) {
      // If the room exists, connect it to the FlowerServiceRequest
      flowerRequestAttempt.node = {
        connect: {
          longName: existingNode.longName,
        },
      };
    } else {
      // Handle the case where the room doesn't exist (optional)
      console.error(`Room with longName '${req.body.roomLongName}' not found.`);
      res.sendStatus(404); // Not Found
      return;
    }

    // Create the FlowerServiceRequest with the connected room
    await PrismaClient.flowerServiceRequest.create({
      data: flowerRequestAttempt,
    });

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

export default router;
