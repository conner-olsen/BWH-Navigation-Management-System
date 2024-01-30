import express, {Router, Request, Response} from "express";
import { Prisma } from "database";
import { parseCSV} from "common/src/parser.ts";
import * as fs from "fs";
import * as path from "path";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

interface node {
  nodeId:string,
  xcoord:number,
  ycoord:number,
  floor:string,
  building:string,
  nodeType:string,
  longName:string,
  shortName:string

}

router.post("/", async (req: Request, res: Response) => {

  //Check if request matches Node data type
  const csvFileNode = Prisma.NodeCreateManyInput = req.body;

  try {
    // Parse the CSV string to an array of CSVRow objects
    const rowsNode = parseCSV(csvFileNode);
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

  } catch (error) {
    console.error(`Error populating node data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});


export default router;
