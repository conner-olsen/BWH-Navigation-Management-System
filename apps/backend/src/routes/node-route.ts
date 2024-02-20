import express, {Router, Request, Response} from "express";
import { parseCSV} from "common/src/parser.ts";
import PrismaClient from "../bin/database-connection.ts";
import {node} from "common/interfaces/interfaces.ts";
import serviceRequest from "./service-request.ts";

const router: Router = express.Router();


router.post("/", async (req: Request, res: Response) => {
  try {
    // Parse the CSV string to an array of CSVRow objects
    const rowsNode = parseCSV(req.body["csvString"]);
    const transformedNode:node[] = rowsNode.map((row) => {
      const rowval = Object.values(row);
      return {
        nodeId:rowval[0],
        xcoord:parseInt(rowval[1]),
        ycoord:parseInt(rowval[2]),
        floor:rowval[3],
        building:rowval[4],
        nodeType:rowval[5],
        longName:rowval[6],
        shortName:rowval[7]
      };
    });

    await PrismaClient.node.createMany({data:transformedNode.map((self) => {
        return {
          nodeId:self.nodeId,
          xcoord:self.xcoord,
          ycoord:self.ycoord,
          floor:self.floor,
          building:self.building,
          nodeType:self.nodeType,
          longName:self.longName,
          shortName:self.shortName
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
    const nodeCSV = await PrismaClient.node.findMany();
    res.send(nodeCSV);
  } catch (error){
    console.error(`Error exporting node data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

router.patch("/", async function (req: Request, res: Response) {
  const nodeID = req.body.nodeId;
  try{
    const data = await PrismaClient.serviceRequest.findMany({
      where: {
        nodeId: nodeID}});
    console.log(JSON.stringify(data));
    res.status(200).send(data);
  } catch (error){
    console.error(`Error finding associated service requests: ${error}`);
    res.sendStatus(500);
  }
});

export default router;
