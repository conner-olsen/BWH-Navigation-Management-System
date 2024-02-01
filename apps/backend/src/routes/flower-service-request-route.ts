import express, {Router, Request, Response} from "express";
import { parseCSV} from "common/src/parser.ts";
import PrismaClient from "../bin/database-connection.ts";
import {flowerServiceRequest} from "common/interfaces/interfaces.ts";

const router: Router = express.Router();


router.post("/", async (req: Request, res: Response) => {
  try {
    // Parse the CSV string to an array of CSVRow objects
    const rowsServiceRequest = parseCSV(req.body["csvString"]);
    const transformedflowerServiceRequest:flowerServiceRequest[] = rowsServiceRequest.map((row) => {
      const rowval = Object.values(row);
      return {
        senderName:rowval[0],
        senderEmail:rowval[1],
        roomLongName:rowval[2],
        patientName:rowval[3],
        flowerType:rowval[4],
        deliveryDate:rowval[5],
        note:rowval[6]
      };
    });

    await PrismaClient.flowerServiceRequest.createMany({data:transformedflowerServiceRequest.map((self) => {
        return {
          senderName:self.senderName,
          senderEmail:self.senderEmail,
          roomLongName:self.roomLongName,
          patientName:self.patientName,
          flowerType:self.flowerType,
          deliveryDate:self.deliveryDate,
          note:self.note
        };}
      )
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
