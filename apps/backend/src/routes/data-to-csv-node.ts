import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";


const router: Router = express.Router();

interface NodeData {
  nodeId: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
}

function convertToCSV(data: NodeData[]): string {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map((node) => Object.values(node).join(','));
  return `${headers}\n${rows.join('\n')}`;
}






router.get("/", async function (req: Request, res: Response) {
  try{
    const nodeCSV = await PrismaClient.node.findMany();
    const csvNode: string = convertToCSV(nodeCSV);
    res.send(csvNode);
  } catch (error){
    console.error(`Error exporting node data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

export default router;
