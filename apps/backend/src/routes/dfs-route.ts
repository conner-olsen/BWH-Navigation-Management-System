import express, {Router, Request, Response} from "express";
import { Graph } from "src/graph.ts";
import PathFindingRequest from "common/src/PathfindingRequest.ts";
import client from "../bin/database-connection.ts";
import {dfsPathfinding} from "common/src/PathfindingMethod.ts";

const router: Router = express.Router();
router.post("/", async (req: Request, res: Response) => {
  try {
    const requestData: PathFindingRequest = req.body;
    console.log(requestData);
    // // set up objects needed to call bfs
    // // language=file-reference - Node csv file path
    // const nodePath = path.join(__dirname, "../../data/csv/L1Nodes.csv");
    // // language=file-reference - Edge csv file path
    // const edgePath = path.join(__dirname, "../../data/csv/L1Edges.csv");
    const graphCSV = new Graph();
    const startNodeCSV =  requestData.startid;
    const endNodeCSV = requestData.endid;

    //populate graph
    try {
      // Fetch nodes from the database
      const nodes = await client.node.findMany();

      // Fetch edges from the database
      const edges = await client.edge.findMany();

      // Populate the graph with nodes and edges
      graphCSV.populateGraph(nodes, edges);
      graphCSV.setPathfindingMethod(new dfsPathfinding());

    } catch (error) {
      console.error('Error fetching data from the database:', error);
    }

    //run bfs, convert to an array of nodes
    res.status(200).json(graphCSV.stringsToNodes(graphCSV.runPathfinding(startNodeCSV, endNodeCSV)));

  }
  catch (error) {
    console.error(`Error while converting CSV to JSON: ${error}`);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

export default router;
