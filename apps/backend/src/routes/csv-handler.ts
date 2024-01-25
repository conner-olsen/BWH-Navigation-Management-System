import express, {Router, Request, Response} from "express";
import { parseCSV} from "../bin/parser.ts";
import * as fs from "fs";
import * as path from "path";
import PrismaClient from "../bin/database-connection.ts";




const router: Router = express.Router();


interface edge {
  edgeid:string,
  startnode:string,
  endnode:string
}
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
  try {
    // Read the CSV string from the request body
    const absolutePathNode = path.join(__dirname, "../../CSV-Data/L1Nodes.csv");
    const csvFileNode = fs.readFileSync(absolutePathNode, "utf-8");

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

    // Read the CSV string from the request body
    const absolutePath = path.join(__dirname, "../../CSV-Data/L1Edges.csv");
    const csvFile = fs.readFileSync(absolutePath, "utf-8");

    // Parse the CSV string to an array of CSVRow objects
    const rows = parseCSV(csvFile);
    const transformed:edge[] = rows.map((row) => {
      const rowval = Object.values(row);
      return {
        edgeid:rowval[0],
        startnode:rowval[1],
        endnode:rowval[2]
      };
    });


    transformed.pop();
    await PrismaClient.edge.createMany({data:transformed.map((self) => {
      return {
        startNode:self.startnode,
        edgeID:self.edgeid,
        endNode:self.endnode
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
