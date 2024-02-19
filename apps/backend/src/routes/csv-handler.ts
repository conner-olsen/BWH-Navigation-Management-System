import express, {Router, Request, Response} from "express";
import { parseCSV} from "common/src/parser.ts";
import * as fs from "fs";
import * as path from "path";
import PrismaClient from "../bin/database-connection.ts";
import {node} from "common/interfaces/interfaces.ts";
import {edge} from "common/interfaces/interfaces.ts";




const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    // language=file-reference - Read the CSV string from the request body
    const relativeNodePath = "../../../../packages/common/dev/data/csv/L1Nodes.csv";
    const absoluteNodePath = path.join(__dirname, relativeNodePath);
    const csvFileNode = fs.readFileSync(absoluteNodePath, "utf-8");

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

    transformedNode.pop();
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

    // language=file-reference Read the CSV string from the request body
    const absolutePath = path.join(__dirname, "../../../../packages/common/dev/data/csv/L1Edges.csv");
    const csvFile = fs.readFileSync(absolutePath, "utf-8");

    // Parse the CSV string to an array of CSVRow objects
    const rows = parseCSV(csvFile);
    const transformed:edge[] = rows.map((row) => {
      const rowval = Object.values(row);
      return {
        edgeID:rowval[0],
        startNodeID:rowval[1],
        endNodeID:rowval[2]
      };
    });


    await PrismaClient.edge.createMany({data:transformed.map((self) => {
      return {
        startNodeID:self.startNodeID,
        edgeID:self.edgeID,
        endNodeID:self.endNodeID
      };}
      )
    });



  } catch (error) {
    console.error(`Error while converting CSV to JSON: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});


export default router;
