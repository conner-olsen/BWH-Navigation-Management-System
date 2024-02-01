import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();


router.post("/", async (req: Request, res: Response) => {
  //const flowerRequestAttempt: Prisma.FlowerServiceRequestCreateInput = req.body;
  console.log(req.body);

  try {

    // Create the FlowerServiceRequest with the connected room
    await PrismaClient.flowerServiceRequest.create({
      data: {
        senderName: req.body.senderName,
        senderEmail: req.body.senderEmail,
        roomLongName: req.body.roomLongName,
        patientName: req.body.patientName,
        flowerType: req.body.flowerType,
        deliveryDate: req.body.deliveryDate,
        note: req.body.note,
        node: {
          connect: {
            longName: req.body.roomLongName
          }
        }
      }
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
