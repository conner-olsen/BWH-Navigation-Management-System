import express, {Router, Request, Response} from "express";
import { parseCSV} from "common/src/parser.ts";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

interface servicerequest {
  senderName:string
  senderEmail:string
  room:string
  item:string
  comment:string
  status:string
}

router.post("/", async (req: Request, res: Response) => {
  try {
    // Parse the CSV string to an array of CSVRow objects
    const rowsServiceRequest = parseCSV(req.body["csvString"]);
    const transformedServiceRequest:servicerequest[] = rowsServiceRequest.map((row) => {
      const rowval = Object.values(row);
      return {
        senderName:rowval[0],
        senderEmail:rowval[1],
        room:rowval[2],
        item:rowval[3],
        comment:rowval[4],
        status:rowval[5]
      };
    });

    await PrismaClient.serviceRequest.createMany({data:transformedServiceRequest.map((self) => {
        return {
          senderName:self.senderName,
          senderEmail:self.senderEmail,
          room:self.room,
          item:self.item,
          comment:self.comment,
          status:self.status
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
    const servicerequestCSV = await PrismaClient.serviceRequest.findMany();
    res.send(servicerequestCSV);
  } catch (error){
    console.error(`Error exporting Service Request data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

export default router;
