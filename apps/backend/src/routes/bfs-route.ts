import express, {Router, Request, Response} from "express";
import { Graph } from "../bin/graph-structure.ts";
import * as path from "path";
import PathFindingRequest from "common/src/PathfindingRequest.ts";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const requestData: PathFindingRequest = req.body;
    console.log(requestData)
    // set up objects needed to call bfs
    const nodePath = path.resolve("data", "csv", "L1Nodes.csv");
    const edgePath = path.resolve("data", "csv", "L1Edges.csv");
    const graphCSV = new Graph();
    const startNodeCSV =  requestData.startid;
    const endNodeCSV = requestData.endid;

    //populate graph
    graphCSV.fromCSV(
      nodePath,
      edgePath,
    );

    //run bfs, convert to array of nodes
    res.json(graphCSV.stringsToNodes(graphCSV.bfs(startNodeCSV, endNodeCSV)));
    res.sendStatus(200);
  }
  catch (error) {
    console.error(`Error while converting CSV to JSON: ${error}`);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

export default router;
