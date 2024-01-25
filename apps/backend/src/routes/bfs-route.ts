import express, {Router, Request, Response} from "express";
import { Graph } from "../bin/graph-structure.ts";
import * as path from "path";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    //const requestData: {startid:string,endid:string} = req.body;

    // set up objects needed to call bfs
    const nodePath = path.resolve("data", "csv", "L1Nodes.csv");
    const edgePath = path.resolve("data", "csv", "L1Edges.csv");
    const graphCSV = new Graph();
    const startNodeCSV = "CCONF002L1";
    const endNodeCSV = "CHALL004L1";

    //populate graph
    graphCSV.fromCSV(
      nodePath,
      edgePath,
    );

    //run bfs, convert to array of nodes
    res.json(graphCSV.stringsToNodes(graphCSV.bfs(startNodeCSV, endNodeCSV)));

  } catch (error) {
    console.error(`Error while converting CSV to JSON: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

export default router;
